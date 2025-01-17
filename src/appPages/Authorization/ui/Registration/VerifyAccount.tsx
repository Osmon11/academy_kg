"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@mui/material";

import { ControllerTextField } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  routePath,
  sessionExpiration,
} from "@/shared/functions";

import PaperContainer from "../PaperContainer";

interface IFormValues {
  code: string;
}

export default function VerifyAccount() {
  const router = useRouter();
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
  const setCookie = useCookies([
    process.env
      .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
  ])[1];

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
            res?.data.access,
            {
              path: "/",
              expires: sessionExpiration(),
            },
          );
          router.replace(routePath("accaunt"));
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
