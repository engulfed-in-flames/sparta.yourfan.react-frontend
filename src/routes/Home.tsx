import { Box, Heading, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { apiGetBoardList } from "../api";
import { IBoard } from "../type";
import Carousel from "../components/Home/Carousel";
import YoutubeSearchBtn from "../components/Home/YoutubeSearchBtn";
import MultiStepFormModal from "../components/Modal/MultiStepFormModal";
import ForumList from "../components/Home/ForumList";

export default function Home() {
  const { isLoading: isBoardsLoading, data: boardList } = useQuery<IBoard[]>(
    ["boards"],
    apiGetBoardList
  );

  const {
    isOpen: isMultiStepFormOpen,
    onOpen: onMultiStepFormOpen,
    onClose: onMultiStepFormClose,
  } = useDisclosure();

  return (
    <VStack w={"90%"} my={24} mx={"auto"}>
      <Heading w={"full"} display={"flex"} textAlign={"left"} pb={4}>
        <Text color={"youtubeRed"}>You</Text>RFan이란?
      </Heading>
      <Box w={"full"} pb={8}>
        <Box
          overflow={"hidden"}
          minH={"360px"}
          bgColor={"primary"}
          borderRadius={"lg"}
        >
          <Carousel />
        </Box>
      </Box>

      <YoutubeSearchBtn onOpen={onMultiStepFormOpen} />

      {!isBoardsLoading && boardList ? (
        <ForumList isLoading={isBoardsLoading} data={boardList} />
      ) : null}

      <MultiStepFormModal
        isOpen={isMultiStepFormOpen}
        onClose={onMultiStepFormClose}
      />
    </VStack>
  );
}
