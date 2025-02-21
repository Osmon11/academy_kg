"use client";

import { useSession } from "next-auth/react";
import {
  useLocale,
  useTranslations,
} from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { popupCenter } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { getPathname } from "@/shared/i18n/routing";

import googleColorfulIcon from "@/icons/google-colorful.svg";
import smsCoalGrayIcon from "@/icons/sms-coal-gray.svg";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

export function Authentication() {
  const t = useTranslations("Authentication");
  const locale = useLocale();
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(
    searchParams.entries(),
  );
  const { data } = useSession();
  const [loading] = useState(false);

  useEffect(() => {
    if (data && data.user.isAuthorized) {
      console.log(data.user.isAuthorized);
      router.replace("accaunt");
    }
  }, [data, router]);

  function handleGoogleSignIn() {
    popupCenter(
      getPathname({
        locale,
        href: "/google-signin",
      }),
      t("voiti-s-google"),
    );
  }
  return (
    <PaperContainer
      title={t("voiti-ili-zaregistrirovatsya")}
    >
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
          ? t("ozhidanie")
          : t("voiti-s-google")}
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
        {t("voiti-s-el-pochtoi")}
      </Button>
      <Box className={styles.divider}>
        <span className={styles.line} />
        <Typography
          variant="h6"
          color="textTertiary"
        >
          {t("ili")}
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
        {t("zaregistrirovatsya")}
      </Button>
    </PaperContainer>
  );
}
