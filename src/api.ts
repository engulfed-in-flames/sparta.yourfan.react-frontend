import axios from "axios";
import Cookies from "js-cookie";
import { ILoginValues } from "./type";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const apiPostChannelHandle = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "",
      {
        ...data,
      },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    );
    return response.status;
  } catch (e) {
    throw e;
  }
};

export const apiGetMe = async () => {
  try {
    const response = await axiosInstance.get("users/me/", {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("로그인 실패");
    }
    return response.data;
  } catch (e) {
    return null;
  }
};

export const apiPostLogin = async ({ email, password }: ILoginValues) => {
  const response = await axiosInstance.post(
    "users/token/",
    {
      email,
      password,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  console.log(response);
  const { access, refresh } = response.data;
  Cookies.set("access", access);
  Cookies.set("refresh", refresh);
};

export const apiPostSignup = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "",
      {
        ...data,
      },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    );
    return response.status;
  } catch (e) {
    throw e;
  }
};

export const apiDeleteUser = async () => {
  const response = await axiosInstance.delete("", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });
  Cookies.remove("access");
  Cookies.remove("refresh");
  return response.status;
};
