import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";

export default function Write() {
  const { channel } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef<SunEditorCore>();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
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
        <Button>등록</Button>
      </Flex>
    </VStack>
  );
}
