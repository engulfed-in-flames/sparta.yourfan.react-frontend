import React from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  FormControl,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { w3cwebsocket as W3CWeboSocket } from "websocket";
import ForumTabs from "../components/Forum/ForumTabs";
import Message from "../components/Forum/Message";
import { IMessage } from "../type";
import { useMe } from "../hooks/userHooks";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { apiGetCount } from "../api";

interface IProps {
  userCount?: number;
}

export default function Colloquium({ userCount = 0 }: IProps) {
  const { channel } = useParams();
  const channelTitle = channel?.split("@").pop();
  const { user } = useMe();

  const accessToken = Cookies.get("access");

  // WebSocket
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const client = new W3CWeboSocket(
    `ws://127.0.0.1:8000/ws/chat/${channelTitle}/?token=${accessToken}`
  );

  React.useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data.toString());
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            user_nickname: dataFromServer.user,
          },
        ]);
      }
    };
    return () => {
      client.close();
    };
  }, []);

  const onSubmitMessage = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector("input[name='message']");
    if (input instanceof HTMLInputElement) {
      client.send(
        JSON.stringify({
          type: "chat_message",
          message: input.value,
          user_nickname: user?.nickname,
        })
      );
    }
  };
  //

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
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </VStack>
        </Flex>
        <FormControl
          as="form"
          onSubmit={onSubmitMessage}
          isRequired
          w={"full"}
          display={"flex"}
          alignItems={"center"}
        >
          <Input
            name={"message"}
            focusBorderColor={"primary"}
            errorBorderColor={"youtubeRed"}
            placeholder={"메세지를 입력하세요"}
            variant={"flushed"}
          />
          <IconButton
            type={"submit"}
            icon={<MdSend />}
            aria-label={"Send Message Button"}
            w={28}
            _hover={{ bgColor: "tertiary", color: "white" }}
            _focus={{ bgColor: "secondary", color: "white" }}
            variant={"outline"}
          />
        </FormControl>
      </VStack>
    </VStack>
  );
}
