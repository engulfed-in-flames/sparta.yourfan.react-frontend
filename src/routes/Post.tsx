import { Button, HStack, Heading, VStack, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIsDigit } from "../hooks/pageHooks";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { apiDeletePost, apiGetPost, apiPutPost } from "../api";
import { IPost } from "../type";
import { useMe } from "../hooks/userHooks";
import { AxiosError } from "axios";

export default function Post() {
  const { postPk } = useParams();
  useIsDigit(postPk!);
  const { user } = useMe();
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading: isPostLoading, data: post } = useQuery<IPost>(
    ["post", postPk],
    () => apiGetPost(String(postPk))
  );

  const updateMutation = useMutation(apiPutPost, {
    onSuccess: () => {
      toast({
        title: "게시글이 갱신됐습니다.",
        status: "success",
        position: "top",
        duration: 3000,
      });
      navigate(-1);
    },
    onError: (err: AxiosError) => {
      toast({
        title: "게시글 갱신에 실패했습니다.",
        status: "error",
        position: "top",
        duration: 3000,
      });
    },
  });
  const deleteMutation = useMutation(apiDeletePost, {
    onSuccess: () => {
      toast({
        title: "게시글이 삭제됐습니다.",
        status: "success",
        position: "top",
        duration: 3000,
      });
      navigate(-1);
    },
    onError: (err: AxiosError) => {
      toast({
        title: "게시글 삭제에 실패했습니다.",
        status: "error",
        position: "top",
        duration: 3000,
      });
    },
  });

  const onClickUpdateBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // if (postPk) updateMutation.mutate({pk:postPk,});
  };

  const onClickDeleteBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (postPk) deleteMutation.mutate(postPk);
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
      {user?.pk && user.posts.includes(Number(postPk)) ? (
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
