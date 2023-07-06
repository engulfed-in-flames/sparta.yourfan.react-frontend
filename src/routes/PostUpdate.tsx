import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { apiGetPost, apiPutPost } from "../api";
import {
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useIsDigit } from "../hooks/pageHooks";
import { IPost } from "../type";
import SunEditor from "suneditor-react";
import { useUser } from "../hooks/userHooks";

export default function PostUpdate() {
  const { postPk } = useParams();
  useIsDigit(postPk!);
  const { isUserLoading, user } = useUser();
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
  const onClickUpdateBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // if (postPk) updateMutation.mutate({pk:postPk,});
    toast({
      title: "현재 구현 중입니다 😭",
      status: "info",
      position: "top",
      duration: 3000,
    });
  };
  return !isUserLoading && user?.pk === post?.user?.pk ? (
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
            제목: {post.title}
          </Heading>
          <SunEditor
            setContents={post.content}
            height="480px"
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

      <HStack w={"full"} justifyContent={"flex-end"}>
        <Button
          onClick={() => navigate(-1)}
          bgColor={"primary"}
          colorScheme="blackAlpha"
        >
          취소
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
    </VStack>
  ) : (
    <></>
  );
}
