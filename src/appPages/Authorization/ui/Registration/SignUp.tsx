"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("SignUp");
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
      title={t("registraciya")}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControllerTextField<IFormValues>
        name="name"
        control={control}
        rules={{
          required: t("neobkhodimo-vvesti-imya"),
        }}
        textField={{
          placeholder: t("imya"),
          type: "text",
          autoComplete: "off",
        }}
      />
      <ControllerTextField<IFormValues>
        name="surname"
        control={control}
        rules={{
          required: t(
            "neobkhodimo-vvesti-familiyu",
          ),
        }}
        textField={{
          placeholder: t("familiya"),
          type: "text",
          autoComplete: "off",
        }}
      />
      <ControllerTextField<IFormValues>
        name="email"
        control={control}
        rules={{
          required: t(
            "neobkhodimo-vvesti-e-mail",
          ),
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
          required: t("neobkhodimo-vvesti-parol"),
          minLength: {
            value: 5,
            message: t(
              "parol-dolzhen-byt-dlinnee",
            ),
          },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d).{5,}$/,
            message: t(
              "parol-dolzhen-soderzhat-bukvy",
            ),
          },
        }}
        textField={{
          placeholder: t("pridumaite-parol"),
          type: "password",
          autoComplete: "new-password",
        }}
      />
      <ControllerTextField<IFormValues>
        name="repeatPassword"
        control={control}
        rules={{
          required: t(
            "pozhaluista-podtverdite-parol",
          ),
          validate: (value) =>
            value === password ||
            t("paroli-ne-sovpadayut"),
        }}
        textField={{
          placeholder: t("povtorite-parol"),
          type: "password",
          autoComplete: "new-password",
        }}
      />
      <ControllerRadioGroup<IFormValues>
        name="gender"
        control={control}
        rules={{
          required: t(
            "pozhaluista-vyberite-svoi-pol",
          ),
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
          {
            value: "male",
            label: t("ya-muzhchina"),
          },
          {
            value: "female",
            label: t("ya-zhenshina"),
          },
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
          ? t("ozhidanie")
          : t("zaregistrirovatsya")}
      </Button>
      <Typography
        variant="h6"
        color="textTertiary"
        textAlign="center"
      >
        {t("uzhe-zaregistrirovalis")}
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
        {t("voiti-v-akkaunt")}
      </Typography>
    </PaperContainer>
  );
}
