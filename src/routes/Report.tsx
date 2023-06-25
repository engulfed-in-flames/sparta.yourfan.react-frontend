import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PostListSkeleton from "../components/Skeleton/PostListSkeleton";
import { apiGetReportList } from "../api";
import { IPost } from "../type";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

export default function Report() {
  const { isLoading: isReportListLoading, data: reportList } = useQuery<
    IPost[]
  >(["reportList"], apiGetReportList);
  return (
    <VStack w={"80%"} minH={"768px"} my={24} mx={"auto"}>
      <Box w={"full"}></Box>
      {isReportListLoading ? (
        <PostListSkeleton />
      ) : reportList && reportList.length > 0 ? (
        <Grid
          userSelect={"none"}
          minH={"760px"}
          gridAutoFlow={"row"}
          gridTemplateRows={"repeat(15, 1fr)"}
          p={8}
        >
          {reportList.map((report, i) => {
            const dateTime = new Date(report.created_at);
            return (
              <GridItem key={i}>
                <Link to={`${report.id}`}>
                  <Grid
                    gridAutoFlow={"column"}
                    templateColumns={"0.5fr 3fr 1fr 1fr"}
                    gap={4}
                    fontSize={"xl"}
                    py={2}
                  >
                    <Text textAlign={"center"} whiteSpace={"nowrap"}>
                      {report.id}
                    </Text>
                    <Text whiteSpace={"nowrap"}>{report.title}</Text>
                    <Text whiteSpace={"nowrap"}>{report.user?.nickname}</Text>
                    <Text whiteSpace={"nowrap"}>
                      {dateTime
                        .toLocaleString("en-US", options)
                        .replace(",", " ")}
                    </Text>
                  </Grid>
                </Link>
                <Divider />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <Box minH={"450px"} p={8}>
          <Heading textAlign={"center"}>게시글이 없습니다.</Heading>
        </Box>
      )}

      <Flex w={"full"} justifyContent={"flex-end"}>
        <Button
          bgColor={"primary"}
          _hover={{ bgColor: "secondary" }}
          _focus={{ bgColor: "tertiary" }}
          color={"whiteGray"}
        >
          <Link to="write">글쓰기</Link>
        </Button>
      </Flex>
    </VStack>
  );
}
