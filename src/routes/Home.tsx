import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { BsYoutube } from "react-icons/bs";
import CreateForumModal from "../components/Modal/CreateForumModal";
import Carousel from "../components/Carousel";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiGetBoardList } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IBoard } from "../type";

const channelRank = [
  { rank: "diamond", rankKR: "다이아", color: "#a3c4d9" },
  { rank: "gold", rankKR: "골드", color: "#f9d848" },
  { rank: "silver", rankKR: "실버", color: "#c0c0c0" },
  { rank: "bronze", rankKR: "브론즈", color: "#c28342" },
];

export default function Home() {
  const {
    isOpen: isCreateForumOpen,
    onOpen: onCreateForumOpen,
    onClose: onCreateForumClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const { isLoading: isBoardsLoading, data: boardList } = useQuery<IBoard[]>(
    ["boards"],
    apiGetBoardList
  );

  const handleClickBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { id: badgeId } = event.currentTarget;
    navigate(`@${badgeId}/consortium/`);
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
        <Button
          onClick={onCreateForumOpen}
          w={60}
          h={20}
          fontSize={"2xl"}
          color={"white"}
          colorScheme={"red"}
        >
          포럼 생성하기
        </Button>
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
      <Divider />
      <VStack w={"full"} pb={8}>
        <Grid
          overflow={"hidden"}
          w={"full"}
          templateColumns={"1fr 0.1fr 1fr"}
          bgColor={"white"}
          borderRadius={"lg"}
          shadow={"lg"}
        >
          <VStack px={8} py={8}>
            <Heading>컨소시움 A</Heading>
            <Grid w={"full"} gridAutoFlow={"row"} gridAutoRows={"1fr"} p={8}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((v, i) => (
                <GridItem key={i}>
                  <Link to="#">
                    <Grid
                      gridAutoFlow={"column"}
                      templateColumns={"0.5fr 3fr 1fr 1fr"}
                      gap={4}
                      fontSize={"xl"}
                      py={2}
                    >
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        {i}
                      </Text>
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        This is Post Title
                      </Text>
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        Author
                      </Text>
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        2023-06-14
                      </Text>
                    </Grid>
                  </Link>
                  <Divider />
                </GridItem>
              ))}
            </Grid>
          </VStack>
          <Center py={8}>
            <Divider
              orientation={"vertical"}
              borderWidth={1.25}
              borderRadius={"lg"}
            />
          </Center>
          <VStack px={8} py={8}>
            <Heading>컨소시움 B</Heading>
            <Grid w={"full"} gridAutoFlow={"row"} gridAutoRows={"1fr"} p={8}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((v, i) => (
                <GridItem key={i}>
                  <Link to="#">
                    <Grid
                      gridAutoFlow={"column"}
                      templateColumns={"0.5fr 3fr 1fr 1fr"}
                      gap={4}
                      fontSize={"xl"}
                      py={2}
                    >
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        {i}
                      </Text>
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        This is Post Title
                      </Text>
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        Author
                      </Text>
                      <Text textAlign={"center"} whiteSpace={"nowrap"}>
                        2023-06-14
                      </Text>
                    </Grid>
                  </Link>
                  <Divider />
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Grid>
      </VStack>

      <CreateForumModal
        isOpen={isCreateForumOpen}
        onClose={onCreateForumClose}
      />
    </VStack>
  );
}
