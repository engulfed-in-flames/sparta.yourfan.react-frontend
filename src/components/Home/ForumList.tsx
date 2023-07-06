import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsYoutube } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IBoard } from "../../type";

const channelRank = [
  { rank: "diamond", rankKR: "다이아", color: "#a3c4d9" },
  { rank: "gold", rankKR: "골드", color: "#f9d848" },
  { rank: "silver", rankKR: "실버", color: "#c0c0c0" },
  { rank: "bronze", rankKR: "브론즈", color: "#c28342" },
];

interface IProps {
  isLoading: boolean;
  data: IBoard[];
}

export default function ForumList({ isLoading, data }: IProps) {
  const navigate = useNavigate();

  const handleClickBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { id } = event.currentTarget;
    if (id) {
      navigate(`${id}/consortium?page=1`);
    }
  };

  return (
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
                <Flex as="span" flex="1" textAlign="left" alignItems={"center"}>
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
              {data
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
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
}
