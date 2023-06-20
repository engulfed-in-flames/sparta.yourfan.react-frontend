import React from "react";
import { useNavigate } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BsYoutube } from "react-icons/bs";
import Carousel from "../components/Carousel";
import { apiGetBoardList } from "../api";
import { IBoard } from "../type";
import YoutubeSearchBtn from "../components/YoutubeSearchBtn";
import MultiStepFormModal from "../components/Modal/MultiStepFormModal";
import { useOutletContextUser } from "../hooks/userHooks";

const channelRank = [
  { rank: "diamond", rankKR: "다이아", color: "#a3c4d9" },
  { rank: "gold", rankKR: "골드", color: "#f9d848" },
  { rank: "silver", rankKR: "실버", color: "#c0c0c0" },
  { rank: "bronze", rankKR: "브론즈", color: "#c28342" },
];

export default function Home() {
  const { user } = useOutletContextUser();
  const {
    isOpen: isMultiStepFormOpen,
    onOpen: onMultiStepFormOpen,
    onClose: onMultiStepFormClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoading: isBoardsLoading, data: boardList } = useQuery<IBoard[]>(
    ["boards"],
    apiGetBoardList
  );

  const handleClickBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { id: badgeId } = event.currentTarget;
    navigate(`@${badgeId}/consortium/`);
  };

  const handleClickSearchBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (user) {
      onMultiStepFormOpen();
    } else {
      toast({
        title: "로그인이 필요합니다.",
        status: "info",
        position: "top",
        duration: 3000,
      });
    }
  };

  return (
    <VStack w={"90%"} my={24} mx={"auto"}>
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
        <YoutubeSearchBtn onClick={handleClickSearchBtn} />
      </VStack>

      <VStack w={"full"} pb={8}>
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
                    <Text fontSize={"lg"}>{v.rankKR} 채널 목록</Text>
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
                          id={board.name}
                          onClick={handleClickBoard}
                          mr={2}
                        >{`@${board.name}`}</Button>
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
