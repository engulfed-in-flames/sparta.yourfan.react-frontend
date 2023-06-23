import axios from "axios";
import Cookies from "js-cookie";
import {
  ILoginFormValues,
  IPostValues,
  IReportValues,
  ISingupFormValues,
  IUpdateMeFormValues,
  IUploadImageValues,
} from "./type";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

// Post API
export const apiGetPostList = async (channel: string) => {
  try {
    const response = await axiosInstance.get(
      `community/board/${channel}/posts/`,
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

export const apiPostPost = async ({ board, title, content }: IPostValues) => {
  const response = await axiosInstance.post(
    `community/post/`,
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
};

export const apiGetPost = async (postPk: string) => {
  try {
    const response = await axiosInstance.get(`community/post/${postPk}/`, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

// Board API
export const apiGetBoardList = async () => {
  try {
    const response = await axiosInstance.get("community/board/", {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

export const apiGetSimilarChannels = async (channel: string) => {
  try {
    const response = await axiosInstance.post(
      `youtube/find/${channel}/`,
      null,
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiPostChannel = async (channel_id: string) => {
  try {
    const response = await axiosInstance.post(`youtube/${channel_id}/`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });
    return response.status;
  } catch (err) {
    console.error("Error:", err);
  }
};

// Image Upload API
export const apiGetUploadURL = async () => {
  try {
    const response = await axiosInstance.post(`medias/upload-image/`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiUploadImage = async ({
  file,
  uploadURL,
}: IUploadImageValues) => {
  const form = new FormData();
  form.append("file", file);
  const response = await axios.post(uploadURL, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Report API
export const apiGetReportList = async () => {
  const response = await axiosInstance.get("medias/report/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    },
  });
  return response.data;
};

export const apiPostReport = async ({
  title,
  content,
  image_title,
  image_url,
  cloudflare_image_id,
}: IReportValues) => {
  const response = await axiosInstance.post(
    "medias/report/",
    {
      title,
      content,
      image_title,
      image_url,
      cloudflare_image_id,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    }
  );
  return response.status;
};

export const apiGetReport = async (pk: number) => {
  const response = await axiosInstance.get(`medias/report/${pk}/`, {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    },
  });
  return response.data;
};

export const apiPutReport = async ({
  pk,
  title,
  content,
  image_title,
  image_url,
  cloudflare_image_id,
}: IReportValues) => {
  const response = await axiosInstance.put(
    `medias/report/${pk}/`,
    {
      title,
      content,
      image_title,
      image_url,
      cloudflare_image_id,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    }
  );
  return response.status;
};

export const apiDeleteReport = async (pk: number) => {
  const response = await axiosInstance.delete(`medias/report/${pk}/`, {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });
  return response.data;
};

// User API
export const apiGetMe = async () => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  const response = await axiosInstance.get("users/me/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });

  return response.data;
};

export const apiUpdateMe = async ({
  nickname,
  avatar,
}: IUpdateMeFormValues) => {
  const response = await axiosInstance.put(
    "users/me/",
    { nickname, avatar },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    }
  );
  return response.status;
};

export const apiInvalidateMe = async () => {
  const response = await axiosInstance.delete("users/me/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });
  Cookies.remove("access");
  Cookies.remove("refresh");
  return response.status;
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
  if (response.status === 200) {
    const { access, refresh } = response.data;
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
  }
  return response.status;
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

export const apiGithubLogin = async (code: string) => {
  const response = await axiosInstance.post(
    "users/github-login/",
    {
      code,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  if (response.status === 200) {
    const { access, refresh } = response.data;
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
  }
  return response.status;
};

export const apiKakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(
    "users/kakao-login/",
    {
      code,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  if (response.status === 200) {
    const { access, refresh } = response.data;
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
  }
  return response.status;
};

export const apiGoogleLogin = async (access_token: string) => {
  const response = await axiosInstance.post(
    "users/google-login/",
    {
      access_token,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  if (response.status === 200) {
    const { access, refresh } = response.data;
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
  }
  return response.status;
};
