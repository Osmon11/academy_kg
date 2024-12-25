import Image from "next/image";
import Link from "next/link";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import googleColorfulIcon from "@/icons/google-colorful.svg";
import logoPrimaryIcon from "@/icons/logo-primary.svg";
import smsCoalGrayIcon from "@/icons/sms-coal-gray.svg";

import styles from "./Authentication.module.scss";

export function Authentication() {
  return (
    <Paper
      className={styles.authentication_wrapper}
      elevation={0}
    >
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
        Войти или зарегистрироваться
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Link
          href="/authorization/login?via=google"
          style={{ width: "100%" }}
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
          >
            Войти с Google
          </Button>
        </Link>
        <Link
          href="/authorization/login?via=email"
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
            sx={{ marginTop: "30px" }}
          >
            Войти с эл. почтой
          </Button>
        </Link>
      </Box>
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
        href="/authorization/registration"
        style={{ width: "100%" }}
      >
        <Button
          color="primary"
          variant="contained"
          sx={{ width: "100%" }}
        >
          Зарегистрироваться
        </Button>
      </Link>
    </Paper>
  );
}
