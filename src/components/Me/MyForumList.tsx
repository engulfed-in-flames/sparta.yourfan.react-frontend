import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

import { IBoard } from "../../type";

interface IProps {
  isLoading: boolean;
  data: IBoard[];
}

export default function MyForumList() {
  return (
    <>
      <Heading fontSize={"2xl"} pb={4}>
        내 포럼 목록
      </Heading>
      <VStack
        w={"full"}
        h={"280px"}
        justifyContent={"center"}
        mb={8}
        borderRadius={"lg"}
        boxShadow={"inner"}
      >
        <Heading>현재 구현 중입니다 😭</Heading>
        {/* {data
                .filter((board) => board.rank === v.rank)
                .map((board, i) => (
                  <Button
                    key={i}
                    id={board.custom_url}
                    onClick={handleClickBoard}
                    mr={2}
                    mb={4}
                  >
                    {board.title}
                  </Button>
                ))} */}
      </VStack>
    </>
  );
}
