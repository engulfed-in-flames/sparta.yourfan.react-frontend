import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { BsYoutube } from "react-icons/bs";
import CreateForumModal from "../components/Modal/CreateForumModal";
import Carousel from "../components/Carousel";
import React from "react";
import { useNavigate } from "react-router-dom";

const channelRank = [
  { rank: "diamond", rankKR: "다이아", color: "#a3c4d9" },
  { rank: "gold", rankKR: "골드", color: "#f9d848" },
  { rank: "silver", rankKR: "실버", color: "#c0c0c0" },
  { rank: "bronze", rankKR: "브론즈", color: "#c28342" },
];
const badgeItemListByRank = [
  { rank: "diamond", badgeList: ["freecodecamp", "BroCodez"] },
  { rank: "gold", badgeList: ["freecodecamp", "BroCodez"] },
  { rank: "silver", badgeList: ["freecodecamp", "BroCodez"] },
  { rank: "bronze", badgeList: ["freecodecamp", "BroCodez"] },
];

export default function Home() {
  const {
    isOpen: isCreateForumOpen,
    onOpen: onCreateForumOpen,
    onClose: onCreateForumClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const handleClickBadge = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                {badgeItemListByRank
                  .filter((list) => list.rank === v.rank)[0]
                  .badgeList.map((badge, i) => (
                    <Button
                      key={i}
                      id={badge}
                      onClick={handleClickBadge}
                      mr={2}
                    >{`@${badge}`}</Button>
                  ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>

      <VStack w={"full"} pb={8}>
        <Grid
          overflow={"hidden"}
          w={"full"}
          templateColumns={"1fr 1fr"}
          gap={4}
          borderRadius={"lg"}
        >
          <VStack
            bgColor={"white"}
            borderRadius={"lg"}
            shadow={"lg"}
            px={8}
            py={8}
          >
            <Heading>컨소시움 A</Heading>
            <UnorderedList w={"full"} listStyleType={"none"}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((v, i) => (
                <ListItem key={i}>
                  <Flex
                    justifyContent={"space-between"}
                    fontSize={"2xl"}
                    py={2}
                  >
                    <Text>{v}</Text>
                    <Text>The First Post</Text>
                    <Text>Author</Text>
                    <Text>2023-06-08</Text>
                  </Flex>
                  <Divider />
                </ListItem>
              ))}
            </UnorderedList>
          </VStack>
          <VStack
            bgColor={"white"}
            borderRadius={"lg"}
            shadow={"lg"}
            px={8}
            py={8}
          >
            <Heading>컨소시움 B</Heading>
            <UnorderedList w={"full"} listStyleType={"none"}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((v, i) => (
                <ListItem key={i}>
                  <Flex
                    justifyContent={"space-between"}
                    fontSize={"2xl"}
                    py={2}
                  >
                    <Text>{v}</Text>
                    <Text>The First Post</Text>
                    <Text>Author</Text>
                    <Text>2023-06-08</Text>
                  </Flex>
                  <Divider />
                </ListItem>
              ))}
            </UnorderedList>
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
