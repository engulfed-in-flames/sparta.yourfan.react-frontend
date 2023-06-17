import axios from "axios";
import Cookies from "js-cookie";
import { ILoginFormValues, IPostValues, ISingupFormValues } from "./type";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const apiGetBoardList = async () => {
  try {
    const response = await axiosInstance.get("community/board/", {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const apiGetPostList = async (channel: string) => {
  try {
    const response = await axiosInstance.get(`community/post/${channel}/`, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const apiGetSimilarChannels = async (channel: string) => {
  try {
    const response = await axiosInstance.post(
      "youtube/find/",
      {
        title: channel,
      },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const apiPostChannel = async (channel_id: string) => {
  console.log(channel_id);
  try {
    const response = await axiosInstance.post(`youtube/${channel_id}/`, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });
    return response.status;
  } catch (err) {
    throw err;
  }
};

export const apiPostPost = async ({ board, title, content }: IPostValues) => {
  try {
    const response = await axiosInstance.post(
      "community/post/",
      {
        board,
        title,
        content,
      },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      }
    );
    return response.status;
  } catch (err) {
    throw err;
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
  } catch (err) {
    return null;
  }
};

export const apiPostLogin = async ({ email, password }: ILoginFormValues) => {
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
  const { access, refresh } = response.data;
  Cookies.set("access", access);
  Cookies.set("refresh", refresh);
};

export const apiPostSignup = async ({
  email,
  password1,
  password2,
  nickname,
}: ISingupFormValues) => {
  const response = await axiosInstance.post(
    "users/signup/",
    {
      email,
      password1,
      password2,
      nickname,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  return response.status;
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
