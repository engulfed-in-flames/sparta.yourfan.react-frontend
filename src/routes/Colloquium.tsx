import { useParams } from "react-router-dom";
import { Box, Heading, VStack } from "@chakra-ui/react";
import ForumTabs from "../components/Forum/ForumTabs";

export default function Colloquium() {
  const { channel } = useParams();
  return (
    <VStack w={"80%"} minH={"660px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
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
