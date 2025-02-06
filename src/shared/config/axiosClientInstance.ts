import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  deleteCookie,
  getCookie,
  hasCookie,
} from "cookies-next/client";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

import { IErrorResponseData } from "../types";
import { defaultConfig } from "./axios";

const tokenKey = process.env
  .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string;
const unknownError =
  "Похоже возникла неизвестная ошибка";
const axiosInstance = axios.create(defaultConfig);

axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    if (typeof window !== "undefined") {
      const token = getCookie(tokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (config.headers.Authorization) {
        delete config.headers.Authorization;
      }
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
        if (hasCookie(tokenKey)) {
          signOut();
          deleteCookie(tokenKey, {
            path: "/",
          });
        }
      }
      if (typeof window !== "undefined") {
        if (
          typeof resData === "object" &&
          typeof resData.message === "string"
        ) {
          toast.error(resData.message);
          return Promise.reject({
            message: resData.message,
          });
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
        toast.error(unknownError);
      }
    }
    if (error.code === "ETIMEDOUT") {
      console.error("Request timed out");
      return Promise.reject(
        new Error("Request timed out"),
      );
    }
    if (error.message) {
      return Promise.reject({
        mesaage: error.message,
      });
    }
    return Promise.reject({
      message: unknownError,
    });
  },
);

export default axiosInstance;
