import { Box, Grid, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import ForumTabs from "../components/Forum/ForumTabs";

export default function Colloquium() {
  return (
    <VStack w={"80%"} minH={"660px"} my={24} mx={"auto"}>
      <ForumTabs />
      <Heading py={8}>콜로키움</Heading>
      <Box w={"full"}>
        <VStack
          minH={"760px"}
          bgColor={"white"}
          borderRadius={"lg"}
          shadow={"lg"}
          p={8}
        >
          <Box w={"full"} flex={1} bgColor={"primary"}></Box>
          <Box w={"full"} h={16} bgColor={"secondary"}></Box>
        </VStack>
      </Box>
    </VStack>
  );
}
