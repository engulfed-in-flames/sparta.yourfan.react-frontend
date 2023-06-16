import { VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function Post() {
  // 개별 포스트를 호출하는건 뒤에 /<포스트 pk> 넣고 get 요청 하시면 됩니다

  //   const [htmlText, setHtmlText] = useState("");

  //   useEffect(() => {
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
