import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
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

      <HStack
        position={"relative"}
        w={"full"}
        justifyContent={"center"}
        pt={12}
        pb={16}
      >
        <YoutubeSearchBtn onOpen={onMultiStepFormOpen} />
        <VStack
          position={"absolute"}
          left={0}
          w={"30%"}
          alignItems={"flex-start"}
          gap={0}
          fontSize={"sm"}
        >
          <Text>
            🤔 <b>포럼 생성하기</b> 버튼은 어떻게 이용하나요?
          </Text>
          <Text pl={2}>
            1. <b>포럼 생성하기</b> 버튼을 통해 특정 유튜브 채널을 검색하고,
            포럼 생성을 신청할 수 있습니다.
          </Text>
          <Text pl={2}>
            2. 포럼이 생성되면 <b>인사이트</b>에서 해당 채널에 대한 수치화 및
            시각화된 데이터를 확인할 수 있습니다.
          </Text>
          <Text pl={2}>
            3. 포럼이 생성되면 게시판과 채팅방에 입장할 수 있습니다.
          </Text>
          <Text pl={2}>
            4. <b>포럼</b>은 이 모든 공간을 지칭합니다.
          </Text>
        </VStack>
      </HStack>

      <VStack w={"full"} alignItems={"flex-start"} pb={8}>
        <HStack>
          <Heading textAlign={"left"} pb={4}>
            포럼 목록
          </Heading>
          <Text fontSize={"sm"}>
            🔸포럼은 실제 유튜브 채널 등급에 따라 구분됩니다.
          </Text>
        </HStack>
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
