"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import instagramIcon from "@/icons/instagram.svg";
import telegramIcon from "@/icons/telegram.svg";
import youtubeIcon from "@/icons/youtube.svg";

import styles from "./Footer.module.scss";

export function Footer() {
  const t = useTranslations("Footer");
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  return (
    <footer className={styles.footer}>
      {upMd && (
        <Typography
          variant="h5"
          fontWeight={700}
        >
          {t("akademiya")}
        </Typography>
      )}
      <span>
        <Box className={styles.links_wrapper}>
          <a
            href="https://odigital.app"
            target="_blank"
            rel="noopener"
          >
            <Typography variant="body2">
              {t("politika-konfidencialnosti")}
            </Typography>
          </a>
          <Typography>|</Typography>
          <a
            href=""
            target="_blank"
            rel="noopener"
          >
            <Typography variant="body2">
              {t("biblioteka")}
            </Typography>
          </a>
          <Typography>|</Typography>
          <a
            href=""
            target="_blank"
            rel="noopener"
          >
            <Typography variant="body2">
              {t("mir-znanii")}
            </Typography>
          </a>
        </Box>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            marginTop: { xs: "20px", md: "10px" },
          }}
        >
          {t("c-2015-akademiya", {
            year: new Date().getFullYear(),
          })}
        </Typography>
      </span>
      {upMd && (
        <Box className={styles.social_links}>
          <IconButton
            className={styles.icon_button}
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={instagramIcon}
              alt=""
              width={20}
              height={20}
            />
          </IconButton>
          <IconButton
            className={styles.icon_button}
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={youtubeIcon}
              alt=""
              width={20}
              height={20}
            />
          </IconButton>
          <IconButton
            className={styles.icon_button}
            href="https://telegram.org/"
            target="_blank"
            rel="noopener"
          >
            <Image
              src={telegramIcon}
              alt=""
              width={20}
              height={20}
            />
          </IconButton>
        </Box>
      )}
    </footer>
  );
}
