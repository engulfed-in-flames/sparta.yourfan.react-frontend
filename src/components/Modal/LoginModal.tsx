import {
  Button,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAlternateEmail, MdLock } from "react-icons/md";

import { apiPostLogin } from "../../api";
import SocialLogin from "../SocialLogin";

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  email: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const { register, handleSubmit, reset } = useForm<IForm>();

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
    onError: () => {
      toast({
        title: "로그인 실패",
        status: "error",
        position: "bottom-right",
        duration: 3000,
      });
    },
  });

  const onSubmit: SubmitHandler<IForm> = ({ email, password }) => {
    mutation.mutate({ email, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} py={8}>
          <Text fontSize={32}>로그인</Text>
        </ModalHeader>
        <ModalCloseButton top={10} right={6} />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <InputGroup mb={2}>
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
          <InputGroup mb={2}>
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
          <Button type={"submit"} w={"full"} py={6} my={8}>
            <Text fontSize={18}>계속</Text>
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
