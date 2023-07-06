import { IPost } from "../type";
import { Divider, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProps {
  postList: IPost[];
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

export default function MyPostList({ postList }: IProps) {
  return (
    <SimpleGrid w={"full"} columns={1} gap={2} gridAutoFlow={"row"}>
      <GridItem>
        <SimpleGrid
          columns={4}
          templateColumns={"0.5fr 3fr 1fr"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          <Text whiteSpace={"nowrap"}>번호</Text>
          <Text whiteSpace={"nowrap"}>제목</Text>
          <Text whiteSpace={"nowrap"}>게시 날짜</Text>
        </SimpleGrid>
      </GridItem>
      {postList.map((post, index) => {
        const dateTime = new Date(post.created_at);
        return (
          <GridItem key={index}>
            <Link to={`${post.id}`}>
              <SimpleGrid columns={4} templateColumns={"0.5fr 3fr 1fr"}>
                <Text textAlign={"center"} whiteSpace={"nowrap"}>
                  {post.id}
                </Text>
                <Text
                  textAlign={"center"}
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {post.title}
                </Text>
                <Text textAlign={"center"} whiteSpace={"nowrap"}>
                  {dateTime.toLocaleString("en-US", options).replace(",", " ")}
                </Text>
              </SimpleGrid>
            </Link>
            <Divider />
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
}
