import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import WithdrawlModal from "../components/Modal/WithdrawlModal";
import UpdateMeModal from "../components/Modal/UpdateMeModal";
import { useUser, useUserOnly } from "../hooks/userHooks";
import MyPostListModal from "../components/Modal/MyPostListModal";
import { apiGetPreStaffList } from "../api";
import { IPreStaff } from "../type";
import MyProfile from "../components/Me/MyProfile";
import MyForumList from "../components/Me/MyForumList";
import BoardPreStaffList from "../components/Me/BoardPreStaffList";

export default function Me() {
  useUserOnly();
  const { isUserLoading, user } = useUser();
  const {
    isOpen: isWithdrawlOpen,
    onOpen: onWithdrawlOpen,
    onClose: onWithdrawlClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateMeOpen,
    onOpen: onUpdateMeOpen,
    onClose: onUpdateMeClose,
  } = useDisclosure();
  const {
    isOpen: isMyPostListOpen,
    onOpen: onMyPostListOpen,
    onClose: onMyPostListClose,
  } = useDisclosure();

  const { isLoading: isPreStaffListLoading, data: preStaffList } = useQuery<
    IPreStaff[]
  >(["preStaffList"], apiGetPreStaffList);

  return (
    <VStack w={"90%"} minW={"1280px"} py={12} my={24} mx={"auto"}>
      {!isUserLoading && user ? (
        <Grid
          w={"full"}
          h={"full"}
          templateColumns={"1fr 2.5fr"}
          gap={16}
          px={4}
          py={8}
        >
          <GridItem minH={"720px"} px={4}>
            <MyProfile
              isLoading={isUserLoading}
              data={user}
              onOpen={onMyPostListOpen}
            />
          </GridItem>
          <GridItem minH={"720px"}>
            <Flex h={"full"} flexDirection={"column"} alignItems={"flex-start"}>
              <HStack w={"full"} justifyContent={"space-between"} mb={8}>
                <Heading as="h3" fontSize={"4xl"}>
                  마이페이지
                </Heading>
                <ButtonGroup>
                  <Button onClick={onUpdateMeOpen} variant={"ghost"}>
                    회원 정보 수정
                  </Button>
                  <Button
                    onClick={onWithdrawlOpen}
                    variant={"ghost"}
                    colorScheme={"red"}
                  >
                    회원 탈퇴
                  </Button>
                </ButtonGroup>
              </HStack>

              <MyForumList />

              {user.is_admin && !isPreStaffListLoading && preStaffList ? (
                <BoardPreStaffList data={preStaffList} />
              ) : null}
            </Flex>
          </GridItem>
        </Grid>
      ) : null}

      <WithdrawlModal isOpen={isWithdrawlOpen} onClose={onWithdrawlClose} />
      <UpdateMeModal
        isOpen={isUpdateMeOpen}
        onClose={onUpdateMeClose}
        nickname={user?.nickname || ""}
      />
      <MyPostListModal isOpen={isMyPostListOpen} onClose={onMyPostListClose} />
    </VStack>
  );
}
