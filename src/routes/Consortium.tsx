import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Grid, HStack, VStack } from "@chakra-ui/react";
import ForumTabs from "../components/Forum/ForumTabs";
import { useQuery } from "@tanstack/react-query";
import { apiGetPostList } from "../api";
import { IPost } from "../type";
import PostList from "../components/Forum/PostList";
import PostListSkeleton from "../components/Skeleton/PostListSkeleton";
import PageNav from "../components/Forum/PageNav";

export default function Consortium() {
  const { channel } = useParams();
  const [page, setPage] = React.useState(1);
  const board = channel?.split("@").pop()!;

  const { isLoading: isPostListLoading, data: postList } = useQuery<IPost[]>(
    ["postList", board],
    () => apiGetPostList(board)
  );

  React.useEffect(() => {}, [page]);

  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Box w={"full"}>
        {!isPostListLoading && postList ? (
          <PostList postList={postList} />
        ) : (
          <PostListSkeleton />
        )}
        <Grid gridTemplateColumns={"0.5fr 1fr 0.5fr"} gap={8} mt={8} px={8}>
          <HStack>
            <Button variant={"outline"}>전체글</Button>
            <Button variant={"outline"}>추천글</Button>
          </HStack>
          <PageNav page={page} setPage={setPage} />
          <HStack justifyContent={"flex-end"}>
            <Link to={`/${channel}/write`}>
              <Button>글쓰기</Button>
            </Link>
          </HStack>
        </Grid>
      </Box>
    </VStack>
  );
}
