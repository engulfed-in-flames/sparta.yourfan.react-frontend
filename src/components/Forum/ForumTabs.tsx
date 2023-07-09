import {
  Tabs,
  TabList,
  Tab,
  useToast,
  Box,
  IconButton,
  Heading,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../hooks/userHooks";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { apiGetBoard, apiPostSubscribeBoard } from "../../api";
import { IBoard } from "../../type";

interface IForumTabs {
  channel: string;
}

export default function ForumTabs({ channel }: IForumTabs) {
  const { isUserLoading, user } = useUser();
  const { pathname } = useLocation();
  const [tabIndex, setTabIndex] = useState(1);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isLoading, data: board } = useQuery<IBoard>(["board", channel], () =>
    apiGetBoard(channel!)
  );
  const subscribeMutation = useMutation(apiPostSubscribeBoard, {
    onSuccess: () => {
      queryClient.refetchQueries(["me", "board"]);
    },
    onError: () => {
      toast({
        title: "구독에 실패했습니다",
        status: "info",
        position: "top",
        duration: 3000,
      });
    },
  });

  const onClickColloquiumTab = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast({
      title: "로그인이 필요합니다",
      status: "info",
      position: "top",
      duration: 3000,
    });
  };

  const onClickSubscribeBtn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (channel) subscribeMutation.mutate(channel);
  };

  useEffect(() => {
    const splited = pathname.split("/").filter(Boolean);
    const curLocation = splited.pop();
    if (curLocation === "insight") setTabIndex(0);
    else if (curLocation === "consortium") setTabIndex(1);
    else setTabIndex(2);
  }, [pathname]);

  return !isLoading && board ? (
    <>
      <VStack w="full">
        <Tabs index={tabIndex} mb={8} userSelect={"none"}>
          <TabList>
            <Link to={`/${channel}/insight`}>
              <Tab fontSize={"xl"} color={"primary"} borderTopRadius={"lg"}>
                인사이트
              </Tab>
            </Link>
            <Link to={`/${channel}/consortium`}>
              <Tab fontSize={"xl"} color={"primary"} borderTopRadius={"lg"}>
                게시판
              </Tab>
            </Link>
            {!isUserLoading && user ? (
              <Link to={`/${channel}/colloquium`}>
                <Tab fontSize={"xl"} color={"primary"} borderTopRadius={"lg"}>
                  채팅방
                </Tab>
              </Link>
            ) : (
              <Tab
                onClick={onClickColloquiumTab}
                fontSize={"xl"}
                color={"primary"}
                borderTopRadius={"lg"}
              >
                채팅방
              </Tab>
            )}
          </TabList>
        </Tabs>
      </VStack>
      <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        {/* <Box w={"15%"} /> */}
        <Heading textAlign={"center"}>{board.title} 채널의 포럼</Heading>
        {/* <Box w="15%">
          {!isUserLoading &&
          user &&
          user.subscribed_boards.includes(board.pk) ? (
            <IconButton
              onClick={onClickSubscribeBtn}
              icon={<FaHeart />}
              aria-label="Cancel Like Button"
              size={"lg"}
              color={"youtubeRed"}
              bgColor={"transparent"}
            />
          ) : (
            <IconButton
              onClick={onClickSubscribeBtn}
              icon={<FaRegHeart />}
              aria-label="Like Button"
              size={"lg"}
              color={"youtubeRed"}
              bgColor={"transparent"}
            />
          )}
        </Box> */}
      </Flex>
    </>
  ) : null;
}
