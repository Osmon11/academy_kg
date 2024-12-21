import Image from "next/image";
import Link from "next/link";

import {
  Button,
  Paper,
  Typography,
} from "@mui/material";

import styles from "./styles.module.scss";

export function LoginPage() {
  return (
    <div className={styles.page}>
      <Paper
        className={styles.card}
        elevation={0}
      >
        <div className={styles.logo_wrapper}>
          <Image
            src="/icons/logo-primary.webp"
            alt="islamic online-academy green icon"
            width={100}
            height={100}
          />
        </div>
        <Typography
          variant="h5"
          textAlign="center"
          className={styles.title}
        >
          Войти или зарегистрироваться
        </Typography>
        <Button className={styles.white_button}>
          <Image
            src="/icons/Google.webp"
            alt="google logo"
            width={24}
            height={24}
          />{" "}
          Войти с Google
        </Button>
        <Button
          className={styles.white_button}
          sx={{ marginTop: "30px" }}
        >
          <Image
            src="/icons/sms.webp"
            alt="sms grey icon"
            width={24}
            height={24}
          />{" "}
          Войти с эл. почтой
        </Button>
        <div className={styles.divider}>
          <span className={styles.line} />
          или
          <span className={styles.line} />
        </div>
        <Link href="/authorization/registration">
          <Button
            className={styles.submit_button}
            color="primary"
            variant="contained"
          >
            Зарегистрироваться
          </Button>
        </Link>
      </Paper>
    </div>
  );
}
