import { Box, Grid, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ForumTabs from "../components/Forum/ForumTabs";
import { useQuery } from "@tanstack/react-query";
import { apiGetChannelDetail } from "../api";

export default function Insight() {
  const { channel } = useParams();
  // const {isLoading, data} = useQuery(["insight", channel], ()=> apiGetChannelDetail(channel!))
  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Box w={"full"}>
        <Grid p={8}></Grid>
      </Box>
    </VStack>
  );
}
