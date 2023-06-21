import React, { useEffect } from "react";
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
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useOutletContextUser, useUserOnly } from "../hooks/userHooks";
import WithdrawlModal from "../components/Modal/WithdrawlModal";
import UpdateMeModal from "../components/Modal/UpdateMeModal";
// import { useQueryClient } from "@tanstack/react-query";

export default function Me() {
  useUserOnly();
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
  const { isUserLoading, user } = useOutletContextUser();
  // const queryClient = useQueryClient();
  // useEffect(()=>{
  //   queryClient.fetchQuery(["me"])
  // }, [user])
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
                <Link to="#">
                  <Button
                    variant={"link"}
                    color={"gray.600"}
                    fontSize={"xl"}
                    fontWeight={"thin"}
                    pb={4}
                  >
                    내가 쓴 글 ({user.posts.length})
                  </Button>
                </Link>
                <Link to="#">
                  <Button
                    variant={"link"}
                    color={"gray.600"}
                    fontSize={"xl"}
                    fontWeight={"thin"}
                    pb={4}
                  >
                    내가 쓴 댓글 (0)
                  </Button>
                </Link>
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

              <Divider />
              <VStack
                alignItems={"center"}
                w={"full"}
                h={"280px"}
                bgColor={"secondary"}
                mb={8}
              ></VStack>
              <Divider />
              <VStack
                w={"full"}
                flex={1}
                alignItems={"center"}
                bgColor={"tertiary"}
                mb={8}
              ></VStack>
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
    </VStack>
  );
}
