import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

import { defaultConfig } from "./axios";

export const createAxiosInstanceForSSR =
  async (): Promise<AxiosInstance> => {
    const token = getCookie(
      process.env
        .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
      { cookies },
    );
    const axiosInstance = axios.create(
      defaultConfig,
    );

    if (token) {
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    return axiosInstance;
  };
