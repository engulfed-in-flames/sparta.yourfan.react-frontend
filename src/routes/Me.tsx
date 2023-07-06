import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import WithdrawlModal from "../components/Modal/WithdrawlModal";
import UpdateMeModal from "../components/Modal/UpdateMeModal";
import { useUser, useUserOnly } from "../hooks/userHooks";
import MyPostListModal from "../components/Modal/MyPostListModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiGetPreStaffList,
  apiPatchAllowStaff,
  apiPatchNotAllowStaff,
} from "../api";
import { IPreStaff } from "../type";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

export default function Me() {
  useUserOnly();
  const { isUserLoading, user } = useUser();
  const {
    isOpen: isWithdrawlOpen,
    onOpen: onWithdrawlOpen,
    onClose: onWithdrawlClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateMeOpen,
    onOpen: onUpdateMeOpen,
    onClose: onUpdateMeClose,
  } = useDisclosure();
  const {
    isOpen: isMyPostListOpen,
    onOpen: onMyPostListOpen,
    onClose: onMyPostListClose,
  } = useDisclosure();
  const toast = useToast();

  const { isLoading: isPreStaffListLoading, data: preStaffList } = useQuery<
    IPreStaff[]
  >(["preStaffList"], apiGetPreStaffList, {
    enabled: user?.is_admin,
  });

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
    if (user?.is_admin) {
      event.preventDefault();

      allowMutation.mutate({ status: "A", id: id });
    }
  };
  const onClickNotAllow = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    if (user?.is_admin) {
      event.preventDefault();

      notAllowMutation.mutate({ status: "R", id: id });
    }
  };

  return (
    <VStack w={"90%"} minW={"1280px"} py={12} my={24} mx={"auto"}>
      {!isUserLoading && user ? (
        <Grid
          w={"full"}
          h={"full"}
          templateColumns={"1fr 2.5fr"}
          gap={16}
          px={4}
          py={8}
        >
          <GridItem minH={"720px"} px={4}>
            <VStack>
              <Avatar src={user.avatar} size={"4xl"} />
              <Box position={"relative"} w={"full"} py={4}>
                <Divider my={4} borderColor={"primary"} borderWidth={0.25} />
                <AbsoluteCenter bgColor={"whiteGray"} p={2}>
                  Info
                </AbsoluteCenter>
              </Box>

              <VStack w={"full"} alignItems={"flex-start"}>
                <Heading as="h3" fontSize={"2xl"}>
                  이메일
                </Heading>
                <Text fontSize={"xl"} color={"gray.600"} pb={4}>
                  {user.email}
                </Text>
                <Heading as="h3" fontSize={"2xl"}>
                  닉네임
                </Heading>
                <Text fontSize={"xl"} color={"gray.600"} pb={4}>
                  {user.nickname}
                </Text>
                <Button
                  onClick={onMyPostListOpen}
                  variant={"link"}
                  color={"gray.600"}
                  fontSize={"xl"}
                  fontWeight={"thin"}
                  pb={4}
                >
                  내가 쓴 글 ({user.posts.length})
                </Button>
              </VStack>
            </VStack>
          </GridItem>
          <GridItem minH={"720px"}>
            <Flex h={"full"} flexDirection={"column"} alignItems={"flex-start"}>
              <HStack w={"full"} justifyContent={"space-between"} mb={8}>
                <Heading as="h3" fontSize={"4xl"}>
                  마이페이지
                </Heading>
                <ButtonGroup>
                  <Button onClick={onUpdateMeOpen} variant={"ghost"}>
                    회원 정보 수정
                  </Button>
                  <Button
                    onClick={onWithdrawlOpen}
                    variant={"ghost"}
                    colorScheme={"red"}
                  >
                    회원 탈퇴
                  </Button>
                </ButtonGroup>
              </HStack>
              <Heading fontSize={"2xl"} pb={4}>
                내가 생성한 포럼 목록
              </Heading>
              <VStack
                w={"full"}
                h={"280px"}
                justifyContent={"center"}
                bgColor={"gray.300"}
                mb={8}
                borderRadius={"lg"}
              ></VStack>

              {user.is_admin ? (
                <>
                  <Heading fontSize={"2xl"} pb={4}>
                    게시판 관리자 신청 목록
                  </Heading>
                  <VStack
                    w={"full"}
                    h={"280px"}
                    justifyContent={"flex-start"}
                    mb={8}
                    borderRadius={"lg"}
                    overflowY={"hidden"}
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
                      {!isPreStaffListLoading && preStaffList ? (
                        <>
                          {preStaffList.map((preStaff, index) => {
                            const dateTime = new Date(preStaff.created_at);
                            return (
                              <GridItem key={index}>
                                <SimpleGrid
                                  columns={3}
                                  templateColumns={"0.5fr 1fr 0.5fr 1fr"}
                                  textAlign={"center"}
                                  alignItems={"center"}
                                >
                                  <Text whiteSpace={"nowrap"}>
                                    {preStaff.user.nickname}
                                  </Text>
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
                                  <ButtonGroup gap={2}>
                                    <Button
                                      onClick={(event) =>
                                        onClickAllow(event, preStaff.id)
                                      }
                                      w={20}
                                      colorScheme={"green"}
                                    >
                                      허가
                                    </Button>
                                    <Button
                                      onClick={(event) =>
                                        onClickNotAllow(event, preStaff.id)
                                      }
                                      w={20}
                                      colorScheme={"red"}
                                    >
                                      불허
                                    </Button>
                                  </ButtonGroup>
                                </SimpleGrid>
                              </GridItem>
                            );
                          })}
                        </>
                      ) : null}
                    </SimpleGrid>
                  </VStack>
                </>
              ) : null}
            </Flex>
          </GridItem>
        </Grid>
      ) : null}

      <WithdrawlModal isOpen={isWithdrawlOpen} onClose={onWithdrawlClose} />
      <UpdateMeModal
        isOpen={isUpdateMeOpen}
        onClose={onUpdateMeClose}
        nickname={user?.nickname || ""}
      />
      <MyPostListModal isOpen={isMyPostListOpen} onClose={onMyPostListClose} />
    </VStack>
  );
}
