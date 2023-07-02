import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { createForumBtnAtom } from "../atom";
import { useUser } from "../hooks/userHooks";

interface IYoutubeSearchBtnProps {
  onOpen: () => void;
}

export default function YoutubeSearchBtn({ onOpen }: IYoutubeSearchBtnProps) {
  const { isUserLoading, user } = useUser();
  const atomValue = useRecoilValue(createForumBtnAtom);
  const toast = useToast();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isUserLoading && user) {
      onOpen();
    } else {
      toast({
        title: "로그인이 필요합니다.",
        status: "info",
        position: "top",
        duration: 3000,
      });
    }
  };

  return (
    <Button
      onClick={onClick}
      isLoading={atomValue}
      loadingText={"생성 중..."}
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
