"use client";

import { AppProgressBar } from "next-nprogress-bar";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "@mui/material";

import {
  clearUserProfile,
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
        .NEXT_ACCESS_TOKEN_KEY as string]: token,
    },
  ] = useCookies([
    process.env.NEXT_ACCESS_TOKEN_KEY as string,
  ]);

  useEffect(() => {
    if (token) {
      // Fetch profile data if token exists
      axiosInstance
        .get("/auth/profile")
        .then((response) => {
          dispatch(setUserProfile(response.data));
        })
        .catch(() => {
          dispatch(clearUserProfile());
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
  return (
    <Provider store={storeRef.current}>
      <CookiesProvider
        defaultSetOptions={{ path: "/" }}
      >
        <GlobalProfileFetcher>
          {children}
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
      </CookiesProvider>
    </Provider>
  );
}
