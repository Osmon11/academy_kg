"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Box } from "@mui/material";

import mainBg from "@/backgrounds/main-bg.png";

import styles from "../styles.module.scss";
import SignUp from "./SignUp";
import VerifyAccount from "./VerifyAccount";

export function RegistrationPage() {
  const searchParams = useSearchParams();
  const verify = searchParams.get("verify");
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
        {verify ? <VerifyAccount /> : <SignUp />}
      </Box>
    </div>
  );
}
