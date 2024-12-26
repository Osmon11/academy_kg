"use client";

import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import arrowLeftBlackIcon from "@/icons/arrow-left-black.svg";
import logoPrimaryIcon from "@/icons/logo-primary.svg";

import mainBg from "@/backgrounds/main-bg.png";

import styles from "./styles.module.scss";

export function RegistrationPage() {
  const router = useRouter();
  function handleGoBack() {
    router.back();
  }
  return (
    <div className={styles.page}>
      <Image
        src={mainBg}
        alt="mosque"
        placeholder="blur"
        quality={100}
        fill
        priority
        sizes="100vw"
      />
      <Box className={styles.content}>
        <Paper className={styles.paper}>
          <IconButton
            className={styles.go_back_button}
            onClick={handleGoBack}
          >
            <Image
              src={arrowLeftBlackIcon}
              alt="arrow left black icon"
              width={24}
              height={24}
            />
          </IconButton>
          <Image
            src={logoPrimaryIcon}
            alt="islamic online-academy green icon"
            width={100}
            height={100}
          />
          <Typography
            variant="h5"
            textAlign="center"
            color="textThirtiary"
            fontWeight={600}
          >
            Регистрация
          </Typography>
          <Button
            color="primary"
            variant="contained"
            sx={{ width: "100%" }}
            disabled
          >
            Зарегистрироваться
          </Button>
          <Typography
            variant="h6"
            color="textThirtiary"
            textAlign="center"
          >
            Уже зарегистрировались?
          </Typography>
          <Link
            href="/authorization/login?via=email"
            style={{ width: "100%" }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{
                width: "100%",
                fontWeight: 700,
                textAlign: "center",
              }}
              className={styles.link_text}
            >
              Войти в аккаунт
            </Typography>
          </Link>
        </Paper>
      </Box>
    </div>
  );
}
