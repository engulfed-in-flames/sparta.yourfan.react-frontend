import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CgMenu } from "react-icons/cg";
import Cookies from "js-cookie";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function Header() {
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

  const toast = useToast();
  const queryClient = useQueryClient();

  const onClickLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    queryClient.refetchQueries(["me"]);
    toast({
      title: "로그아웃",
      status: "success",
      position: "bottom-right",
    });
  };

  return (
    <HStack
      userSelect={"none"}
      w={"full"}
      px={12}
      boxShadow={"base"}
      justifyContent={"space-between"}
    >
      <Box position={"relative"} w={100} h={100} overflow={"hidden"}>
        <Link to={"/"}>
          <Image
            src="/images/logo.png"
            position={"absolute"}
            top={-10}
            left={0}
            height={200}
            objectFit={"cover"}
          />
        </Link>
      </Box>
      <Flex>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<CgMenu />}
            w={24}
            h={12}
            px={4}
            bg={"white"}
            borderRadius={"3xl"}
            boxShadow={"md"}
          >
            <Avatar src={""} size={"sm"} bgColor={"black"} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onLoginOpen}>
              <Text fontSize={18}>로그인</Text>
            </MenuItem>
            <MenuItem onClick={onSignupOpen}>
              <Text fontSize={18}>회원가입</Text>
            </MenuItem>
            <Link to="/me">
              <MenuItem>
                <Text fontSize={16}></Text>마이페이지
              </MenuItem>
            </Link>
            <MenuItem onClick={onClickLogout}>
              <Text fontSize={16} color={"gray.400"}>
                로그아웃
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
