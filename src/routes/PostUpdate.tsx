import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import SunEditor from "suneditor-react";
import { apiGetPost, apiPutPost } from "../api";
import { useIsDigit } from "../hooks/pageHooks";
import { IPost } from "../type";
import { useUser } from "../hooks/userHooks";

export default function PostUpdate() {
  const { channel, postPk } = useParams();
  useIsDigit(postPk!);
  const { isUserLoading, user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const { isLoading: isPostLoading, data: post } = useQuery<IPost>(
    ["post", postPk],
    () => apiGetPost(String(postPk))
  );

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);

      console.log(title, content);
    }
  }, [post]);

  const updateMutation = useMutation(apiPutPost, {
    onSuccess: () => {
      toast({
        title: "게시글이 수정됐습니다",
        status: "success",
        position: "top",
        duration: 3000,
      });
      setTitleError(false);
      setContentError(false);
      navigate(`/${channel}/consortium/${postPk}`);
    },
    onError: () => {
      toast({
        title: "게시글 수정에 실패했습니다.",
        status: "error",
        position: "top",
        duration: 3000,
      });
    },
  });

  const onClickUpdateBtn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true);
      return;
    }
    if (!content) {
      setContentError(true);
      return;
    }
    if (postPk && title && content && channel)
      updateMutation.mutate({ postPk, title, content, board: channel });
  };

  return !isUserLoading && user?.pk === post?.user?.pk ? (
    <VStack
      w={"80%"}
      minH={"660px"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      gap={12}
      my={36}
      mx={"auto"}
    >
      {!isPostLoading && post ? (
        <>
          <FormControl mb={4} isRequired>
            <FormLabel fontSize={28} mb={4}>
              제목
            </FormLabel>
            <Input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.currentTarget.value)
              }
              defaultValue={post.title}
              name="title"
              type="text"
              h={14}
              bgColor={"white"}
            />
            {titleError ? (
              <Text color={"youtubeRed"}> * 제목은 필수입니다</Text>
            ) : null}
          </FormControl>
          <SunEditor
            onChange={(data: string) => setContent(data)}
            setContents={post.content}
            height="480px"
            onLoad={() => {
              const editorDiv = document.querySelector(".sun-editor-editable");
              if (editorDiv) {
                editorDiv.setAttribute("contentEditable", "true");
              }
            }}
          ></SunEditor>
          {contentError ? (
            <Text color={"youtubeRed"}> * 내용은 필수입니다</Text>
          ) : null}
        </>
      ) : null}

      <HStack w={"full"} justifyContent={"flex-end"}>
        <Button
          onClick={() => navigate(-1)}
          bgColor={"primary"}
          colorScheme={"blackAlpha"}
        >
          취소
        </Button>
        <Button
          onClick={onClickUpdateBtn}
          borderColor={"primary"}
          colorScheme={"blackAlpha"}
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
