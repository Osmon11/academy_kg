"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@mui/material";

import { ControllerTextField } from "@/shared/UI";
import clientAxios from "@/shared/config/clientAxios";

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

  function onSubmit(data: IFormValues) {
    setLoading(true);
    clientAxios
      .post("/auth/code_verify/", {
        email,
        ...data,
      })
      .then((res) => {
        if (res?.data.message) {
          toast.success(res?.data.message);
          router.push(
            "/authorization/login?via=email",
          );
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
        sx={{ maxWidth: "400px" }}
      >
        {loading
          ? "Ожидание..."
          : "Подтвердить e-mail"}
      </Button>
    </PaperContainer>
  );
}
