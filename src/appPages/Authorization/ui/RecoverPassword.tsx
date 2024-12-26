import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import arrowLeftBlackIcon from "@/icons/arrow-left-black.svg";
import logoPrimaryIcon from "@/icons/logo-primary.svg";

import styles from "./styles.module.scss";

interface IFormValues {
  code: string;
  password: string;
}

export default function RecoverPassword() {
  const router = useRouter();
  function handleGoBack() {
    router.back();
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      code: "",
      password: "",
    },
  });
  function onSubmit(data: IFormValues) {}
  return (
    <Paper
      className={styles.paper}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        Введите E-mail, с которым вы
        регистрировались в Академии
      </Typography>
      <Button
        color="primary"
        variant="contained"
        sx={{ width: "100%" }}
        disabled
      >
        Восстановить пароль
      </Button>
      <Typography
        variant="h6"
        color="textThirtiary"
        textAlign="center"
      >
        Еще не зарегистрировались?
      </Typography>
      <Link
        href="/authorization/login?via=recover_password"
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
          Создать аккаунт
        </Typography>
      </Link>
    </Paper>
  );
}
