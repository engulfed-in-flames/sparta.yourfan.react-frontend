import React from "react";
import { IPost } from "../../type";
import { Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProps {
  channel?: string;
  postList: IPost[];
}

export default function PostList({ channel, postList }: IProps) {
  return (
    <>
      {channel ? (
        <Heading textAlign={"center"} py={8}>
          {channel}
        </Heading>
      ) : null}
      <Grid
        userSelect={"none"}
        minH={"760px"}
        gridAutoFlow={"row"}
        gridAutoRows={"1fr"}
        p={8}
      >
        {postList.map((post, i) => (
          <GridItem key={i}>
            <Link to={`${post.pk}`}>
              <Grid
                gridAutoFlow={"column"}
                templateColumns={"0.5fr 3fr 1fr 1fr"}
                gap={4}
                fontSize={"xl"}
                py={2}
              >
                <Text textAlign={"center"} whiteSpace={"nowrap"}>
                  {post.pk}
                </Text>
                <Text textAlign={"center"} whiteSpace={"nowrap"}>
                  {post.title}
                </Text>
                <Text textAlign={"center"} whiteSpace={"nowrap"}>
                  {post.title}
                </Text>
                <Text textAlign={"center"} whiteSpace={"nowrap"}>
                  {post.created_at}
                </Text>
              </Grid>
            </Link>
            <Divider />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
