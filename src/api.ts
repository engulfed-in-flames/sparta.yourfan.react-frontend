import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true,
});

export const apiGetMe = async () => {
  try {
    const response = await axiosInstance.get("", {
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

export const apiPostLogin = async ({ email, password }: any) => {
  const response = await axiosInstance.post(
    "",
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
  const { access, refresh } = response.data;
  Cookies.set("access", access);
  Cookies.set("refresh", refresh);
};

export const apiInvalidateUser = async () => {
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
