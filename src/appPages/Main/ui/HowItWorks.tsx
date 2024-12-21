"use client";

import Image from "next/image";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { IconBanner } from "@/entities/IconBanner";

import styles from "./styles.module.scss";

export default function HowItWorks() {
  const xs = useMediaQuery((theme) =>
    theme.breakpoints.only("xs"),
  );
  return (
    <Box
      sx={{
        marginTop: {
          xs: "25px",
          sm: "40px",
          md: "80px",
        },
      }}
    >
      {xs && (
        <div className={styles.laptop}>
          <div className={styles.screen}></div>
          <Image
            className={styles.base}
            src="/backgrounds/base.svg"
            alt="laptop base"
            width={10000}
            height={140}
          />
        </div>
      )}
      <Box
        className={styles.icon_banners_wrapper}
        sx={{
          marginTop: { xs: "25px", sm: "0px" },
        }}
      >
        <IconBanner
          color="primary"
          title="ЗАРЕГИСТРИРУЙТЕСЬ"
          description="С помощью аккаунтов в социальных сетях или через E-mail и пароль"
          icon="/icons/login-2.webp"
          icon_alt="login-2 icon"
        />
        <IconBanner
          color="secondary"
          title="СДАВАЙТЕ ЭКЗАМЕНЫ"
          description="закрепляйте полученные знания и открывайте доступ к новым уровням обучения"
          icon="/icons/note-2.webp"
          icon_alt="note-2 icon"
        />
      </Box>
      {!xs && (
        <div className={styles.laptop}>
          <div className={styles.screen}></div>
          <Image
            className={styles.base}
            src="/backgrounds/base.svg"
            alt="laptop base"
            width={1128}
            height={19}
          />
        </div>
      )}
      <Box
        className={styles.icon_banners_wrapper}
        sx={{
          marginTop: {
            xs: "20px",
            sm: "34px",
            md: "50px",
          },
        }}
      >
        <IconBanner
          color="primary"
          title="ОБУЧАЙТЕСЬ ОНЛАЙН"
          description="Смотрите видеоуроки, задавайте вопросы преподавателю и получайте обратную связь"
          icon="/icons/monitor-recorder.webp"
          icon_alt="monitor recorder icon"
        />
        <IconBanner
          color="secondary"
          title="ПРОВЕРЬТЕ СЕБЯ"
          description="Пройдите начальный тест, чтобы определить свой уровень знаний"
          icon="/icons/book.webp"
          icon_alt="book icon"
        />
      </Box>
    </Box>
  );
}
