import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";
import { useMutation } from "@tanstack/react-query";
import { apiPostPost } from "../api";

export default function Write() {
  const { channel } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(apiPostPost, {
    onSuccess: () => {
      toast({
        title: "글 등록에 성공했습니다.",
        status: "success",
        position: "bottom-right",
      });
      redirect(`/${channel}/consortium`);
    },
    onError: () => {
      toast({
        title: "글 등록에 실패했습니다.",
        status: "warning",
        position: "bottom-right",
      });
    },
  });

  const onTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.currentTarget.value);
  };
  const onClickSubmitBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const board = channel?.split("@").pop()!;
    mutation.mutate({ board, title, content });
  };

  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

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
      <FormControl mb={4}>
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
          setOptions={{
            plugins: plugins,
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["paragraphStyle", "blockquote"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["fontColor", "hiliteColor", "textStyle"],
              ["removeFormat"],
              "/", // Line break
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link", "image"],
              ["fullScreen", "showBlocks"],
              ["preview"],
            ],
          }}
        />
      </Box>
      <Flex w={"full"} justifyContent={"flex-end"} gap={2}>
        <Button variant={"outline"} onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button onClick={onClickSubmitBtn}>등록</Button>
      </Flex>
    </VStack>
  );
}
