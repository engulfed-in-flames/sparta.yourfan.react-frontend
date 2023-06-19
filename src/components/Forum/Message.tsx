import React from "react";
import { IMessage } from "../../type";
import { HStack, Text } from "@chakra-ui/react";

export default function Message({
  message: { sender, content, is_manager },
}: IMessage) {
  return (
    <HStack>
      <Text
        color={is_manager ? "youtubeRed" : "primary"}
        fontSize={"xl"}
        fontWeight={is_manager ? "bold" : "normal"}
      >
        {sender}:
      </Text>
      <Text
        color={"primary"}
        fontSize={"xl"}
        fontWeight={is_manager ? "bold" : "normal"}
      >
        {content}
      </Text>
    </HStack>
  );
}
