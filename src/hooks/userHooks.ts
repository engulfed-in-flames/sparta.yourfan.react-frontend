import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IMe } from "../type";
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

export const useNotUserOnly = () => {
  const { isUserLoading, user } = useMe();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoading && user) navigate("/");
  }, [isUserLoading, user, navigate]);
};

export const useUserOnly = () => {
  const { isUserLoading, user } = useMe();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoading && !user) navigate("/");
  }, [isUserLoading, user, navigate]);
};
