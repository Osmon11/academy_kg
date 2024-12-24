"use client";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";

import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import loginIcon from "@/icons/login.svg";
import logoIcon from "@/icons/logo.svg";
import menuIcon from "@/icons/menu.svg";

import DrawerSidebar from "./DrawerSidebar";
import LanguageSelect from "./LanguageSelect";
import styles from "./styles.module.scss";

const navLinks = [
  { label: "Главное", href: "/" },
  // { label: "Учиться", href: "/study" },
  { label: "Вебинары", href: "/webinars" },
  { label: "О нас", href: "/about-us" },
  { label: "Поддержать", href: "/support-us" },
];

interface IHeaderProps extends AppBarProps {
  background: "transparent" | "white";
}

export function Header({
  background,
  ...props
}: IHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }
  function handleDrawerClose() {
    setOpen(false);
  }

  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  return (
    <AppBar
      {...props}
      className={classNames(
        styles.header,
        styles[background],
      )}
    >
      <Image
        src={logoIcon}
        alt="islamic online-academy logo"
        width={40}
        height={40}
        className={styles.logo}
      />
      {upMd && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {navLinks.map((navItem, index) => (
            <Link
              key={navItem.label + index}
              href={navItem.href}
              className={classNames(
                styles.nav_link,
                {
                  [styles.active]:
                    pathname === navItem.href,
                },
              )}
            >
              <Typography variant="subtitle1">
                {navItem.label}
              </Typography>
            </Link>
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {upSm && (
          <LanguageSelect
            color={
              background === "transparent"
                ? "white"
                : "primary"
            }
          />
        )}
        {upMd ? (
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
        ) : (
          <Fragment>
            <IconButton
              onClick={handleDrawerOpen}
            >
              <Image
                src={menuIcon}
                alt="menu icon"
                width={32}
                height={32}
                className={styles.logo}
              />
            </IconButton>
            <DrawerSidebar
              open={open}
              handleDrawerClose={
                handleDrawerClose
              }
              navLinks={navLinks}
            />
          </Fragment>
        )}
      </Box>
    </AppBar>
  );
}
