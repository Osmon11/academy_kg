"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useAppRouter } from "@/shared/hooks/useAppRouter";

import googleColorfulIcon from "@/icons/google-colorful.svg";
import smsCoalGrayIcon from "@/icons/sms-coal-gray.svg";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

export function Authentication() {
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(
    searchParams.entries(),
  );
  const [loading] = useState(false);

  function handleGoogleSignIn() {
    signIn("google");
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
          router.push("signIn", {
            queryParams: {
              ...searchParamsObject,
              via: "email",
            },
          })
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
        onClick={() => router.push("signUp")}
        disabled={loading}
        fullWidth
      >
        Зарегистрироваться
      </Button>
    </PaperContainer>
  );
}
