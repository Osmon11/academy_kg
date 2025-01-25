import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { Timer } from "@/entities/Timer";

import { ControllerTextField } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { routePath } from "@/shared/functions";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

interface IFormValues {
  password: string;
  code: string;
}

export default function RecoverPassword() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      password: "",
      code: "",
    },
  });
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [
    isNewCodeAvailable,
    setIsNewCodeAvailable,
  ] = useState(false);

  function sendCodeAgain() {
    setIsNewCodeAvailable(false);
    axiosInstance
      .post("/auth/send_code_email/", { email })
      .then((res) => {
        if (res?.data.message) {
          toast.success(res?.data.message);
        }
      });
  }

  const [loading, setLoading] = useState(false);

  function onSubmit(data: IFormValues) {
    setLoading(true);
    axiosInstance
      .post("/auth/recovery_password/", {
        email,
        ...data,
      })
      .then((res) => {
        if (res?.data.message) {
          toast.success(res?.data.message);
          router.push(
            routePath("signIn", {
              queryParams: { via: "email" },
            }),
          );
        }
      })
      .finally(() => setLoading(false));
  }
  return (
    <PaperContainer
      title="Введите новый пароль"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControllerTextField<IFormValues>
        name="password"
        control={control}
        rules={{
          required:
            "Необходимо ввести новый пароль",
        }}
        textField={{
          placeholder: "Пароль",
          type: "password",
          autoComplete: "off",
        }}
      />
      <ControllerTextField<IFormValues>
        name="code"
        control={control}
        rules={{
          required:
            "Необходимо ввести код из почты",
        }}
        textField={{
          placeholder: "Код",
          type: "number",
          autoComplete: "off",
        }}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={Boolean(
          errors.password ||
            errors.code ||
            loading,
        )}
        fullWidth
        sx={{ maxWidth: "400px" }}
      >
        {loading
          ? "Ожидание..."
          : "Восстановить пароль"}
      </Button>
      <Typography
        variant="h6"
        color="textTertiary"
        textAlign="center"
      >
        Не пришел код?
      </Typography>
      {isNewCodeAvailable ? (
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary"
          textAlign="center"
          onClick={sendCodeAgain}
          className={styles.link_text}
        >
          Отправить повторно
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            color="textTertiary"
          >
            Новый код доступен через
          </Typography>
          <Timer
            minutes={2}
            onEnd={() =>
              setIsNewCodeAvailable(true)
            }
          />
        </Box>
      )}
    </PaperContainer>
  );
}
