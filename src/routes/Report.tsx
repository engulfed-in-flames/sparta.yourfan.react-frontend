import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { ReactEventHandler, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";

export default function Report() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [selectedName, setSelectedName] = useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length >= 1) {
      const file = files[0];
      setSelectedFile(file);
      setSelectedName(file.name);
    }
  };
  return (
    <VStack my={24}>
      <Container py={12}>
        <VStack alignItems={"flex-start"} gap={4} pb={16}>
          <Heading as="h1" fontSize={"6xl"}>
            신고하기
          </Heading>
          <Heading as="h3" fontSize={"2xl"}>
            오류 발견하시면 신고 부탁드립니다.😀
          </Heading>
        </VStack>
        <Box as="form" method="post" action="#" encType="multipart/form-data">
          <FormControl
            position={"relative"}
            height={32}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"2px dashed"}
            borderColor={"primary"}
            borderRadius={"lg"}
            mb={4}
            gap={2}
          >
            <FormLabel>
              <Flex
                userSelect={"none"}
                cursor={"pointer"}
                position={"absolute"}
                top={0}
                left={0}
                w={"full"}
                h={"full"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <Icon
                  aria-label="업로드 버튼"
                  as={BsCloudUpload}
                  fontSize={"2xl"}
                />
                {selectedName || "파일을 첨부하세요"}
              </Flex>
            </FormLabel>
            <Input
              type={"file"}
              multiple={true}
              display={"none"}
              onChange={handleFileChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontSize={"2xl"} mb={2}>
              제목
            </FormLabel>
            <Input type="text" placeholder="제목을 입력하세요"></Input>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={"2xl"} mb={2}>
              내용
            </FormLabel>
            <Textarea placeholder="내용을 입력하세요" rows={10} />
          </FormControl>
          <Button w={"full"} bgColor="primary" color="white">
            신고하기
          </Button>
        </Box>
      </Container>
    </VStack>
  );
}
