import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useIsDigit = (postPk: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const regex = /^\d+$/;
    if (!regex.test(postPk)) {
      return navigate("/");
    }
  }, [navigate, postPk]);
};
