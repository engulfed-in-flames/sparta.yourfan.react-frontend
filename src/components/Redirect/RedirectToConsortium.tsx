import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RedirectToConsortium() {
  const { channel } = useParams();
  const URL = `/${channel}/consortium`;
  const navigate = useNavigate();
  useEffect(() => {
    navigate(URL);
  }, []);
  return <></>;
}
