import { Heading, Spinner, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { apiKakaoLogin } from "../api";

export default function KakaoConfirm() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const confirmKakao = async () => {
    const code = searchParams.get("code");
    if (code) {
      const loggedIn = await apiKakaoLogin(code);
      if (loggedIn) {
        toast({
          title: "로그인",
          description: "환영합니다",
          status: "success",
          position: "bottom-right",
        });
      }
      queryClient.refetchQueries(["me"]);
      navigate("/");
    }
  };
  useEffect(() => {
    confirmKakao();
  });

  return (
    <VStack mt={120}>
      <Heading mb={8}>카카오 계정으로 로그인 하는 중...</Heading>
      <Spinner size="lg" />
    </VStack>
  );
}
