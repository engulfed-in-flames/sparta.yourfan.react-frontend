import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import { IMe } from "../type";
import { apiGetMe } from "../api";
import { isUserLoadingAtom, userAtom } from "../atom";

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
