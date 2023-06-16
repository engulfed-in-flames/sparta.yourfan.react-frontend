import React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { apiPostChannelHandle } from "../../api";
import { ICreateForumFormValues } from "../../type";

interface ICreateForumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateForumModal({
  isOpen,
  onClose,
}: ICreateForumModalProps) {
  const { register, handleSubmit, reset } = useForm<ICreateForumFormValues>();

  const toast = useToast();

  const mutation = useMutation(apiPostChannelHandle, {
    onSuccess: () => {
      toast({
        title: "포럼 생성하기 성공",
        description: "포럼이 생성되고 있습니다.",
        status: "loading",
        position: "top",
      });
      reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "포럼 생성하기 실패.",
        description: "채널 핸들을 다시 한 번 확인해주세요.",
        status: "warning",
        position: "top",
      });
    },
  });

  const onSubmit: SubmitHandler<ICreateForumFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent userSelect={"none"}>
        <ModalHeader textAlign={"center"} py={8}>
          <Text fontSize={32}>포럼 생성하기</Text>
        </ModalHeader>
        <ModalCloseButton top={10} right={6} />
        <ModalBody>
          <FormControl onSubmit={handleSubmit(onSubmit)} isRequired as="form">
            <InputGroup mb={8}>
              <InputLeftElement
                pointerEvents={"none"}
                children={<MdAlternateEmail color={"gray"} size={18} />}
                pt={2}
              />
              <Input
                {...register("channelHandle", { required: true })}
                type={"text"}
                id={"channelHandle"}
                placeholder="채널 핸들을 입력하세요"
                required
                variant={"flushed"}
                size={"lg"}
                errorBorderColor="crimson"
              />
            </InputGroup>
            <Box>
              <Text color={"gray.500"}>
                🔸 생성하기 버튼을 클릭하면 입력된 채널 핸들에 대한 포럼을
                생성합니다.
              </Text>
              <Text color={"gray.500"}>
                🔸 생성된 포럼은 해당 유튜브 채널에 대한 분석이 완료되어야지만
                접근할 수 있습니다.
              </Text>
              <Text color={"gray.500"}>🔸 예상 소요 시간: 3~10분</Text>
            </Box>

            <Button
              type={"submit"}
              w={"full"}
              py={6}
              my={8}
              color={"white"}
              bgColor={"primary"}
            >
              <Text fontSize={18}>생성하기</Text>
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
