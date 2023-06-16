import { Box, Grid, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import ForumTabs from "../components/Forum/ForumTabs";
import { useParams } from "react-router-dom";

export default function Insight() {
  const { channel } = useParams();
  React.useEffect(() => {
    (async () => {})();
  }, []);
  return (
    <VStack w={"80%"} minH={"660px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Heading py={8}>인사이트</Heading>
      <Box w={"full"}>
        <Grid
          minH={"760px"}
          gridAutoFlow={"row"}
          gridAutoRows={"1fr"}
          bgColor={"white"}
          borderRadius={"lg"}
          shadow={"lg"}
          p={8}
        ></Grid>
      </Box>
    </VStack>
  );
}
