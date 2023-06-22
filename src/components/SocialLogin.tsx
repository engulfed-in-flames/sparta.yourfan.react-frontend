import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { apiGoogleLogin } from "../api";
import { AxiosError } from "axios";

interface IProps {
  onClose: () => void;
}

export default function SocialLogin({ onClose }: IProps) {
  const toast = useToast();
  const queryClient = new QueryClient();

  // Kakao
  const kakaoParams = {
    client_id: process.env.REACT_APP_KAKAO_API_KEY!,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI!,
    response_type: "code",
  };
  const kakaoSearchParams = new URLSearchParams(kakaoParams).toString();
  const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?${kakaoSearchParams}`;
  //Github
  const githubParams = {
    client_id: process.env.REACT_APP_GH_CLIENT_ID!,
    redirect_uri: process.env.REACT_APP_GH_REDIRECT_URI!,
    scope: "read:user,user:email",
  };
  const githubSearchParams = new URLSearchParams(githubParams).toString();
  const githubOauthUrl = `https://github.com/login/oauth/authorize?${githubSearchParams}`;
  //Google
  const mutation = useMutation(apiGoogleLogin, {
    onSuccess: () => {
      queryClient.refetchQueries(["me"]);
      onClose();
      toast({
        title: "환영합니다",
        status: "success",
        position: "bottom-right",
      });
    },
    onError: (err: AxiosError) => {
      const { status } = err?.response!;
      if (status === 403) {
        toast({
          title: "탈퇴된 회원입니다",
          status: "warning",
          position: "bottom-right",
          duration: 3000,
        });
      } else {
        toast({
          title: "로그인에 실패했습니다",
          status: "error",
          position: "bottom-right",
          duration: 3000,
        });
      }
    },
  });
  const onClickGoogleBtn = useGoogleLogin({
    onSuccess: (res) => {
      mutation.mutate(res.access_token);
    },
  });

  return (
    <Box>
      <HStack>
        <Divider />
        <Text color={"gray.400"} textTransform={"uppercase"}>
          or
        </Text>
        <Divider />
      </HStack>
      <VStack spacing={2} py={8}>
        <Button
          href={githubOauthUrl}
          as="a"
          leftIcon={<AiFillGithub />}
          w={"100%"}
          bg={"blackAlpha.900"}
          color={"white"}
          py={6}
        >
          <Text w={48}>Continue With Github</Text>
        </Button>
        <Button
          href={kakaoOauthUrl}
          as="a"
          leftIcon={<RiKakaoTalkFill />}
          w={"100%"}
          colorScheme={"yellow"}
          py={6}
        >
          <Text w={48}>Continue With Kakaotalk</Text>
        </Button>
        <Button
          onClick={() => onClickGoogleBtn()}
          as="a"
          leftIcon={<FcGoogle />}
          w={"100%"}
          py={6}
        >
          <Text w={48}>Continue With Google</Text>
        </Button>
      </VStack>
    </Box>
  );
}
