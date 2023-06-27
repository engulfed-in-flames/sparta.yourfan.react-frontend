import { Box, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ForumTabs from "../components/Forum/ForumTabs";
import { useQuery } from "@tanstack/react-query";
import { apiGetInsight } from "../api";
import { IInsight } from "../type";

export default function Insight() {
  const { channel } = useParams();
  const { isLoading, data } = useQuery<IInsight>(["insight", channel], () =>
    apiGetInsight(channel!)
  );
  console.log(data);

  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Box w={"full"}>
        <Heading textAlign={"center"}> 현재 구현 중입니다 😭</Heading>
        <Grid textAlign={"center"} p={8}>
          {data &&
            Object.keys(data).map((key, index) => (
              <GridItem key={index}>{`${key} : ${data[key]}`}</GridItem>
            ))}
        </Grid>
      </Box>
    </VStack>
  );
}
