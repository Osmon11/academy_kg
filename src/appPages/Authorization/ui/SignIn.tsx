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

import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import appAxios from "@/shared/config/axios";

import arrowLeftBlackIcon from "@/icons/arrow-left-black.svg";
import eyeCoalGrayIcon from "@/icons/eye-coal-gray.svg";
import eyeSlashCoalGrayIcon from "@/icons/eye-slash-coal-gray.svg";
import logoPrimaryIcon from "@/icons/logo-primary.svg";

import styles from "./styles.module.scss";

interface IFormValues {
  email: string;
  password: string;
}
export default function SignIn() {
  const router = useRouter();
  function handleGoBack() {
    router.back();
  }
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
    appAxios
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
            res.data.access,
            {
              path: "/",
              expires: d,
            },
          );
          router.replace(
            returnPathname ??
              "/personal-accaunt/main",
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const [visiblePassword, setPasswordVisibility] =
    useState(false);
  return (
    <Paper
      className={styles.paper}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <IconButton
        className={styles.go_back_button}
        onClick={handleGoBack}
      >
        <Image
          src={arrowLeftBlackIcon}
          alt="arrow left black icon"
          width={24}
          height={24}
        />
      </IconButton>
      <Link href="/">
        <Image
          src={logoPrimaryIcon}
          alt="islamic online-academy green icon"
          width={100}
          height={100}
        />
      </Link>
      <Typography
        variant="h5"
        textAlign="center"
        color="textThirtiary"
        fontWeight={600}
      >
        Вход с паролем
      </Typography>
      <Box
        sx={{ width: "100%", maxWidth: "400px" }}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "E-mail is required",
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
            required: "Password is required",
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
          <Link href="/authorization/login?via=recover_password">
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
        {loading ? "Loading..." : "Войти"}
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
    </Paper>
  );
}
