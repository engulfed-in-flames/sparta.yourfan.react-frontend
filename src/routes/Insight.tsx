import {
  Box,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ForumTabs from "../components/Forum/ForumTabs";
import { useQuery } from "@tanstack/react-query";
import { apiGetInsight } from "../api";
import { IInsight } from "../type";

type rankListType = {
  [key: string]: string;
};

export default function Insight() {
  const rankList: rankListType = {
    diamond: "다이아",
    gold: "골드",
    silver: "실버",
    bronze: "브론즈",
  };
  const { channel } = useParams();
  const { isLoading, data } = useQuery<IInsight>(["insight", channel], () =>
    apiGetInsight(channel!)
  );

  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Box w={"full"}>
        <Heading textAlign={"center"}> 현재 구현 중입니다 😭</Heading>
        {!isLoading && data && (
          <Grid
            templateColumns={"repeat(4, 1fr)"}
            gap={8}
            fontSize={"xl"}
            textAlign={"center"}
            p={8}
            whiteSpace={"nowrap"}
          >
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>채널 등급</Text>
                <Text>{rankList[data.rank]}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>구독자 수</Text>
                <Text>{data.subscriber.toLocaleString()}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>전체 동영상 조회수 합산</Text>
                <Text>{data.total_view.toLocaleString()}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>전체 동영상 개수</Text>
                <Text>{data.video_count.toLocaleString()}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>참여율</Text>
                <Text>{data.participation_rate}%</Text>
                <Text textAlign={"left"} fontSize={12} color={"youtubeRed"}>
                  🔸참여율: 평균 조회수 / 구독자 수{" "}
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>활성도</Text>
                <Text>{data.activity_rate}%</Text>
                <Text textAlign={"left"} fontSize={12} color={"youtubeRed"}>
                  🔸활성도: (댓글 개수 + 좋아요 수) / 조회수{" "}
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>평균 </Text>
                <Text>{data.activity_rate}%</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>평균 조회수</Text>
                <Text>{data.avg_views.toLocaleString()}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>평균 좋아요 수</Text>
                <Text>{data.avg_likes.toLocaleString()}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>평균 댓글 수</Text>
                <Text>{data.avg_comments.toLocaleString()}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>조회수 대비 좋아요</Text>
                <Text>{data.like_per_view}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>조회수 대비 댓글</Text>
                <Text>{data.comment_per_view}</Text>
              </VStack>
            </GridItem>
            <GridItem
              colSpan={3}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <SimpleGrid w={"full"} columns={3} spacing={8}>
                <VStack>
                  <Text fontWeight={"bold"} textAlign={"center"}>
                    지난 한 달간 <br /> 누적 조회수
                  </Text>
                  <Text>{data.latest30_views.toLocaleString()}</Text>
                </VStack>

                <VStack>
                  <Text fontWeight={"bold"}>
                    지난 한 달간 <br /> 댓글 누적 개수
                  </Text>
                  <Text>{data.latest30_comments.toLocaleString()}</Text>
                </VStack>
                <VStack>
                  <Text fontWeight={"bold"}>
                    지난 한 달간 <br /> 좋아요 누적 개수
                  </Text>
                  <Text>{data.latest30_likes.toLocaleString()}</Text>
                </VStack>
              </SimpleGrid>
            </GridItem>
          </Grid>
        )}
      </Box>
    </VStack>
  );
}
