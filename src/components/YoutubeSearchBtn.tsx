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

  const onClickDisabled = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast({
      title: "악의적인 채널 검색이 감지되어 일시 버튼이 비활성화됐습니다.",
      description:
        "채널 검색 및 포럼 생성시에 유튜브 API 토큰이 소모됩니다. 다른 사람들도 해당 기능을 이용할 수 있도록 배려해주시면 감사하겠습니다.",
      status: "warning",
      position: "top",
      duration: 5000,
    });
  };

  return (
    <Button
      onClick={onClickDisabled}
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
