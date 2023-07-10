import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import plugins from "suneditor/src/plugins";
import { apiPostPost, apiGetUploadURL, apiUploadImage } from "../api";
import "suneditor/dist/css/suneditor.min.css";
import { UploadBeforeHandler } from "suneditor-react/dist/types/upload";
import { useUserOnly } from "../hooks/userHooks";
import { upload } from "@testing-library/user-event/dist/upload";
import { AxiosError } from "axios";

export default function PostWrite() {
  useUserOnly();
  const { channel } = useParams();
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  // const [image, setImage] = React.useState<File | null>(null);
  // const [src, setSrc] = React.useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const postMutation = useMutation(apiPostPost, {
    onSuccess: () => {
      toast({
        title: "글 등록에 성공했습니다.",
        status: "success",
        position: "bottom-right",
      });
      queryClient.refetchQueries(["me"]);
      navigate(`/${channel}/consortium`);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        toast({
          title: "차단된 사용자이므로 글쓰기 권한이 없습니다",
          status: "warning",
          position: "bottom-right",
        });
      } else {
        toast({
          title: "글 등록에 실패했습니다.",
          status: "error",
          position: "bottom-right",
        });
      }
    },
  });
  // const uploadImageMutation = useMutation(apiUploadImage, {
  //   onSuccess: (data: any) => {
  //     setSrc(data.result.variants[0]);
  //     console.log(data.result.variants[0]);
  //   },
  // });
  // const uploadURLMutation = useMutation(apiGetUploadURL, {
  //   onSuccess: (data: any) => {
  //     if (image) {
  //       uploadImageMutation.mutate({
  //         file: image,
  //         uploadURL: data.uploadURL,
  //       });
  //     }
  //   },
  //   onError: () => {
  //     console.log("Upload Failed");
  //   },
  // });

  const onTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.currentTarget.value);
  };
  const onClickSubmitBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    postMutation.mutate({ board: channel!, title, content });
  };

  const onClickCancelBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = React.useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  // useMutation으로 수정하기
  // const handleImageUploadBefore = (
  //   files: File[],
  //   info: object,
  //   uploadHandler: UploadBeforeHandler
  // ) => {
  //   let filename;
  //   let filesize;
  //   filename = files[0].name;
  //   filesize = files[0].size;
  //   setImage(files[0]);
  //   uploadURLMutation.mutate();
  //   console.log({ url: src, name: filename, size: filesize });
  //   uploadHandler({
  //     result: [{ url: src, name: filename, size: filesize }],
  //   });
  //   return undefined;
  // };

  return (
    <VStack
      w={"80%"}
      minH={"660px"}
      justifyContent={"flex-start"}
      gap={4}
      my={24}
      mx={"auto"}
    >
      <Heading w={"full"} mb={8}>{`${channel}의 컨소시움`}</Heading>
      <FormControl mb={4} isRequired>
        <FormLabel fontSize={28} mb={4}>
          제목
        </FormLabel>
        <Input
          onChange={onTitleChange}
          id="title"
          type="text"
          h={14}
          bgColor={"white"}
        />
      </FormControl>

      <Box id={"editorContainer"} w={"full"} borderRadius={"lg"} shadow={"lg"}>
        <SunEditor
          onChange={(data: string) => setContent(data)}
          getSunEditorInstance={getSunEditorInstance}
          lang="ko"
          name={"editorContent"}
          height={"660px"}
          autoFocus={true}
          setDefaultStyle="font-size: 16px;"
          setAllPlugins={true}
          // onImageUploadBefore={handleImageUploadBefore}
          setOptions={{
            plugins: plugins,
            buttonList: [
              ["undo", "redo"],
              ["fontSize", "formatBlock"],
              ["blockquote"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              // ["fontColor", "hiliteColor", "textStyle"],
              ["removeFormat"],
              "/",
              ["outdent", "indent"],
              ["horizontalRule", "lineHeight"],
              ["table"], // "image"
              ["fullScreen", "showBlocks"],
              ["preview"],
            ],
          }}
        />
      </Box>
      <Flex w={"full"} justifyContent={"flex-end"} gap={2}>
        <Button variant={"outline"} onClick={onClickCancelBtn}>
          취소
        </Button>
        <Button onClick={onClickSubmitBtn}>등록</Button>
      </Flex>
    </VStack>
  );
}
