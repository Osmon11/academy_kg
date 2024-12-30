import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

import { IErrorResponseData } from "../types";

const cookies = new Cookies();
const unknownError =
  "Похоже возникла неизвестная ошибка";

const axiosInstance = axios.create({
  baseURL: "http://80.64.24.132",
  withCredentials: true,
  timeout: 5000, // 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
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
    error: AxiosError<
      IErrorResponseData | string | undefined
    >,
  ): Promise<IErrorResponseData> => {
    if (error.response) {
      const resData = error.response?.data;
      if (error.response.status === 401) {
        cookies.remove(
          "access_token_ilimnuru_kg",
        );
      }
      if (
        typeof resData === "object" &&
        typeof window !== "undefined"
      ) {
        toast.error(
          typeof resData.message === "string"
            ? resData.message
            : unknownError,
        );
      }
      if (
        typeof resData === "string" &&
        resData.length < 101
      ) {
        toast.error(resData);
        return Promise.reject({
          message: resData,
        });
      }
    }
    if (error.code === "ETIMEDOUT") {
      console.error("Request timed out");
      return Promise.reject(
        new Error("Request timed out"),
      );
    }
    return Promise.reject({
      message: unknownError,
    });
  },
);

export default axiosInstance;
