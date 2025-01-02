import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

import { defaultConfig } from "./axios";

export const createAxiosInstanceForSSR =
  async (): Promise<AxiosInstance> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(
      process.env
        .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    )?.value;

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
