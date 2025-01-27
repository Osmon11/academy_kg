"use client";

import {
  signIn,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  routePath,
  sessionExpiration,
} from "@/shared/functions";

import googleColorfulIcon from "@/icons/google-colorful.svg";
import smsCoalGrayIcon from "@/icons/sms-coal-gray.svg";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

export function Authentication() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const via = searchParams.get("via");
  const searchParamsObject = Object.fromEntries(
    searchParams.entries(),
  );
  const setCookie = useCookies([
    process.env
      .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
  ])[1];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      via === "google" &&
      status === "authenticated" &&
      session &&
      session.accessToken &&
      session.user
    ) {
      setLoading(true);
      axiosInstance
        .post("/auth/google_sign_in/", {
          token: session.accessToken,
          email: session.user.email,
          name: session.user.name,
        })
        .then((res) => {
          if (res?.data?.access) {
            setCookie(
              process.env
                .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
              res.data.access,
              {
                path: "/",
                expires: sessionExpiration(),
              },
            );
            router.replace(routePath("accaunt"));
          }
        })
        .catch(() =>
          router.replace(routePath("signIn")),
        )
        .finally(() => setLoading(false));
    }
  }, [session, status, via, setCookie, router]);

  function handleGoogleSignIn() {
    signIn("google", {
      callbackUrl: routePath("signIn", {
        queryParams: { via: "google" },
      }),
    });
  }
  return (
    <PaperContainer title="Войти или зарегистрироваться">
      <Button
        className={styles.white_button}
        variant="shadow"
        color="white"
        startIcon={
          <Image
            src={googleColorfulIcon}
            alt="google colorful logo"
            width={24}
            height={24}
          />
        }
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        {loading
          ? "Загрузка..."
          : "Войти с Google"}
      </Button>
      <Button
        className={styles.white_button}
        variant="shadow"
        color="white"
        startIcon={
          <Image
            src={smsCoalGrayIcon}
            alt="sms coal gray icon"
            width={24}
            height={24}
          />
        }
        onClick={() =>
          router.push(
            routePath("signIn", {
              queryParams: {
                ...searchParamsObject,
                via: "email",
              },
            }),
          )
        }
        disabled={loading}
        fullWidth
      >
        Войти с эл. почтой
      </Button>
      <Box className={styles.divider}>
        <span className={styles.line} />
        <Typography
          variant="h6"
          color="textTertiary"
        >
          или
        </Typography>
        <span className={styles.line} />
      </Box>
      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          router.push(routePath("signUp"))
        }
        disabled={loading}
        fullWidth
      >
        Зарегистрироваться
      </Button>
    </PaperContainer>
  );
}
