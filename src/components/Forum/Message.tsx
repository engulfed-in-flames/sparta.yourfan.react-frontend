import { HStack, Text } from "@chakra-ui/react";

interface IProps {
  message: {
    user_nickname: string;
    message: string;
  };
}

export default function Message({ message }: IProps) {
  return (
    <>
      {message.user_nickname === "[system]" ? (
        <HStack
          w={"full"}
          alignItems={"flex-start"}
          fontSize={"xl"}
          color={"youtubeRed"}
        >
          <Text wordBreak={"break-all"}>{message.message}</Text>
        </HStack>
      ) : (
        <HStack
          w={"full"}
          alignItems={"flex-start"}
          fontSize={"xl"}
          color={"primary"}
        >
          <Text>{message.user_nickname} : </Text>
          <Text wordBreak={"break-all"}>{message.message}</Text>
        </HStack>
      )}
    </>
  );
}
