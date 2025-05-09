"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, {
  ReactElement,
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  AppBar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import { DrawerSidebar } from "@/entities/DrawerSidebar";

import {
  accountNavLinks,
  mainNavLinks,
} from "@/shared/config/const";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { usePathname } from "@/shared/i18n/routing";

import arrowLeftIcon from "@/icons/arrow-left-black.svg";
import menuGrayIcon from "@/icons/menu-gray.svg";

import styles from "./GoBackHeader.module.scss";

interface GoBackHeaderProps {
  title: string;
  onGoBack?: () => void;
  append?: ReactElement;
}

function Component({
  title,
  onGoBack,
  append,
}: GoBackHeaderProps) {
  const navigation = useAppRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(
    () => () => setOpen(false),
    [searchParams],
  );

  function handleGoBack() {
    if (typeof onGoBack === "function") {
      onGoBack();
    }
    navigation.back();
  }

  const navLinks = pathname.includes(
    "personal-accaunt",
  )
    ? accountNavLinks
    : mainNavLinks;
  return (
    <AppBar className={styles.header}>
      <IconButton onClick={handleGoBack}>
        <Image
          className={styles.arrow_left_icon}
          src={arrowLeftIcon}
          alt="arrow left icon"
          width={32}
          height={32}
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
      <Box className={styles.append_wrapper}>
        {append}
        <IconButton onClick={() => setOpen(true)}>
          <Image
            src={menuGrayIcon}
            alt="menu icon"
            width={32}
            height={32}
          />
        </IconButton>
        <DrawerSidebar
          open={open}
          handleDrawerClose={() => setOpen(false)}
          navLinks={navLinks}
        />
      </Box>
    </AppBar>
  );
}

export const GoBackHeader = (
  props: GoBackHeaderProps,
) => (
  <Suspense>
    <Component {...props} />
  </Suspense>
);
