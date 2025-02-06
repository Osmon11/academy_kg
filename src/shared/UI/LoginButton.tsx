import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@mui/material";

import { useAppRouter } from "@/shared/hooks/useAppRouter";

import loginIcon from "@/icons/login.svg";

export function LoginButton({
  fullWidth,
}: {
  fullWidth?: boolean;
}) {
  const router = useAppRouter();
  const t = useTranslations("Header");
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
      onClick={() => router.push("signIn")}
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
      {t("login")}
    </Button>
  );
}
