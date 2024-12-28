import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import clientAxios from "@/shared/config/clientAxios";
import { IErrorResponseData } from "@/shared/types";

import eyeCoalGrayIcon from "@/icons/eye-coal-gray.svg";
import eyeSlashCoalGrayIcon from "@/icons/eye-slash-coal-gray.svg";

import PaperContainer from "./PaperContainer";
import styles from "./styles.module.scss";

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
  ] = useCookies(["access_token_ilimnuru_kg"]);
  const [loading, setLoading] = useState(false);

  function onSubmit(data: IFormValues) {
    setLoading(true);
    clientAxios
      .post("/auth/login/", data)
      .then((res) => {
        if (
          res?.data.access &&
          access_token_ilimnuru_kg === undefined
        ) {
          const d = new Date();
          d.setTime(
            d.getTime() +
              30 * 24 * 60 * 60 * 1000,
          );
          setCookie(
            "access_token_ilimnuru_kg",
            res?.data.access,
            {
              path: "/",
              expires: d,
            },
          );
          router.replace(
            returnPathname ??
              "/personal-accaunt/main",
          );
          setLoading(false);
        }
      })
      .catch((error: IErrorResponseData) => {
        if (
          error?.message ===
          "Пользователь не подтвержден"
        ) {
          clientAxios
            .post("/auth/send_code_email/", data)
            .then((res) => {
              if (res?.data.message) {
                toast.success(res?.data.message);
                const queryParams =
                  new URLSearchParams();
                queryParams.set(
                  "email",
                  data.email,
                );
                router.push(
                  `/authorization/registration?verify=true&${queryParams}`,
                );
              }
            })
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      });
  }
  const [visiblePassword, setPasswordVisibility] =
    useState(false);
  return (
    <PaperContainer
      title="Вход с паролем"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{ width: "100%", maxWidth: "400px" }}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Необходимо ввести e-mail",
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="email"
              placeholder="E-mail"
              variant="outlined"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message
              }
              fullWidth
            />
          )}
        />
      </Box>
      <Box
        sx={{ width: "100%", maxWidth: "400px" }}
      >
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Необходимо ввести пароль",
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type={
                visiblePassword
                  ? "text"
                  : "password"
              }
              placeholder="Пароль"
              variant="outlined"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message
              }
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() =>
                        setPasswordVisibility(
                          (boolean) => !boolean,
                        )
                      }
                    >
                      {visiblePassword ? (
                        <Image
                          src={eyeCoalGrayIcon}
                          alt="eye coal gray"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          src={
                            eyeSlashCoalGrayIcon
                          }
                          alt="eye slash coal gray"
                          width={24}
                          height={24}
                        />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />
          )}
        />
        <Box
          sx={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Link href="/authorization/login?via=fogot_password">
            <Typography
              variant="h6"
              color="primary"
              className={styles.link_text}
              sx={{ width: "fit-content" }}
            >
              Забыли пароль?
            </Typography>
          </Link>
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
        sx={{ maxWidth: "400px" }}
      >
        {loading ? "Ожидание..." : "Войти"}
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
