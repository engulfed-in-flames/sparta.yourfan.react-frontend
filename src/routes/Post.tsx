import { VStack } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useIsDigit } from "../hooks/pageHooks";

export default function Post() {
  const { postPk } = useParams();
  // useIsDigit(postPk!);

  const [htmlText, setHtmlText] = React.useState("");

  //   React.useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/html-text"); // Replace with your actual API endpoint
  //       const data = await response.json();
  //       setHtmlText(data.htmlText);
  //     } catch (error) {
  //       console.error("Error fetching HTML text:", error);
  //     }
  //   };
  return (
    <VStack
      w={"80%"}
      minH={"660px"}
      justifyContent={"flex-start"}
      gap={4}
      my={24}
      mx={"auto"}
    >
      {/* <div dangerouslySetInnerHTML={{ __html: htmlText }}></div> */}
    </VStack>
  );
}
