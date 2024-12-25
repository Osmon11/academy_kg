"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Box } from "@mui/material";

import { Authentication } from "@/widgets/authentication/ui/Authentication";

import mainBg from "@/backgrounds/main-bg.png";

import RecoverPassword from "./RecoverPassword";
import SignIn from "./SignIn";
import styles from "./styles.module.scss";

export function LoginPage() {
  const searchParams = useSearchParams();
  const via = searchParams.get("via");
  const useCases = {
    email: <SignIn />,
    recover_password: <RecoverPassword />,
  };
  return (
    <div className={styles.page}>
      <Image
        src={mainBg}
        alt="mosque"
        placeholder="blur"
        quality={100}
        fill
        priority
        sizes="100vw"
      />
      <Box className={styles.content}>
        {typeof via === "string" &&
        Object.keys(useCases).includes(via) ? (
          useCases[via as keyof typeof useCases]
        ) : (
          <Authentication />
        )}
      </Box>
    </div>
  );
}
