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
import { useEffect, useState } from "react";

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
  const [insightData, setInsightData] = useState<IInsight>();
  const { isLoading, data } = useQuery<IInsight>(["insight", channel], () =>
    apiGetInsight(channel!)
  );

  useEffect(() => {
    if (data) {
      const falseValues = [0, "0", "", null, undefined, false];
      const validatedObj = { ...data };
      for (const key in validatedObj) {
        if (falseValues.includes(validatedObj[key])) {
          validatedObj[key] = "정보 없음";
        } else if (!isNaN(validatedObj[key])) {
          validatedObj[key] = String(validatedObj[key]).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
        }
      }
      setInsightData(validatedObj);
    }
  }, []);

  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      {channel ? <ForumTabs channel={channel} /> : null}
      <Box w={"full"}>
        <Heading textAlign={"center"}> 현재 구현 중입니다 😭</Heading>
        {!isLoading && insightData && (
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
                <Text>{rankList[insightData.rank]}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>구독자 수</Text>
                <Text>{insightData.subscriber}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>전체 동영상 조회수 합산</Text>
                <Text>{insightData.total_view}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>전체 동영상 개수</Text>
                <Text>{insightData.video_count}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>참여율</Text>
                <Text>{insightData.participation_rate}%</Text>
                <Text textAlign={"left"} fontSize={12} color={"youtubeRed"}>
                  🔸참여율: 평균 조회수 / 구독자 수{" "}
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>활성도</Text>
                <Text>{insightData.activity_rate}%</Text>
                <Text textAlign={"left"} fontSize={12} color={"youtubeRed"}>
                  🔸활성도: (댓글 개수 + 좋아요 수) / 조회수{" "}
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>평균 조회수</Text>
                <Text>{insightData.avg_views}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>평균 좋아요 수</Text>
                <Text>{insightData.avg_likes}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>평균 댓글 수</Text>
                <Text>{insightData.avg_comments}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>조회수 대비 좋아요</Text>
                <Text>{insightData.like_per_view}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack>
                <Text fontWeight={"bold"}>조회수 대비 댓글</Text>
                <Text>{insightData.comment_per_view}</Text>
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
                  <Text>{insightData.latest30_views}</Text>
                </VStack>

                <VStack>
                  <Text fontWeight={"bold"}>
                    지난 한 달간 <br /> 누적 댓글 수
                  </Text>
                  <Text>{insightData.latest30_comments}</Text>
                </VStack>
                <VStack>
                  <Text fontWeight={"bold"}>
                    지난 한 달간 <br /> 누적 좋아요 수
                  </Text>
                  <Text>{insightData.latest30_likes}</Text>
                </VStack>
              </SimpleGrid>
            </GridItem>
          </Grid>
        )}
      </Box>
    </VStack>
  );
}
