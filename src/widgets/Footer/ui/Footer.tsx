"use client";

import Image from "next/image";
import Link from "next/link";

import {
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import instagramIcon from "@/icons/instagram.svg";
import telegramIcon from "@/icons/telegram.svg";
import youtubeIcon from "@/icons/youtube.svg";

import styles from "./Footer.module.scss";

export function Footer() {
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
          Академия
        </Typography>
      )}
      <span>
        <div className={styles.links_wrapper}>
          <Link href="">
            <Typography variant="body2">
              Политика конфиденциальности
            </Typography>
          </Link>
          <Typography>|</Typography>
          <Link href="">
            <Typography variant="body2">
              Библиотека
            </Typography>
          </Link>
          <Typography>|</Typography>
          <Link href="">
            <Typography variant="body2">
              Мир Знаний
            </Typography>
          </Link>
        </div>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            marginTop: { xs: "20px", md: "10px" },
          }}
        >
          © 2015 - 2024 Академия
        </Typography>
      </span>
      {upMd && (
        <div className={styles.social_links}>
          <IconButton
            className={styles.icon_button}
            href="null"
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
            href="https://www.youtube.com/@varlamov"
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
            href="null"
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
        </div>
      )}
    </footer>
  );
}
