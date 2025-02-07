"use client";

import {
  SessionProvider,
  useSession,
} from "next-auth/react";
import { AppProgressBar } from "next-nprogress-bar";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "@mui/material";

import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  AppStore,
  makeStore,
  useAppDispatch,
} from "@/shared/config/store";
import {
  clearUserProfile,
  setProfileLoading,
  setUserProfile,
} from "@/shared/model/user";

function GlobalProfileFetcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
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
  }, [dispatch, status]);

  return children;
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
      <SessionProvider>
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
      </SessionProvider>
    </Provider>
  );
}
