import { Heading, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useIsDigit } from "../hooks/pageHooks";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useQuery } from "@tanstack/react-query";
import { apiGetPost } from "../api";
import { IPost } from "../type";

export default function Post() {
  const { postPk } = useParams();
  useIsDigit(postPk!);

  const { isLoading: isPostLoading, data: post } = useQuery<IPost>(
    ["post", postPk],
    () => apiGetPost(String(postPk))
  );

  return (
    <VStack
      w={"80%"}
      minH={"660px"}
      justifyContent={"flex-start"}
      gap={4}
      my={24}
      mx={"auto"}
    >
      <Heading></Heading>
      {!isPostLoading && post ? (
        <>
          <Heading>{post.title}</Heading>
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
    </VStack>
  );
}
