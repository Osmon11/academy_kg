import { CreateAxiosDefaults } from "axios";

export const defaultConfig: CreateAxiosDefaults =
  {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    timeout: 5000, // 5 seconds
    headers: {
      "Content-Type": "application/json",
    },
  };
