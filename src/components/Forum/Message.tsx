import { IMessage } from "../../type";
import { HStack, Text } from "@chakra-ui/react";

interface IProps {
  message: {
    user_nickname: string;
    message: string;
  };
}

export default function Message({ message }: IProps) {
  return (
    <HStack>
      <Text fontSize={"xl"}>{message.user_nickname}:</Text>
      <Text color={"primary"} fontSize={"xl"}>
        {message.message}
      </Text>
    </HStack>
  );
}
