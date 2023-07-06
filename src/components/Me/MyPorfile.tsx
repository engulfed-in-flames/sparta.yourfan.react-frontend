import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export default function MyPorfile() {
  return (
    <></>
    // <VStack>
    //           <Avatar src={user.avatar} size={"4xl"} />
    //           <Box position={"relative"} w={"full"} py={4}>
    //             <Divider my={4} borderColor={"primary"} borderWidth={0.25} />
    //             <AbsoluteCenter bgColor={"whiteGray"} p={2}>
    //               Info
    //             </AbsoluteCenter>
    //           </Box>

    //           <VStack w={"full"} alignItems={"flex-start"}>
    //             <Heading as="h3" fontSize={"2xl"}>
    //               이메일
    //             </Heading>
    //             <Text fontSize={"xl"} color={"gray.600"} pb={4}>
    //               {user.email}
    //             </Text>
    //             <Heading as="h3" fontSize={"2xl"}>
    //               닉네임
    //             </Heading>
    //             <Text fontSize={"xl"} color={"gray.600"} pb={4}>
    //               {user.nickname}
    //             </Text>
    //             <Button
    //               onClick={onMyPostListOpen}
    //               variant={"link"}
    //               color={"gray.600"}
    //               fontSize={"xl"}
    //               fontWeight={"thin"}
    //               pb={4}
    //             >
    //               내가 쓴 글 ({user.posts.length})
    //             </Button>
    //           </VStack>
    //         </VStack>
  );
}
