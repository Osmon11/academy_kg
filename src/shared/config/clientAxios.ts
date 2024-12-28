import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

import { IErrorResponseData } from "../types";

const cookies = new Cookies();

const clientAxios = axios.create({
  baseURL: "http://80.64.24.132",
  withCredentials: true,
});

clientAxios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token: string = cookies.get(
      "access_token_ilimnuru_kg",
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async function (error) {
    return await Promise.reject(error);
  },
);

clientAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (
      response.status === 200 ||
      response.status === 201
    ) {
      return response;
    }

    if (response.data?.status === "failed") {
      console.error(
        response.config.url,
        response.data,
      );
      return await Promise.reject(
        new Error(response.data.errors),
      );
    }

    console.error(
      "Unknown server response:",
      response.data,
    );
    return await Promise.reject(
      new Error("An error occurred."),
    );
  },
  async (
    error: AxiosError<IErrorResponseData>,
  ): Promise<IErrorResponseData> => {
    if (error.response) {
      if (error.response.data) {
        toast.error(
          typeof error.response.data?.message ===
            "string"
            ? error.response.data.message
            : "Похоже возникла неизвестная ошибка",
        );
      }
    }
    if (error.response?.status === 401) {
      cookies.remove("access_token_ilimnuru_kg");
    }

    return Promise.reject(error.response?.data);
  },
);

export default clientAxios;
