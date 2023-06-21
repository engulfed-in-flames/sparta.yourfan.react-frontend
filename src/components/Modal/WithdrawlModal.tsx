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
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawlModal({ isOpen, onClose }: IProps) {
  const navigate = useNavigate();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
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
