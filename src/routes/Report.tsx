import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { BsCloudUpload } from "react-icons/bs";
import { apiGetUploadURL, apiPostReport, apiUploadImage } from "../api";
import { IReportValues } from "../type";

export default function Report() {
  const [uploadedFile, setUploadedFile] = React.useState<File | undefined>();
  const [uploadedFileName, setUploadedFileName] = React.useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReportValues>();
  const toast = useToast();
  const mutation = useMutation(apiPostReport, {
    onSuccess: () => {
      toast({
        title: "신고가 접수됐습니다.",
        status: "success",
        position: "bottom-right",
        duration: 3000,
      });
      setUploadedFileName("");
      reset();
    },
    onError: () => {
      toast({
        title: "신고가 접수되지 않았습니다.",
        status: "error",
        position: "bottom-right",
        duration: 3000,
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setUploadedFile(files[0]);
      setUploadedFileName(files[0].name);
    }
  };
  const onSubmit: SubmitHandler<IReportValues> = async (data) => {
    const obj = {
      image_title: "",
      image_url: "",
      cloudflare_image_id: "",
      title: data.title,
      content: data.content,
    };
    if (uploadedFile) {
      const { uploadURL } = await apiGetUploadURL();
      const {
        result: { id, variants },
      } = await apiUploadImage({ file: uploadedFile, uploadURL });
      obj.image_title = uploadedFileName;
      obj.image_url = variants[0];
      obj.cloudflare_image_id = id;
    }
    mutation.mutate(obj);
  };
  return (
    <VStack userSelect={"none"} my={24}>
      <Container py={12}>
        <VStack alignItems={"flex-start"} gap={4} pb={16}>
          <Heading as="h1" fontSize={"6xl"}>
            신고하기
          </Heading>
          <Heading as="h3" fontSize={"2xl"}>
            오류 발견하시면 신고 부탁드립니다.😀
          </Heading>
        </VStack>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
                {uploadedFileName || "파일을 첨부하세요"}
              </Flex>
            </FormLabel>
            <Input
              name={"image"}
              onChange={handleFileChange}
              type={"file"}
              multiple={true}
              display={"none"}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={"2xl"} mb={2}>
              제목
            </FormLabel>
            <Input
              {...register("title", {
                required: {
                  value: true,
                  message: "제목을 반드시 입력해야 합니다.",
                },
              })}
              name={"title"}
              type="text"
              placeholder="제목을 입력하세요"
              focusBorderColor={"primary"}
            />
            <Text color={"youtubeRed"} py={1}>
              {errors.title && `* ${errors.title.message}`}
            </Text>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize={"2xl"} mb={2}>
              내용
            </FormLabel>
            <Textarea
              {...register("content", {
                required: {
                  value: true,
                  message: "내용을 반드시 입력해야 합니다.",
                },
              })}
              name={"content"}
              placeholder="내용을 입력하세요"
              rows={10}
              focusBorderColor={"primary"}
            />
            <Text color={"youtubeRed"} py={1}>
              {errors.content && `* ${errors.content.message}`}
            </Text>
          </FormControl>
          <Button
            type={"submit"}
            w={"full"}
            bgColor={"primary"}
            _hover={{ bgColor: "secondary" }}
            _focus={{ bgColor: "tertiary" }}
            color="white"
          >
            신고하기
          </Button>
        </Box>
      </Container>
    </VStack>
  );
}
