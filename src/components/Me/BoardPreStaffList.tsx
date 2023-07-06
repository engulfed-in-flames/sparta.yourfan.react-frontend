import {
  Button,
  ButtonGroup,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IPreStaff } from "../../type";
import { useMutation } from "@tanstack/react-query";
import { apiPatchAllowStaff, apiPatchNotAllowStaff } from "../../api";

interface IProps {
  isLoading: boolean;
  data: IPreStaff[];
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

export default function BoardPreStaffList({ isLoading, data }: IProps) {
  const toast = useToast();
  const allowMutation = useMutation(apiPatchAllowStaff, {
    onSuccess: () => {
      toast({
        title: "요청에 성공했습니다",
        status: "success",
        position: "top",
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: "요청에 실패했습니다",
        status: "error",
        position: "top",
        duration: 3000,
      });
    },
  });

  const notAllowMutation = useMutation(apiPatchNotAllowStaff, {
    onSuccess: () => {
      toast({
        title: "요청에 성공했습니다",
        status: "success",
        position: "top",
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: "요청에 실패했습니다",
        status: "error",
        position: "top",
        duration: 3000,
      });
    },
  });

  const onClickAllow = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();

    allowMutation.mutate({ status: "A", id: id });
  };
  const onClickNotAllow = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.preventDefault();
    notAllowMutation.mutate({ status: "R", id: id });
  };
  return (
    <>
      <Heading fontSize={"2xl"} pb={4}>
        게시판 관리자 신청 목록
      </Heading>
      <VStack
        w={"full"}
        h={"280px"}
        justifyContent={"flex-start"}
        mb={8}
        py={4}
        borderRadius={"lg"}
        overflowY={"hidden"}
        boxShadow={"inner"}
      >
        <SimpleGrid
          w={"full"}
          columns={1}
          gap={2}
          gridAutoFlow={"row"}
          overflowY={"scroll"}
        >
          <GridItem>
            <SimpleGrid
              columns={3}
              templateColumns={"0.5fr 1fr 0.5fr 1fr"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              <Text whiteSpace={"nowrap"}>닉네임</Text>
              <Text whiteSpace={"nowrap"}>신청 게시판</Text>
              <Text whiteSpace={"nowrap"}>신청 날짜</Text>
            </SimpleGrid>
          </GridItem>

          {data.map((preStaff, index) => {
            const dateTime = new Date(preStaff.created_at);
            return (
              <GridItem key={index}>
                <SimpleGrid
                  columns={3}
                  templateColumns={"0.5fr 1fr 0.5fr 1fr"}
                  textAlign={"center"}
                  alignItems={"center"}
                >
                  <Text whiteSpace={"nowrap"}>{preStaff.user.nickname}</Text>
                  <Text
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                  >
                    {preStaff.board}
                  </Text>
                  <Text whiteSpace={"nowrap"}>
                    {dateTime
                      .toLocaleString("en-US", options)
                      .replace(",", " ")}
                  </Text>
                  <Flex justifyContent={"space-evenly"}>
                    <Button
                      onClick={(event) => onClickAllow(event, preStaff.id)}
                      w={20}
                      colorScheme={"green"}
                    >
                      허가
                    </Button>
                    <Button
                      onClick={(event) => onClickNotAllow(event, preStaff.id)}
                      w={20}
                      colorScheme={"red"}
                    >
                      불허
                    </Button>
                  </Flex>
                </SimpleGrid>
              </GridItem>
            );
          })}
        </SimpleGrid>
      </VStack>
    </>
  );
}
