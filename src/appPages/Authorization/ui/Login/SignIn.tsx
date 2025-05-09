"use client";

import { setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { ControllerTextField } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { sessionExpiration } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { IErrorResponseData } from "@/shared/types";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

interface IFormValues {
  email: string;
  password: string;
}
export default function SignIn() {
  const t = useTranslations("SignIn");
  const router = useAppRouter();
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
  const [loading, setLoading] = useState(false);

  function onSubmit(data: IFormValues) {
    setLoading(true);
    axiosInstance
      .post("/auth/login/", data)
      .then((res) => {
        if (res?.data?.access) {
          setCookie(
            process.env
              .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
            res.data.access,
            {
              path: "/",
              expires: sessionExpiration(),
            },
          );
          router.replace(
            // @ts-expect-error Argument of type 'string' is not assignable to parameter of type
            returnPathname ?? "accaunt",
          );
          setLoading(false);
        }
      })
      .catch((error: IErrorResponseData) => {
        if (
          error.message ===
          t("polzovatel-ne-podtverzhden")
        ) {
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
      });
  }
  return (
    <PaperContainer
      title={t("vkhod-s-parolem")}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControllerTextField
        name="email"
        control={control}
        rules={{
          required: t(
            "neobkhodimo-vvesti-e-mail",
          ),
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
            required: t(
              "neobkhodimo-vvesti-parol",
            ),
          }}
          textField={{
            type: "password",
            placeholder: t("parol"),
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
              router.push("signIn", {
                queryParams: {
                  via: "fogot_password",
                },
              })
            }
          >
            {t("zabyli-parol")}
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
        {loading ? t("ozhidanie") : t("voiti")}
      </Button>
      <Typography
        variant="h6"
        color="textTertiary"
        textAlign="center"
      >
        {t("eshe-ne-zaregistrirovalis")}
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
          onClick={() => router.push("signUp")}
        >
          {t("sozdat-akkaunt")}
        </Typography>
      </Box>
    </PaperContainer>
  );
}
