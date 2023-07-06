import { IPost } from "../../type";
import { Divider, SimpleGrid, Text, VStack } from "@chakra-ui/react";
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
    <VStack w={"full"} h={"480px"} justifyContent={"flex-start"}>
      <SimpleGrid
        w={"full"}
        columns={3}
        templateColumns={"0.5fr 3fr 1fr"}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        <Text whiteSpace={"nowrap"}>번호</Text>
        <Text whiteSpace={"nowrap"}>제목</Text>
        <Text whiteSpace={"nowrap"}>게시 날짜</Text>
      </SimpleGrid>
      {postList.map((post, index) => {
        const dateTime = new Date(post.created_at);
        return (
          <>
            <Link to={`/${post.board}/consortium/${post.id}`}>
              <SimpleGrid
                key={index}
                w={"full"}
                columns={3}
                templateColumns={"0.5fr 3fr 1fr"}
              >
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

                <Divider />
              </SimpleGrid>{" "}
            </Link>
          </>
        );
      })}
    </VStack>
  );
}
