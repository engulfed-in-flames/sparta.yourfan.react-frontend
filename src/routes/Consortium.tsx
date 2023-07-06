import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, MouseEvent } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom";

import ForumTabs from "../components/Forum/ForumTabs";
import { apiGetPostList, apiPostApplyForStaff } from "../api";
import { IPost } from "../type";
import PostList from "../components/Forum/PostList";
import PostListSkeleton from "../components/Skeleton/PostListSkeleton";
import PageNav from "../components/Forum/PageNav";

interface IPostList {
  page: number;
  count: number;
  next?: string;
  previous?: string;
  results: IPost[];
}

export default function Consortium() {
  const { channel } = useParams();
  const [searchParams] = useSearchParams();
  const user = useRecoilValue(userAtom);
  const pageParam = Number(searchParams.get("page"));
  const [page, setPage] = useState(pageParam);
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading: isPostListLoading, data: postList } = useQuery<IPostList>(
    ["postList", channel, page],
    () => apiGetPostList({ channel: channel!, page: page! })
  );
  const mutation = useMutation(apiPostApplyForStaff, {
    onSuccess: () => {
      toast({
        title: "관리자 신청에 성공했습니다.",
        status: "success",
        position: "top",
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: "관리자 신청에 실패했습니다.",
        status: "error",
        position: "top",
        duration: 3000,
      });
    },
  });

  const onClickToBeStaffBtn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!user || !channel) {
      toast({
        title: "로그인이 필요합니다",
        status: "info",
        position: "top",
        duration: 3000,
      });
    } else {
      mutation.mutate(channel);
    }
  };

  useEffect(() => {
    if (!isNaN(pageParam)) {
      setPage(pageParam);
    } else {
      navigate(`${channel}/consortium?page=1`);
    }
  }, []);

  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Box w={"full"}>
        {isPostListLoading ? (
          <PostListSkeleton />
        ) : postList && postList.results.length > 0 ? (
          <PostList page={postList.page} postList={postList.results} />
        ) : (
          <Box minH={"450px"} p={8}>
            <Heading textAlign={"center"}>
              첫 번째 게시글의 주인공이 되어 보세요!
            </Heading>
          </Box>
        )}
        {postList && (
          <Grid gridTemplateColumns={"0.5fr 1fr 0.5fr"} gap={8} mt={8} px={8}>
            <HStack>
              <Button onClick={onClickToBeStaffBtn} variant={"outline"}>
                컨소시움 관리자 신청
              </Button>
            </HStack>
            <PageNav
              channel={channel!}
              count={postList.count}
              page={page}
              setPage={setPage}
            />
            <HStack justifyContent={"flex-end"}>
              <Link to={`/${channel}/write`}>
                <Button
                  color={"whiteGray"}
                  bgColor={"primary"}
                  _hover={{ bgColor: "seconadry" }}
                  _focus={{ bgColor: "tertiary" }}
                >
                  글쓰기
                </Button>
              </Link>
            </HStack>
          </Grid>
        )}
      </Box>
    </VStack>
  );
}
