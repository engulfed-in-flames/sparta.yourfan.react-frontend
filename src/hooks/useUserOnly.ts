import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMe } from "./useMe";

export default function useUserOnly() {
  const { isUserLoading, user } = useMe();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoading || user) navigate("/");
  }, [isUserLoading, user, navigate]);
}
