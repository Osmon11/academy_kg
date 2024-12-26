import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

const cookies = new Cookies();

const appAxios = axios.create({
  baseURL: "http://80.64.24.132",
  withCredentials: true,
});

appAxios.interceptors.request.use(
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

appAxios.interceptors.response.use(
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
        response.data.data,
      );
      return await Promise.reject(
        new Error(response.data.errors),
      );
    }

    console.error(
      "Unknown server response:",
      response.data.data,
    );
    return await Promise.reject(
      new Error("An error occurred."),
    );
  },
  async (error: AxiosError<string>) => {
    if (error.response) {
      if (error.response.data) {
        toast.error(error.response.data);
        return;
      }
      if (error.response.statusText) {
        toast.error(error.response.statusText);
      }
    }
    if (error.response?.status === 401) {
      cookies.remove("access_token_ilimnuru_kg");
    }

    return await Promise.reject(error.response);
  },
);

export default appAxios;
