"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar } from "next-nprogress-bar";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "@mui/material";

import {
  clearUserProfile,
  setProfileLoading,
  setUserProfile,
} from "../model/user";
import axiosInstance from "./axiosClientInstance";
import {
  AppStore,
  makeStore,
  useAppDispatch,
} from "./store";

function GlobalProfileFetcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [
    {
      [process.env
        .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string]:
        token,
    },
  ] = useCookies([
    process.env
      .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
  ]);

  useEffect(() => {
    if (token) {
      // Fetch profile data if token exists
      dispatch(setProfileLoading(true));
      axiosInstance
        .get("/auth/profile")
        .then((response) => {
          dispatch(setUserProfile(response.data));
        })
        .catch(() => {
          dispatch(clearUserProfile());
        })
        .finally(() => {
          dispatch(setProfileLoading(false));
        });
    } else {
      // Clear profile data if token is missing
      dispatch(clearUserProfile());
    }
  }, [dispatch, token]);

  return <>{children}</>;
}

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  const [queryClient] = useState(
    () => new QueryClient(),
  );
  return (
    <Provider store={storeRef.current}>
      <CookiesProvider
        defaultSetOptions={{ path: "/" }}
      >
        <SessionProvider>
          <GlobalProfileFetcher>
            <QueryClientProvider
              client={queryClient}
            >
              {children}
            </QueryClientProvider>
          </GlobalProfileFetcher>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            theme="colored"
            pauseOnHover
            closeOnClick
          />
          <AppProgressBar
            height="4px"
            color={theme.palette.secondary.main}
            options={{ showSpinner: false }}
          />
        </SessionProvider>
      </CookiesProvider>
    </Provider>
  );
}
