import { Button, HStack, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useIsDigit } from "../hooks/pageHooks";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useQuery } from "@tanstack/react-query";
import { apiGetPost } from "../api";
import { IPost } from "../type";
import { useOutletContextUser } from "../hooks/userHooks";

export default function Post() {
  const { postPk } = useParams();
  const { user } = useOutletContextUser();
  useIsDigit(postPk!);

  const { isLoading: isPostLoading, data: post } = useQuery<IPost>(
    ["post", postPk],
    () => apiGetPost(String(postPk))
  );

  const onClickDeleteBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Delete Button Clicked");
  };

  const onClickUpdateBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Update Button Clicked");
  };

  return (
    <VStack
      w={"80%"}
      minH={"660px"}
      justifyContent={"flex-start"}
      gap={12}
      my={36}
      mx={"auto"}
    >
      {!isPostLoading && post ? (
        <>
          <Heading w={"full"} textAlign={"left"}>
            {post.title}
          </Heading>
          <SunEditor
            setContents={post.content}
            disable={true}
            disableToolbar={true}
            hideToolbar={true}
            onLoad={() => {
              const editorDiv = document.querySelector(".sun-editor-editable");
              if (editorDiv) {
                editorDiv.setAttribute("contentEditable", "true");
              }
            }}
          ></SunEditor>
        </>
      ) : null}
      {user && user.posts.includes(Number(postPk)) ? (
        <>
          <HStack w={"full"} justifyContent={"flex-end"}>
            <Button
              onClick={onClickDeleteBtn}
              bgColor={"primary"}
              colorScheme="blackAlpha"
            >
              삭제
            </Button>
            <Button
              onClick={onClickUpdateBtn}
              borderColor={"primary"}
              colorScheme="blackAlpha"
              variant={"outline"}
            >
              수정
            </Button>
          </HStack>
        </>
      ) : null}
    </VStack>
  );
}
