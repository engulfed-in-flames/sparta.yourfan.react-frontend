import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IMe } from "../../type";

interface IProps {
  isLoading: boolean;
  data: IMe;
  onOpen: () => void;
}

export default function MyProfile({ isLoading, data, onOpen }: IProps) {
  return (
    <VStack>
      <Avatar src={data.avatar} size={"4xl"} />
      <Box position={"relative"} w={"full"} py={4}>
        <Divider my={4} borderColor={"primary"} borderWidth={0.25} />
        <AbsoluteCenter bgColor={"whiteGray"} p={2}>
          Info
        </AbsoluteCenter>
      </Box>

      <VStack w={"full"} alignItems={"flex-start"}>
        <Heading as="h3" fontSize={"2xl"}>
          이메일
        </Heading>
        <Text fontSize={"xl"} color={"gray.600"} pb={4}>
          {data.email}
        </Text>
        <Heading as="h3" fontSize={"2xl"}>
          닉네임
        </Heading>
        <Text fontSize={"xl"} color={"gray.600"} pb={4}>
          {data.nickname}
        </Text>
        <Button
          onClick={onOpen}
          variant={"link"}
          color={"gray.600"}
          fontSize={"xl"}
          fontWeight={"thin"}
          pb={4}
        >
          내가 쓴 글 ({data.posts.length})
        </Button>
      </VStack>
    </VStack>
  );
}
