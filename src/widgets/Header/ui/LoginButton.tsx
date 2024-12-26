import Image from "next/image";
import Link from "next/link";

import { Button } from "@mui/material";

import loginIcon from "@/icons/login.svg";

export default function LoginButton() {
  return (
    <Link href="/authorization/login">
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
          padding: "3px 10px",
          borderRadius: "8px",
          typography: {
            textTransform: "uppercase",
          },
        }}
        color="secondary"
        variant="contained"
      >
        вход
      </Button>
    </Link>
  );
}
