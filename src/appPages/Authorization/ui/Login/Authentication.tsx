"use client";

import {
  signIn,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import {
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

  useEffect(() => {
    if (
      via === "google" &&
      status === "authenticated" &&
      session?.accessToken &&
      session?.user
    ) {
      axiosInstance
        .post("/auth/google_sign_in/", {
          token: session.accessToken,
          email: session.user.email,
          name: session.user.name,
        })
        .then((res) => {
          if (res?.data?.token) {
            setCookie(
              process.env
                .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
              res?.data.access,
              {
                path: "/",
                expires: sessionExpiration(),
              },
            );
            router.replace(routePath("accaunt"));
          }
        });
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
      >
        Войти с Google
      </Button>
      <Link
        href={routePath("signIn", {
          queryParams: {
            ...searchParamsObject,
            via: "email",
          },
        })}
        style={{ width: "100%" }}
      >
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
        >
          Войти с эл. почтой
        </Button>
      </Link>
      <div className={styles.divider}>
        <span className={styles.line} />
        <Typography
          variant="h6"
          color="textThirtiary"
        >
          или
        </Typography>
        <span className={styles.line} />
      </div>
      <Link
        href={routePath("signUp")}
        style={{ width: "100%" }}
      >
        <Button
          color="primary"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </Link>
    </PaperContainer>
  );
}
