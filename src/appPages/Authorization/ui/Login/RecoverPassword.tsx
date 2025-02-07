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

import { Timer } from "@/entities/Timer";

import { ControllerTextField } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppRouter } from "@/shared/hooks/useAppRouter";

import PaperContainer from "../PaperContainer";
import styles from "../styles.module.scss";

interface IFormValues {
  code: string;
  password: string;
  repeatPassword: string;
}

export default function RecoverPassword() {
  const t = useTranslations("RecoverPassword");
  const router = useAppRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      code: "",
      password: "",
      repeatPassword: "",
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
          router.push("signIn", {
            queryParams: { via: "email" },
          });
        }
      })
      .finally(() => setLoading(false));
  }

  const password = watch("password", "");
  return (
    <PaperContainer
      title={t("pridumaite-novyi-parol")}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControllerTextField<IFormValues>
        name="code"
        control={control}
        rules={{
          required: t(
            "neobkhodimo-vvesti-kod-iz-pochty",
          ),
        }}
        textField={{
          placeholder: t("kod"),
          type: "number",
          autoComplete: "off",
        }}
      />
      <ControllerTextField<IFormValues>
        name="password"
        control={control}
        rules={{
          required: t(
            "neobkhodimo-vvesti-novyi-parol",
          ),
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
          placeholder: t("parol"),
          type: "password",
          autoComplete: "off",
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
          ? t("ozhidanie")
          : t("vosstanovit-parol")}
      </Button>
      <Typography
        variant="h6"
        color="textTertiary"
        textAlign="center"
      >
        {t("ne-prishel-kod")}
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
          {t("otpravit-povtorno")}
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
            {t("otpravit-povtorno-cherez")}
          </Typography>
          <Timer
            seconds={120}
            onEnd={() =>
              setIsNewCodeAvailable(true)
            }
          />
        </Box>
      )}
    </PaperContainer>
  );
}
