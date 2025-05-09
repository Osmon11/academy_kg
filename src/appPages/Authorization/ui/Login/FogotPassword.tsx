import { useTranslations } from "next-intl";
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
import { useAppRouter } from "@/shared/hooks/useAppRouter";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

interface IFormValues {
  email: string;
}

export default function FogotPassword() {
  const t = useTranslations("FogotPassword");
  const router = useAppRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);

  function onSubmit(data: IFormValues) {
    setLoading(true);
    axiosInstance
      .post("/auth/send_code_email/", data)
      .then((res) => {
        if (res?.data.message) {
          toast.success(res?.data.message);
          router.push("signIn", {
            queryParams: {
              via: "recover_password",
              email: data.email,
            },
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <PaperContainer
      title={t("vvedite-e-mail-s-kotorym")}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        }}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={Boolean(
          errors.email || loading,
        )}
        fullWidth
      >
        {loading
          ? t("ozhidanie")
          : t("poluchit-kod")}
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
