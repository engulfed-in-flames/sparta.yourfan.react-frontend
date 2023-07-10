import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import { IMe } from "../type";
import { apiGetBannedOrNot, apiGetMe } from "../api";
import { isUserLoadingAtom, userAtom } from "../atom";
import { useToast } from "@chakra-ui/react";

export const useUser = () => {
  const isUserLoading = useRecoilValue(isUserLoadingAtom);
  const user = useRecoilValue<IMe | undefined>(userAtom);
  return {
    isUserLoading,
    user,
  };
};

export const useUserAtom = () => {
  const [user, setUser] = useRecoilState<IMe | undefined>(userAtom);
  const [isUserLoading, setIsUserLoading] = useRecoilState(isUserLoadingAtom);
  const { isLoading, data } = useQuery<IMe>(["me"], apiGetMe, {
    retry: false,
  });
  useEffect(() => {
    setIsUserLoading(isLoading);
    setUser(data);
    return () => {
      setUser(undefined);
    };
  }, [setUser, setIsUserLoading, isLoading, data]);
  return { isUserLoading, user };
};

export const useNotUserOnly = () => {
  const navigate = useNavigate();
  if (Cookies.get("access")) {
    navigate("/");
  }
};

export const useUserOnly = () => {
  const navigate = useNavigate();
  if (!Cookies.get("access")) {
    navigate("/");
  }
};

export const useNotBannedUserOnly = async (custom_url: string) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading, data: statusCode } = useQuery(
    ["BannedOrNot", custom_url],
    () => apiGetBannedOrNot(custom_url)
  );

  useEffect(() => {
    if (custom_url) {
      if (!isLoading && Number(statusCode) !== 200) {
        navigate("/");
        toast({
          title: "차단된 사용자이므로 접근이 제한됩니다",
          status: "warning",
          position: "top",
          duration: 3000,
        });
      }
    }
  }, [custom_url, statusCode, isLoading]);
};
