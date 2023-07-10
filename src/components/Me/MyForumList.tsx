import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";

import { IBoard } from "../../type";
import { useQuery } from "@tanstack/react-query";
import { apiGetSubscribedForumList } from "../../api";
import { useNavigate } from "react-router-dom";

interface IProps {
  isLoading: boolean;
  data: IBoard[];
}

export default function MyForumList() {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery<IBoard[]>(
    ["subscribed_forum_list"],
    apiGetSubscribedForumList
  );

  const handleClickBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { id } = event.currentTarget;
    if (id) {
      navigate(`/${id}/consortium?page=1`);
    }
  };
  return (
    <>
      <Heading fontSize={"2xl"} pb={4}>
        내가 구독한 포럼 목록
      </Heading>
      <Box
        w={"full"}
        h={"280px"}
        p={8}
        mb={8}
        borderRadius={"lg"}
        boxShadow={"inner"}
      >
        {!isLoading && data
          ? data.map((board, index) => (
              <Button
                key={index}
                id={board.custom_url}
                onClick={handleClickBoard}
                mr={2}
                mb={4}
              >
                {board.title}
              </Button>
            ))
          : null}
      </Box>
    </>
  );
}
