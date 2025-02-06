"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Button,
  Typography,
} from "@mui/material";

import {
  ControllerRadioGroup,
  ControllerTextField,
} from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppRouter } from "@/shared/hooks/useAppRouter";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

interface IFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
}
export default function SignUp() {
  const router = useAppRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      repeatPassword: "",
      gender: "",
    },
  });
  const [loading, setLoading] = useState(false);

  function onSubmit(data: IFormValues) {
    setLoading(true);
    axiosInstance
      .post("/auth/register/", data)
      .then((res) => {
        if (res?.data.message) {
          toast.success(res?.data.message);
          axiosInstance
            .post("/auth/send_code_email/", {
              email: data.email,
            })
            .then((res) => {
              if (res?.data.message) {
                toast.success(res?.data.message);
                router.push("signUp", {
                  queryParams: {
                    verify: "true",
                    email: data.email,
                  },
                });
              }
            })
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const password = watch("password", "");
  return (
    <PaperContainer
      title="Регистрация"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControllerTextField<IFormValues>
        name="name"
        control={control}
        rules={{
          required: "Необходимо ввести имя",
        }}
        textField={{
          placeholder: "Имя",
          type: "text",
          autoComplete: "off",
        }}
      />
      <ControllerTextField<IFormValues>
        name="surname"
        control={control}
        rules={{
          required: "Необходимо ввести фамилию",
        }}
        textField={{
          placeholder: "Фамилия",
          type: "text",
          autoComplete: "off",
        }}
      />
      <ControllerTextField<IFormValues>
        name="email"
        control={control}
        rules={{
          required: "Необходимо ввести e-mail",
        }}
        textField={{
          placeholder: "E-mail",
          type: "email",
          autoComplete: "off",
        }}
      />
      <ControllerTextField<IFormValues>
        name="password"
        control={control}
        rules={{
          required: "Необходимо ввести пароль",
          minLength: {
            value: 5,
            message:
              "Пароль должен быть длиннее 4 символов",
          },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d).{5,}$/,
            message:
              "Пароль должен содержать буквы и цифры",
          },
        }}
        textField={{
          placeholder: "Придумайте пароль",
          type: "password",
          autoComplete: "new-password",
        }}
      />
      <ControllerTextField<IFormValues>
        name="repeatPassword"
        control={control}
        rules={{
          required:
            "Пожалуйста подтвердите пароль",
          validate: (value) =>
            value === password ||
            "Пароли не совпадают",
        }}
        textField={{
          placeholder: "Повторите пароль",
          type: "password",
          autoComplete: "new-password",
        }}
      />
      <ControllerRadioGroup<IFormValues>
        name="gender"
        control={control}
        rules={{
          required:
            "Пожалуйста выберите свой пол",
        }}
        radioGroup={{
          sx: {
            width: "100%",
            justifyContent: "space-around",
          },
        }}
        errorText={{
          sx: { textAlign: "center" },
        }}
        options={[
          { value: "male", label: "Я мужчина" },
          { value: "female", label: "Я женщина" },
        ]}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
        disabled={Boolean(
          errors.name ||
            errors.surname ||
            errors.email ||
            errors.password ||
            errors.gender ||
            loading,
        )}
      >
        {loading
          ? "Ожидание..."
          : "Зарегистрироваться"}
      </Button>
      <Typography
        variant="h6"
        color="textTertiary"
        textAlign="center"
      >
        Уже зарегистрировались?
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        sx={{
          width: "100%",
          fontWeight: 700,
          textAlign: "center",
        }}
        className={styles.link_text}
        onClick={() => router.push("signUp")}
      >
        Войти в аккаунт
      </Typography>
    </PaperContainer>
  );
}
