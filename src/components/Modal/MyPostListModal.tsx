import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { apiGetMyPostList } from "../../api";
import { IPost } from "../../type";
import MyPostList from "../Me/MyPostList";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyPostListModal({ isOpen, onClose }: IProps) {
  const { isLoading, data: postList } = useQuery<IPost[]>(
    ["postList"],
    apiGetMyPostList
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>내가 쓴 글</ModalHeader>
          <ModalCloseButton />
          {!isLoading && postList ? (
            <ModalBody>
              <MyPostList postList={postList} />
            </ModalBody>
          ) : (
            <VStack py={8}>
              <Spinner size="lg" />
            </VStack>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
