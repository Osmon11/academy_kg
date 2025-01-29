"use client";

import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { ControllerTextField } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  routePath,
  sessionExpiration,
} from "@/shared/functions";
import { IErrorResponseData } from "@/shared/types";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

interface IFormValues {
  email: string;
  password: string;
}
export default function SignIn() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const returnPathname = searchParams.get(
    "return_pathname",
  );

  const [
    { access_token_ilimnuru_kg },
    setCookie,
  ] = useCookies([
    process.env
      .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
  ]);
  const [loading, setLoading] = useState(false);

  function onSubmit(data: IFormValues) {
    setLoading(true);
    axiosInstance
      .post("/auth/login/", data)
      .then((res) => {
        if (
          res?.data.access &&
          access_token_ilimnuru_kg === undefined
        ) {
          setCookie(
            process.env
              .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
            res?.data.access,
            {
              path: "/",
              expires: sessionExpiration(),
            },
          );
          router.replace(
            returnPathname ??
              routePath("accaunt"),
          );
          setLoading(false);
        }
      })
      .catch((error: IErrorResponseData) => {
        if (
          error.message ===
          "Пользователь не подтвержден"
        ) {
          axiosInstance
            .post("/auth/send_code_email/", {
              email: data.email,
            })
            .then((res) => {
              if (res?.data.message) {
                toast.success(res?.data.message);
                router.push(
                  routePath("signUp", {
                    queryParams: {
                      verify: "true",
                      email: data.email,
                    },
                  }),
                );
              }
            })
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      });
  }
  return (
    <PaperContainer
      title="Вход с паролем"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControllerTextField
        name="email"
        control={control}
        rules={{
          required: "Необходимо ввести e-mail",
        }}
        textField={{
          type: "email",
          placeholder: "E-mail",
        }}
      />
      <Box sx={{ width: "100%" }}>
        <ControllerTextField
          name="password"
          control={control}
          rules={{
            required: "Необходимо ввести пароль",
          }}
          textField={{
            type: "password",
            placeholder: "Пароль",
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "20px",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            className={styles.link_text}
            sx={{ width: "fit-content" }}
            onClick={() =>
              router.push(
                routePath("signIn", {
                  queryParams: {
                    via: "fogot_password",
                  },
                }),
              )
            }
          >
            Забыли пароль?
          </Typography>
        </Box>
      </Box>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={Boolean(
          errors.email ||
            errors.password ||
            loading,
        )}
        fullWidth
      >
        {loading ? "Ожидание..." : "Войти"}
      </Button>
      <Typography
        variant="h6"
        color="textTertiary"
        textAlign="center"
      >
        Еще не зарегистрировались?
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 700,
            textAlign: "center",
          }}
          className={styles.link_text}
          onClick={() =>
            router.push(routePath("signUp"))
          }
        >
          Создать аккаунт
        </Typography>
      </Box>
    </PaperContainer>
  );
}
