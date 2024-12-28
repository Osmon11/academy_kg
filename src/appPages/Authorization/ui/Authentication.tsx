import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Button,
  Typography,
} from "@mui/material";

import googleColorfulIcon from "@/icons/google-colorful.svg";
import smsCoalGrayIcon from "@/icons/sms-coal-gray.svg";

import PaperContainer from "./PaperContainer";
import styles from "./styles.module.scss";

export function Authentication() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  return (
    <PaperContainer title="Войти или зарегистрироваться">
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
        href={`/authorization/login?via=email${queryParams ? `&${queryParams}` : ""}`}
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
        href="/authorization/registration"
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
