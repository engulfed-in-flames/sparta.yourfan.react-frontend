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
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Box w={"full"}>
        <Grid p={8}></Grid>
      </Box>
    </VStack>
  );
}
