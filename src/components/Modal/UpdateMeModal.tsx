import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateMeModal({ isOpen, onClose }: IProps) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
              탈퇴
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
