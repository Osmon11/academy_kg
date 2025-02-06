"use client";

import { setCookie } from "cookies-next/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@mui/material";

import { ControllerTextField } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { sessionExpiration } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";

import PaperContainer from "../PaperContainer";

interface IFormValues {
  code: string;
}

export default function VerifyAccount() {
  const router = useAppRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      code: "",
    },
  });
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  function onSubmit(data: IFormValues) {
    setLoading(true);
    axiosInstance
      .post("/auth/code_verify/", {
        email,
        ...data,
      })
      .then((res) => {
        if (res?.data?.access) {
          toast.success("Аккаунт подтвержден");
          setCookie(
            process.env
              .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
            res.data.access,
            {
              path: "/",
              expires: sessionExpiration(),
            },
          );
          router.replace("accaunt");
        }
      })
      .finally(() => setLoading(false));
  }
  return (
    <PaperContainer
      title={`Введите код из вашей почты ${email}`}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        disabled={Boolean(errors.code || loading)}
        fullWidth
      >
        {loading
          ? "Ожидание..."
          : "Подтвердить e-mail"}
      </Button>
    </PaperContainer>
  );
}
