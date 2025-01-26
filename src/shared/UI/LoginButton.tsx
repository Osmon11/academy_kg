import Image from "next/image";
import Link from "next/link";

import { Button } from "@mui/material";

import { routePath } from "@/shared/functions";

import loginIcon from "@/icons/login.svg";

import { useAppSelector } from "../config/store";

export function LoginButton({
  fullWidth,
}: {
  fullWidth?: boolean;
}) {
  const language = useAppSelector(
    (store) => store.user.language,
  );
  return (
    <Link
      href={routePath("signIn")}
      style={{ width: "100%" }}
    >
      <Button
        startIcon={
          <Image
            src={loginIcon}
            alt="login icon"
            width={24}
            height={24}
          />
        }
        sx={{
          minHeight: fullWidth ? 50 : 30,
          padding: "3px 10px",
          borderRadius: "8px",
          typography: {
            textTransform: "uppercase",
          },
        }}
        color="secondary"
        variant="contained"
        fullWidth={fullWidth}
      >
        {language === "RU" ? "ВХОД" : "КИРҮҮ"}
      </Button>
    </Link>
  );
}
