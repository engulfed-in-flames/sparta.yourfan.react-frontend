import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IMe, IUseMeProps } from "../type";
import { apiGetMe } from "../api";

export const useMe = () => {
  const { isLoading, data } = useQuery<IMe>(["me"], apiGetMe, {
    retry: false,
  });
  return {
    isUserLoading: isLoading,
    user: data || null,
  };
};

export const useOutletContextUser = () => {
  return useOutletContext<IUseMeProps>();
};

export const useUserOnly = () => {
  const { isUserLoading, user } = useMe();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoading || !user) navigate("/");
  }, [isUserLoading, user, navigate]);
};
