import React from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import ForumTabs from "../components/Forum/ForumTabs";
import Message from "../components/Forum/Message";

interface IProps {
  userCount?: number;
}

const message = {
  sender: "Sender",
  content: "Content",
  is_manager: false,
};

export default function Colloquium({ userCount = 0 }: IProps) {
  const { channel } = useParams();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("clicked");
  };

  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"} p={8}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <VStack userSelect={"none"} w={"full"} flex={1} p={8}>
        <Flex
          position={"relative"}
          w={"full"}
          flex={1}
          shadow={"inner"}
          borderRadius={"lg"}
        >
          <Text
            position={"absolute"}
            top={4}
            left={4}
            fontSize={"xl"}
            fontWeight={"semibold"}
          >
            현재 참여 인원 ({userCount})
          </Text>
          <VStack
            flex={1}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            px={4}
            pt={16}
            pb={4}
          >
            <Message message={message} />
          </VStack>
        </Flex>
        <FormControl w={"full"} isRequired as="form">
          <HStack>
            <Input
              focusBorderColor={"primary"}
              errorBorderColor={"youtubeRed"}
              placeholder={"메세지를 입력하세요"}
              variant={"flushed"}
            />
            <IconButton
              onClick={onClick}
              icon={<MdSend />}
              aria-label={"Send Message Button"}
              w={28}
              _hover={{ bgColor: "tertiary", color: "white" }}
              _focus={{ bgColor: "secondary", color: "white" }}
              variant={"outline"}
            />
          </HStack>
        </FormControl>
      </VStack>
    </VStack>
  );
}
