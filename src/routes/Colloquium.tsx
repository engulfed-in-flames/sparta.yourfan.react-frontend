import {
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Cookies from "js-cookie";

import ForumTabs from "../components/Forum/ForumTabs";
import Message from "../components/Forum/Message";
import { IMe, IMessage } from "../type";
import { useUserOnly } from "../hooks/userHooks";
import { isUserLoadingAtom, userAtom } from "../atom";

export default function Colloquium() {
  useUserOnly();
  const isUserLoading = useRecoilValue(isUserLoadingAtom);
  const user = useRecoilValue<IMe | undefined>(userAtom);
  const { channel } = useParams();
  const [userCount, setUserCount] = React.useState(0);
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const accessToken = Cookies.get("access");

  // WebSocket
  // useMemo : 디펜던시의 상태가 변화하지 않는 한, 리렌더링되더라도 변수를 기억하고 있음.
  const client = React.useMemo(
    () =>
      new W3CWebSocket(
        `${process.env.REACT_APP_WS_BASE_URL}${channel}/?token=${accessToken}`
      ),
    [channel, accessToken]
  );

  React.useEffect(() => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data.toString());
      if (dataFromServer instanceof Array) {
        setMessages((prevMessage) => {
          const newMessages = [...prevMessage].reverse();
          dataFromServer.forEach((el) =>
            newMessages.push({
              message: el.message,
              user_nickname: "익명",
            })
          );
          return newMessages;
        });
        return;
      }
      if (dataFromServer) {
        if (dataFromServer.type && dataFromServer.type === "user_count") {
          setUserCount(dataFromServer.count);
        } else if (dataFromServer.message) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: dataFromServer.message,
              user_nickname: dataFromServer.user,
            },
          ]);
        }
      }
    };
    return () => {
      client.close();
    };
  }, []);

  const onSubmitMessage = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector(
      "input[name='message']"
    ) as HTMLInputElement;
    if (input instanceof HTMLInputElement) {
      client.send(
        JSON.stringify({
          type: "chat_message",
          message: input.value,
          user_nickname: user?.nickname,
        })
      );
      input.value = "";
    }
  };
  //

  return (
    <>
      {!isUserLoading && user && user.nickname !== undefined ? (
        <VStack w={"80%"} h={"768px"} my={24} mx={"auto"} p={8}>
          {channel ? <ForumTabs channel={channel} /> : null}
          <VStack w={"full"} p={8}>
            <Flex
              position={"relative"}
              w={"full"}
              h={"600px"}
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
                overflowX={"hidden"}
                overflowY={"scroll"}
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
              h={16}
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
      ) : (
        <VStack minH={"768px"} py={36}>
          <Heading mb={8}>채팅방 연결중...</Heading>
          <Spinner size="lg" />
        </VStack>
      )}
    </>
  );
}
