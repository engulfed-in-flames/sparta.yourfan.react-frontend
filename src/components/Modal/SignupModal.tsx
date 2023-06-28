import {
  Box,
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
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SocialLogin from "../SocialLogin";
import { ISingupFormValues } from "../../type";
import { apiPostSignup } from "../../api";
import { AxiosError } from "axios";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: IProps) {
  const { register, handleSubmit, reset } = useForm<ISingupFormValues>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const toast = useToast();

  const mutation = useMutation(apiPostSignup, {
    onMutate: () => {
      setIsRegistering(true);
    },
    onSuccess: () => {
      toast({
        title: "회원가입에 성공했습니다.",
        description: "이메일 인증이 완료되면 로그인할 수 있습니다.",
        status: "success",
        position: "top",
        duration: 5000,
      });
      reset();
      setIsRegistering(false);
      onClose();
    },
    onError: (err: AxiosError) => {
      if (err.status === 406) {
        toast({
          title: "이미 가입된 회원입니다.",
          status: "info",
          position: "top",
          duration: 5000,
        });
      } else {
        toast({
          title: "회원가입에 실패했습니다.",
          status: "warning",
          position: "top",
          duration: 3000,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<ISingupFormValues> = (data) => {
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!emailRegex.test(data.email)) {
      setErrorMessage("이메일이 유효하지 않습니다.");
      return;
    }
    if (data.password1.length < 8) {
      setErrorMessage("비밀번호는 최소 8자리 이상이어야 합니다.");
      return;
    }
    if (!passwordRegex.test(data.password1)) {
      setErrorMessage(
        "비밀번호는 문자, 숫자, 특수문자를 최소 하나씩 포함하여 8자리 이상 입력해야 합니다."
      );
      return;
    }
    if (data.password1 !== data.password2) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    mutation.mutate(data);
    setErrorMessage("");
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
      <ModalContent userSelect={"none"}>
        <ModalHeader textAlign={"center"} py={8}>
          <Text fontSize={32}>회원가입</Text>
        </ModalHeader>
        <ModalCloseButton top={10} right={6} />
        <ModalBody>
          <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputGroup mb={2}>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<MdAlternateEmail color={"gray"} size={18} />}
                  pt={2}
                />
                <Input
                  {...register("email", { required: true })}
                  type={"email"}
                  id={"email"}
                  placeholder="이메일"
                  required
                  variant={"flushed"}
                  size={"lg"}
                  errorBorderColor="crimson"
                />
              </InputGroup>
              <FormHelperText px={2}>
                🔸입력한 이메일로 인증 메일이 전송됩니다.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputGroup mb={2}>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<MdLock color={"gray"} size={18} />}
                  pt={2}
                />
                <Input
                  {...register("password1", { required: true })}
                  type={"password"}
                  id={"password1"}
                  placeholder="비밀번호"
                  required
                  variant={"flushed"}
                  size={"lg"}
                  errorBorderColor="crimson"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mb={2}>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<MdLock color={"gray"} size={18} />}
                  pt={2}
                />
                <Input
                  {...register("password2", { required: true })}
                  type={"password"}
                  id={"password2"}
                  placeholder="비밀번호 확인"
                  required
                  variant={"flushed"}
                  size={"lg"}
                  errorBorderColor="crimson"
                />
              </InputGroup>
              <FormHelperText px={2}>
                🔸비밀번호는 문자, 숫자, 특수문자를 최소 하나씩 포함하여 8자리
                이상 입력해야 합니다.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputGroup mb={2}>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<FaUser color={"gray"} size={18} />}
                  pt={2}
                />
                <Input
                  {...register("nickname", { required: true })}
                  type={"text"}
                  id={"nickname"}
                  placeholder="닉네임"
                  required
                  variant={"flushed"}
                  size={"lg"}
                  errorBorderColor="crimson"
                />
              </InputGroup>
            </FormControl>
            {errorMessage ? (
              <Text color="youtubeRed" p={1}>
                * {errorMessage}
              </Text>
            ) : null}
            <Button
              isLoading={isRegistering}
              type={"submit"}
              w={"full"}
              fontSize={18}
              py={6}
              my={8}
            >
              등록
            </Button>
          </Box>

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
