import {
  Button,
  FormControl,
  FormHelperText,
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
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { apiPostLogin } from "../../api";
import SocialLogin from "../SocialLogin";
import { ILoginFormValues } from "../../type";

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const { register, handleSubmit, reset } = useForm<ILoginFormValues>();
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation(apiPostLogin, {
    onSuccess: () => {
      toast({
        title: "로그인",
        description: "환영합니다",
        status: "success",
        position: "bottom-right",
        duration: 3000,
      });
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: (err: AxiosError) => {
      if (err && err.response) {
        const { status } = err.response;
        if (status === 406) {
          setErrorMessage("탈퇴한 회원입니다.");
        } else {
          setErrorMessage("이메일 또는 비밀번호가 유효하지 않습니다.");
        }
      }
    },
  });

  const onSubmit: SubmitHandler<ILoginFormValues> = (data) => {
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(data.email)) {
      setErrorMessage("이메일이 유효하지 않습니다.");
      return;
    }
    if (data.password.length < 8) {
      setErrorMessage("비밀번호는 최소 8자리 이상이어야 합니다.");
      return;
    }
    setErrorMessage("");
    mutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
        setErrorMessage("");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} py={8}>
          <Text fontSize={32}>로그인</Text>
        </ModalHeader>
        <ModalCloseButton top={10} right={6} />
        <ModalBody as={"form"} noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={2}>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                children={<MdAlternateEmail color={"gray"} size={18} />}
                pt={2}
              />
              <Input
                {...register("email", { required: true })}
                type={"email"}
                placeholder="이메일"
                required
                variant={"flushed"}
                size={"lg"}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={2}>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                children={<MdLock color={"gray"} size={18} />}
                pt={2}
              />
              <Input
                {...register("password", { required: true })}
                type={"password"}
                placeholder="비밀번호"
                required
                variant={"flushed"}
                size={"lg"}
              />
            </InputGroup>
          </FormControl>
          {errorMessage ? (
            <Text color="youtubeRed" p={1}>
              * {errorMessage}
            </Text>
          ) : null}
          <Button type={"submit"} w={"full"} py={6} my={8}>
            <Text fontSize={18}>계속</Text>
          </Button>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
          >
            <SocialLogin onClose={onClose} />
          </GoogleOAuthProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
