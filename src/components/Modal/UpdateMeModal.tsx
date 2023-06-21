import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { apiUpdateMe } from "../../api";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
}

export default function UpdateMeModal({ isOpen, onClose, nickname }: IProps) {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const queryClient = new QueryClient();
  const mutation = useMutation(apiUpdateMe, {
    onSuccess: () => {
      toast({
        title: "회원 정보가 수정됐습니다.",
        status: "success",
        position: "top",
      });
      queryClient.refetchQueries(["me"]);
    },
    onError: () => {
      toast({
        title: "회원 정보 수정에 실패했습니다.",
        status: "error",
        position: "top",
      });
    },
  });
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // mutation.mutate()
    console.log("Clicked");
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원 정보 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isDisabled={true}>
                <FormLabel>프로필 사진 변경</FormLabel>
                <Input type="file" />
              </FormControl>
              <FormControl>
                <FormLabel>닉네임 변경</FormLabel>
                <Input type="text" value={nickname} />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant={"solid"} mr={3} onClick={onClose}>
              닫기
            </Button>
            <Button
              onClick={onClick}
              bgColor={"primary"}
              color={"white"}
              _hover={{ bgColor: "blackAlpha.700", color: "gray.200" }}
            >
              수정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
