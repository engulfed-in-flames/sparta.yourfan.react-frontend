import React from "react";
import { Button } from "@chakra-ui/react";

interface IYoutubeSearchBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function YoutubeSearchBtn({ onClick }: IYoutubeSearchBtnProps) {
  return (
    <Button
      onClick={onClick}
      w={60}
      h={20}
      fontSize={"2xl"}
      color={"white"}
      colorScheme={"red"}
    >
      포럼 생성하기
    </Button>
  );
}
