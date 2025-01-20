"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Box } from "@mui/material";

import mainBg from "@/backgrounds/main-bg.png";

import styles from "../styles.module.scss";
import { Authentication } from "./Authentication";
import FogotPassword from "./FogotPassword";
import RecoverPassword from "./RecoverPassword";
import SignIn from "./SignIn";

function Page() {
  const searchParams = useSearchParams();
  const via = searchParams.get("via");
  const useCases = {
    email: <SignIn />,
    fogot_password: <FogotPassword />,
    recover_password: <RecoverPassword />,
  };
  return (
    <Box className={styles.page}>
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
    </Box>
  );
}

export function LoginPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
