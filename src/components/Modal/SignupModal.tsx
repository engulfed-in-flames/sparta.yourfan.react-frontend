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
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MdLock, MdPhoneIphone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import SocialLogin from "../SocialLogin";
import { ISingupFormValues } from "../../type";
import { apiPostSignup, apiSendAuthSMS } from "../../api";
import { AxiosError } from "axios";
import { BiCheck } from "react-icons/bi";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: IProps) {
  const { register, handleSubmit, reset, watch } = useForm<ISingupFormValues>();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [authErrorMessage, setAuthErrorMessage] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const toast = useToast();

  const mutation = useMutation(apiPostSignup, {
    onMutate: () => {
      setIsRegistering(true);
    },
    onSuccess: () => {
      toast({
        title: "회원가입에 성공했습니다.",
        status: "success",
        position: "top",
        duration: 5000,
      });
      reset();
      setIsRegistering(false);
      onClose();
    },
    onError: (err: AxiosError) => {
      if (err && err.response?.status === 406) {
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
      setIsRegistering(false);
      setErrorMessage("");
    },
  });

  const sendSMSMutation = useMutation(apiSendAuthSMS, {
    onSuccess: () => {
      toast({
        title: "인증 메세지가 발송됐습니다",
        status: "success",
        position: "top",
        duration: 3000,
      });
    },
    onError: (err: AxiosError) => {
      if (err && err.response?.status === 406)
        setAuthErrorMessage("이미 사용된 휴대폰 번호입니다");
    },
  });

  const sendAuthNumberMutation = useMutation(apiSendAuthSMS, {
    onSuccess: () => {
      setVerified(true);
    },
    onError: (err: AxiosError) => {
      setAuthErrorMessage("인증에 실패했습니다");
    },
  });

  const onClickSendSMSBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const phoneNumberRegex = /^010?[0-9]\d{3}?\d{4}$/;
    const { phone_number } = watch();
    if (phoneNumberRegex.test(phone_number)) {
      setAuthErrorMessage("");
      sendSMSMutation.mutate(phone_number);
    } else {
      setAuthErrorMessage("휴대폰 번호가 유효하지 않습니다");
    }
  };

  const onClickVerifyBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { auth_number } = watch();
    const authNumberRegex = /^\d{6}$/;
    if (auth_number) {
      if (authNumberRegex.test(auth_number)) {
        sendAuthNumberMutation.mutate(auth_number);
      } else {
        setAuthErrorMessage("인증 번호가 유효하지 않습니다");
      }
    } else {
      setAuthErrorMessage("인증 번호를 입력하세요");
    }
  };

  const onSubmit: SubmitHandler<ISingupFormValues> = (data) => {
    if (!verified) {
      setErrorMessage("인증이 필요합니다");
      return;
    }

    const emailIDRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,16}$/;
    if (!emailIDRegex.test(data.email_id)) {
      setErrorMessage("아이디가 유효하지 않습니다");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (data.password1.length < 8) {
      setErrorMessage("비밀번호는 최소 8자리 이상이어야 합니다");
      return;
    }

    if (!passwordRegex.test(data.password1)) {
      setErrorMessage(
        "비밀번호는 문자, 숫자, 특수문자를 최소 하나씩 포함하여 8자리 이상 입력해야 합니다"
      );
      return;
    }
    if (data.password1 !== data.password2) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
        setErrorMessage("");
        setAuthErrorMessage("");
        setVerified(false);
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
                  children={<RiAccountCircleFill color={"gray"} size={18} />}
                  pt={2}
                />
                <Input
                  {...register("email_id", { required: true })}
                  type={"email_id"}
                  id={"email_id"}
                  placeholder="아이디"
                  required
                  variant={"flushed"}
                  size={"lg"}
                  errorBorderColor="crimson"
                />
                <Input
                  userSelect={"none"}
                  disabled
                  defaultValue={"@yourfan.com"}
                  variant={"flushed"}
                  size={"lg"}
                />
              </InputGroup>
              <FormHelperText px={2}>
                🔸아이디는 5자 이상, 16자 이하 영문과 숫자 혼용만을 허용합니다
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputGroup display={"flex"} alignItems={"center"} mb={2}>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<MdPhoneIphone color={"gray"} size={18} />}
                  pt={2}
                />
                <Input
                  {...register("phone_number", { required: true })}
                  type={"phone_number"}
                  id={"phone_number"}
                  placeholder={`"-"를 빼고 입력하세요`}
                  required
                  variant={"flushed"}
                  size={"lg"}
                  errorBorderColor="crimson"
                />
                <Button onClick={onClickSendSMSBtn}>인증</Button>
              </InputGroup>
              <FormHelperText px={2}>
                🔸인증 문자는 번호당 5번으로 제한됩니다. 신중하게 입력해주세요.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputGroup display={"flex"} alignItems={"center"} mb={2}>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<BiCheck color={"gray"} size={18} />}
                  pt={2}
                />
                <Input
                  {...register("auth_number", { required: true })}
                  type={"auth_number"}
                  id={"auth_number"}
                  placeholder="인증 번호"
                  required
                  variant={"flushed"}
                  size={"lg"}
                  errorBorderColor="crimson"
                />
                <Button onClick={onClickVerifyBtn}>확인</Button>
              </InputGroup>
              {verified ? (
                <FormHelperText color={"green"} px={4}>
                  인증되었습니다
                </FormHelperText>
              ) : authErrorMessage ? (
                <FormHelperText color={"youtubeRed"} px={2}>
                  ❗ {authErrorMessage}
                </FormHelperText>
              ) : null}
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
                이상 입력해야 합니다
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
