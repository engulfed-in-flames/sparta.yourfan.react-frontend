import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BsCloudUpload } from "react-icons/bs";
import {
  apiDeleteReport,
  apiGetReport,
  apiGetUploadURL,
  apiPutReport,
  apiUploadImage,
} from "../api";
import { useIsDigit } from "../hooks/pageHooks";
import { IReport, IReportValues } from "../type";
import { useUser } from "../hooks/userHooks";

export default function ReportPost() {
  const { reportPk } = useParams();
  useIsDigit(reportPk!);
  const { isLoading: isReportLoading, data: report } = useQuery<IReport>(
    ["report", reportPk],
    () => apiGetReport(String(reportPk)!)
  );
  const { isUserLoading, user } = useUser();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IReportValues>();
  const toast = useToast();

  const updateMutation = useMutation(apiPutReport, {
    onSuccess: () => {
      toast({
        title: "게시글이 갱신됐습니다.",
        status: "success",
        position: "top",
        duration: 3000,
      });
      setUploadedFileName("");
      setIsUpdateMode(false);
      navigate(-1);
    },
    onError: () => {
      toast({
        title: "게시글 갱신에 실패했습니다.",
        status: "error",
        position: "top",
        duration: 3000,
      });
      setIsUpdateMode(false);
    },
  });
  const deleteMutation = useMutation(apiDeleteReport, {
    onSuccess: () => {
      toast({
        title: "게시글이 삭제됐습니다.",
        status: "success",
        position: "top",
        duration: 3000,
      });
      navigate(-1);
    },
    onError: () => {
      toast({
        title: "게시글 삭제에 실패했습니다.",
        status: "error",
        position: "top",
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

  const onClickDeleteBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (reportPk) {
      deleteMutation.mutate(reportPk);
    }
  };

  const onClickUpdateModeBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsUpdateMode((prev) => !prev);
    setTitleErrorMessage("");
    setContentErrorMessage("");
  };

  const onSubmit: SubmitHandler<IReportValues> = async (data) => {
    if (!data.title) {
      setTitleErrorMessage("제목을 반드시 입력해야 합니다.");
      return;
    } else if (!data.content) {
      setContentErrorMessage("내용을 반드시 입력해야 합니다.");
      return;
    } else {
      setTitleErrorMessage("");
      setContentErrorMessage("");
    }
    if (!isUpdating) {
      setIsUpdating(true);
      const obj = {
        pk: report?.pk,
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
      updateMutation.mutate(obj);
    }
  };

  useEffect(() => {
    setUploadedFileName(report?.image_title || "");
  }, []);

  return (
    <VStack justifyContent={"flex-start"} gap={12} my={36}>
      <Container>
        {!isReportLoading && report ? (
          <>
            <VStack
              w={"full"}
              alignItems={"flex-start"}
              as={"form"}
              onSubmit={handleSubmit(onSubmit)}
            >
              {isUpdateMode ? (
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
              ) : (
                <VStack w={"full"} pb={4} userSelect={"none"}>
                  <Image
                    src={report.image_url}
                    fallbackSrc={"https://placehold.co/480x360?text=Loading..."}
                    borderRadius={"lg"}
                    width={"100%"}
                  />
                </VStack>
              )}
              <FormControl>
                <FormLabel fontSize={24} pb={2}>
                  제목
                </FormLabel>
                <Input
                  {...register("title", {
                    required: {
                      value: true,
                      message: "제목을 반드시 입력해야 합니다.",
                    },
                  })}
                  defaultValue={report.title}
                  name={"title"}
                  type="text"
                  focusBorderColor={isUpdateMode ? "primary" : "none"}
                  fontSize={20}
                  variant={isUpdateMode ? "Outline" : "unstyled"}
                  disabled={!isUpdateMode}
                />
                <FormHelperText color={"youtubeRed"} py={1}>
                  {titleErrorMessage && `* ${titleErrorMessage}`}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={24} pb={2}>
                  내용
                </FormLabel>
                <Textarea
                  {...register("content", {
                    required: {
                      value: true,
                      message: "내용을 반드시 입력해야 합니다.",
                    },
                  })}
                  defaultValue={report.content}
                  name={"content"}
                  rows={10}
                  focusBorderColor={isUpdateMode ? "primary" : "none"}
                  fontSize={20}
                  variant={isUpdateMode ? "Outline" : "unstyled"}
                  disabled={!isUpdateMode}
                />
                <FormHelperText color={"youtubeRed"} py={1}>
                  {contentErrorMessage && `* ${contentErrorMessage}`}
                </FormHelperText>
              </FormControl>

              {!isUserLoading &&
              user &&
              Number(user.pk) === Number(report?.user) ? (
                isUpdateMode ? (
                  <HStack w={"full"} justifyContent={"flex-end"}>
                    <Button
                      isLoading={isUpdating}
                      onClick={onClickUpdateModeBtn}
                      borderColor={"primary"}
                      colorScheme="blackAlpha"
                      variant={"outline"}
                    >
                      취소
                    </Button>
                    <Button
                      isLoading={isUpdating}
                      type={"submit"}
                      bgColor={"primary"}
                      colorScheme="blackAlpha"
                    >
                      수정
                    </Button>
                  </HStack>
                ) : (
                  <HStack w={"full"} justifyContent={"flex-end"}>
                    <Button
                      onClick={onClickDeleteBtn}
                      bgColor={"primary"}
                      colorScheme="blackAlpha"
                    >
                      삭제
                    </Button>
                    <Button
                      onClick={onClickUpdateModeBtn}
                      borderColor={"primary"}
                      colorScheme={"blackAlpha"}
                      variant={"outline"}
                    >
                      수정
                    </Button>
                  </HStack>
                )
              ) : null}
            </VStack>
          </>
        ) : null}
      </Container>
    </VStack>
  );
}
