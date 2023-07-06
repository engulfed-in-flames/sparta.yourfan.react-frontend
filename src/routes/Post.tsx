import {
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { AxiosError } from "axios";

import { useIsDigit } from "../hooks/pageHooks";
import { apiBanUser, apiDeletePost, apiGetPost, apiPutPost } from "../api";
import { IPost } from "../type";
import { useUser } from "../hooks/userHooks";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

export default function Post() {
  const { postPk } = useParams();
  useIsDigit(postPk!);
  const { isUserLoading, user } = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading: isPostLoading, data: post } = useQuery<IPost>(
    ["post", postPk],
    () => apiGetPost(String(postPk))
  );

  const banMutation = useMutation(apiBanUser, {
    onSuccess: () => {
      toast({
        title: "사용자 차단이 완료됐습니다",
        status: "success",
        position: "top",
        duration: 3000,
      });
      navigate(-1);
    },
    onError: (err: AxiosError) => {
      toast({
        title: "사용자 차단에 실패했습니다",
        status: "error",
        position: "top",
        duration: 3000,
      });
    },
  });
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

  const onClickBanBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (post?.board && post?.user?.pk) {
      banMutation.mutate({ custom_url: post.board, user_id: post.user?.pk });
    }
  };

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
            제목: {post.title}
          </Heading>
          <HStack w={"full"} justifyContent={"space-between"}>
            <HStack justifyContent={"space-between"}>
              <Text fontSize={20}>작성자: {post.user?.nickname}</Text>
              {user && post.staffs.includes(user.pk) ? (
                <Button onClick={onClickBanBtn} colorScheme={"red"}>
                  밴하기
                </Button>
              ) : null}
            </HStack>
            <Text fontSize={20}>
              {new Date(post.created_at)
                .toLocaleString("en-US", options)
                .replace(",", " ")}
            </Text>
          </HStack>
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
      {!isUserLoading && user?.pk === post?.user?.pk ? (
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
