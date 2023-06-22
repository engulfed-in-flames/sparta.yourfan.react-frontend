import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiInvalidateMe } from "../../api";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawlModal({ isOpen, onClose }: IProps) {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const toast = useToast();
  const mutation = useMutation(apiInvalidateMe, {
    onSuccess: () => {
      toast({
        title: "회원 탈퇴가 완료됐습니다.",
        status: "success",
        position: "bottom-right",
        duration: 3000,
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    onError: () => {
      toast({
        title: "회원 탈퇴에 실패했습니다.",
        status: "error",
        position: "bottom-right",
        duration: 3000,
      });
    },
  });
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원탈퇴</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>정말로 탈퇴하시겠습니까?</Text>
            <Flex justifyContent={"flex-end"} py={4}>
              <Button variant={"solid"} mr={3} onClick={onClose}>
                닫기
              </Button>
              <Button
                onClick={onClick}
                bgColor={"youtubeRed"}
                colorScheme={"red"}
              >
                탈퇴
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
