import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { CgMenu } from "react-icons/cg";
import { VscWarning } from "react-icons/vsc";
import Cookies from "js-cookie";
import LoginModal from "./Modal/LoginModal";
import SignupModal from "./Modal/SignupModal";
import { IMe } from "../type";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atom";

interface IHeaderProps {
  isUserLoading: boolean;
  me: IMe | undefined;
}

export default function Header({ isUserLoading, me }: IHeaderProps) {
  const setUser = useSetRecoilState(userAtom);
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  const onClickLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    queryClient.refetchQueries(["me"]);
    setUser(undefined);
    toast({
      title: "로그아웃",
      status: "success",
      position: "bottom-right",
    });
  };
  return (
    <Flex
      zIndex={99}
      userSelect={"none"}
      position={"fixed"}
      top={0}
      left={0}
      w={"100%"}
      h={16}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgColor={"primary"}
      boxShadow={"lg"}
    >
      <UnorderedList
        display={"flex"}
        alignItems={"center"}
        listStyleType={"none"}
        color={"white"}
      >
        <ListItem mr={8}>
          <Link to={"/"}>
            <Heading size={"lg"} fontWeight={"medium"}>
              <Text display={"inline"} color={"youtubeRed"}>
                You
              </Text>
              Rfan
            </Heading>
          </Link>
        </ListItem>
        <ListItem pt={1} mr={4}>
          <Link to={"/"}>
            <Flex alignItems={"center"}>
              <Text fontSize={"lg"} mr={1}>
                홈
              </Text>
            </Flex>
          </Link>
        </ListItem>
        <ListItem pt={1}>
          <Link to={"/report"}>
            <Flex alignItems={"center"}>
              <Text fontSize={"lg"} mr={1}>
                신고하기
              </Text>
              <Icon as={VscWarning} color={"youtubeRed"} />
            </Flex>
          </Link>
        </ListItem>
      </UnorderedList>
      <Flex
        w={"30%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pr={4}
      >
        <Input
          type={"search"}
          placeholder={"현재 구현 중입니다 😭"}
          focusBorderColor={"youtubeRed"}
          w={"70%"}
          minW={"280px"}
          bgColor={"white"}
          borderRadius={"full"}
        />
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<CgMenu />}
            rightIcon={<Avatar src={""} size={"sm"} bgColor={"primary"} />}
            size={"md"}
            minW={24}
            h={12}
            bg={"white"}
            borderRadius={"3xl"}
            boxShadow={"md"}
            ml={4}
          ></MenuButton>
          <MenuList>
            {!isUserLoading && me ? (
              <>
                <Link to="/me">
                  <MenuItem>
                    <Text fontSize={18}>마이페이지</Text>
                  </MenuItem>
                </Link>
                <MenuItem onClick={onClickLogout}>
                  <Text fontSize={18} color={"gray.400"}>
                    로그아웃
                  </Text>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={onLoginOpen}>
                  <Text fontSize={18}>로그인</Text>
                </MenuItem>
                <MenuItem onClick={onSignupOpen}>
                  <Text fontSize={18}>회원가입</Text>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </Flex>
  );
}
