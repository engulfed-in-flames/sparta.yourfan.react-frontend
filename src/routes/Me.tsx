import React from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Me() {
  return (
    <VStack w={"90%"} minW={"1280px"} py={12} my={24} mx={"auto"}>
      <Grid
        w={"full"}
        h={"full"}
        templateColumns={"1fr 2.5fr"}
        gap={16}
        shadow={"lg"}
        borderRadius={"lg"}
        px={4}
        py={8}
      >
        <GridItem minH={"720px"} px={4}>
          <VStack>
            <Avatar src={""} size={"4xl"} />
            <Box position={"relative"} w={"full"} py={4}>
              <Divider my={4} />
              <AbsoluteCenter bgColor={"whiteGray"} p={2}>
                Info
              </AbsoluteCenter>
            </Box>

            <VStack w={"full"} alignItems={"flex-start"}>
              <Heading as="h3" fontSize={"2xl"}>
                이메일
              </Heading>
              <Text fontSize={"xl"} color={"gray.600"} pb={4}>
                example@domain.com
              </Text>
              <Heading as="h3" fontSize={"2xl"}>
                닉네임
              </Heading>
              <Text fontSize={"xl"} color={"gray.600"} pb={4}>
                user
              </Text>
              <Link to="#">
                <Button
                  variant={"link"}
                  color={"gray.600"}
                  fontSize={"xl"}
                  pb={4}
                >
                  내가 쓴 글 (24)
                </Button>
              </Link>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem minH={"720px"}>
          <Flex h={"full"} flexDirection={"column"} alignItems={"flex-start"}>
            <HStack w={"full"} justifyContent={"space-between"} mb={8}>
              <Heading as="h3" fontSize={"4xl"}>
                Nickname
              </Heading>
              <ButtonGroup>
                <Button variant={"ghost"}>회원 정보 수정</Button>
                <Button variant={"ghost"} colorScheme={"red"}>
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
    </VStack>
  );
}
