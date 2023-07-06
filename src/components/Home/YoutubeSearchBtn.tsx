import React from "react";
import { Button, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { createForumBtnAtom } from "../../atom";
import { useUser } from "../../hooks/userHooks";

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

  /* 
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
  */

  return (
    <HStack
      w={"full"}
      minW={"768px"}
      justifyContent={"space-between"}
      pt={4}
      pb={8}
    >
      <VStack w={"33.3%"} alignItems={"flex-start"} fontSize={"sm"}>
        <Text>
          🤔 <b>포럼 생성하기</b> 버튼은 어떻게 이용하나요?
        </Text>
        <Text pl={2}>
          1. <b>포럼 생성하기</b> 버튼을 통해 특정 유튜브 채널을 검색하고, 포럼
          생성을 신청할 수 있습니다.
        </Text>
        <Text pl={2}>
          2. 포럼이 생성되면 <b>인사이트</b>에서 해당 채널에 대한 수치화 및
          시각화된 데이터를 확인할 수 있습니다.
        </Text>
        <Text pl={2}>
          3. 포럼이 생성되면 <b>게시판</b>과 <b>채팅방</b>에 입장할 수 있습니다.
        </Text>
        <Text pl={2}>
          4. <b>포럼</b>은 이 모든 공간을 지칭합니다.
        </Text>
      </VStack>
      <VStack w={"33.3%"}>
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
      </VStack>
      <VStack w={"33.3%"}></VStack>
    </HStack>
  );
}
