import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useIsDigit = (postPk: string) => {
  const navigate = useNavigate();
  const regex = /^\d+$/;
  useEffect(() => {
    if (!regex.test(postPk)) {
      return navigate("/");
    }
  }, []);
};
