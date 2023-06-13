import { useQuery } from "@tanstack/react-query";
import { apiGetMe } from "../api";
import { IMe, IUseMeProps } from "../type";
import { useOutletContext } from "react-router-dom";

export function useMe() {
  const { isLoading, data } = useQuery<IMe>(["me"], apiGetMe, {
    retry: false,
  });
  return {
    isUserLoading: isLoading,
    user: data || null,
  };
}

export function useOutletContextUser() {
  return useOutletContext<IUseMeProps>();
}
