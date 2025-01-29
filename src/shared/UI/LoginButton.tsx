import { useRouter } from "next-nprogress-bar";
import Image from "next/image";

import { Button } from "@mui/material";

import { routePath } from "@/shared/functions";

import loginIcon from "@/icons/login.svg";

import { useAppSelector } from "../config/store";

export function LoginButton({
  fullWidth,
}: {
  fullWidth?: boolean;
}) {
  const router = useRouter();
  const language = useAppSelector(
    (store) => store.user.language,
  );
  return (
    <Button
      startIcon={
        <Image
          src={loginIcon}
          alt="login icon"
          width={24}
          height={24}
        />
      }
      onClick={() =>
        router.push(routePath("signIn"))
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
  );
}
