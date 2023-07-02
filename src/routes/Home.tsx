import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsYoutube } from "react-icons/bs";

import { apiGetBoardList } from "../api";
import { IBoard } from "../type";
import Carousel from "../components/Carousel";
import YoutubeSearchBtn from "../components/YoutubeSearchBtn";
import MultiStepFormModal from "../components/Modal/MultiStepFormModal";

const channelRank = [
  { rank: "diamond", rankKR: "다이아", color: "#a3c4d9" },
  { rank: "gold", rankKR: "골드", color: "#f9d848" },
  { rank: "silver", rankKR: "실버", color: "#c0c0c0" },
  { rank: "bronze", rankKR: "브론즈", color: "#c28342" },
];

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
  const navigate = useNavigate();

  const handleClickBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { id } = event.currentTarget;
    if (id) {
      navigate(`${id}/consortium?page=1`);
    }
  };

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

      <VStack w={"full"} pb={8}>
        <YoutubeSearchBtn onOpen={onMultiStepFormOpen} />
      </VStack>

      <VStack w={"full"} alignItems={"center"} pb={8}>
        <Heading w={"full"} textAlign={"left"} pb={4}>
          포럼 목록
        </Heading>
        <Accordion allowToggle w={"full"}>
          {channelRank.map((v, i) => (
            <AccordionItem key={i} py={2}>
              <Heading as={"h2"}>
                <AccordionButton>
                  <Flex
                    as="span"
                    flex="1"
                    textAlign="left"
                    alignItems={"center"}
                  >
                    <Icon
                      as={BsYoutube}
                      fontSize={"2xl"}
                      color={v.color}
                      mr={4}
                    />
                    <Text fontSize={"lg"}>{v.rankKR} 채널 포럼 목록</Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4}>
                {!isBoardsLoading && boardList ? (
                  <>
                    {boardList
                      .filter((board) => board.rank === v.rank)
                      .map((board, i) => (
                        <Button
                          key={i}
                          id={board.custom_url}
                          onClick={handleClickBoard}
                          mr={2}
                          mb={4}
                        >
                          {board.title}
                        </Button>
                      ))}
                  </>
                ) : null}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>

      <MultiStepFormModal
        isOpen={isMultiStepFormOpen}
        onClose={onMultiStepFormClose}
      />
    </VStack>
  );
}
