"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AppBar,
  IconButton,
  Typography,
} from "@mui/material";

import styles from "./GoBackHeader.module.scss";

interface GoBackHeaderProps {
  title: string;
  onGoBack?: () => void;
}

export function GoBackHeader({
  title,
  onGoBack,
}: GoBackHeaderProps) {
  const navigation = useRouter();

  function handleGoBack() {
    if (typeof onGoBack === "function") {
      onGoBack();
    }
    navigation.back();
  }
  return (
    <AppBar className={styles.header}>
      <IconButton
        className={styles.go_back_button}
        onClick={handleGoBack}
      >
        <Image
          src="/icons/arrow-left.webp"
          alt="arrow left icon"
          width={24}
          height={24}
          className={styles.arrow_left_icon}
        />
      </IconButton>
      <Typography
        variant="h6"
        fontWeight={600}
        color="primary"
        textAlign="center"
      >
        {title}
      </Typography>
    </AppBar>
  );
}
