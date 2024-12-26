import Image from "next/image";
import Link from "next/link";

import { Button } from "@mui/material";

import loginIcon from "@/icons/login.svg";

export default function LoginButton({
  fullWidth,
}: {
  fullWidth?: boolean;
}) {
  return (
    <Link
      href="/authorization/login"
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
        вход
      </Button>
    </Link>
  );
}
