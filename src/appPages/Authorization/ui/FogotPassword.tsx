import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { ControllerTextField } from "@/shared/UI";
import clientAxios from "@/shared/config/clientAxios";

import PaperContainer from "./PaperContainer";
import styles from "./styles.module.scss";

interface IFormValues {
  email: string;
}

export default function FogotPassword() {
  const router = useRouter();
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
    clientAxios
      .post("/auth/send_code_email/", data)
      .then((res) => {
        if (res?.data.message) {
          toast.success(res?.data.message);
          const queryParams =
            new URLSearchParams();
          queryParams.set("email", data.email);
          router.push(
            `/authorization/login?via=recover_password&${queryParams}`,
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <PaperContainer
      title="Введите E-mail, с которым вы регистрировались в Академии"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControllerTextField<IFormValues>
        name="email"
        control={control}
        rules={{
          required: "Необходимо ввести e-mail",
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
        {loading ? "Ожидание..." : "Получить код"}
      </Button>
      <Typography
        variant="h6"
        color="textThirtiary"
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
        <Link href="/authorization/registration">
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: 700,
              textAlign: "center",
            }}
            className={styles.link_text}
          >
            Создать аккаунт
          </Typography>
        </Link>
      </Box>
    </PaperContainer>
  );
}
