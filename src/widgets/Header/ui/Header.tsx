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
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useAppSelector } from "@/shared/config/store";

import logoPrimaryIcon from "@/icons/logo-primary.svg";
import logoIcon from "@/icons/logo.svg";
import menuGrayIcon from "@/icons/menu-gray.svg";
import menuIcon from "@/icons/menu.svg";

import DrawerSidebar from "./DrawerSidebar";
import LanguageSelect from "./LanguageSelect";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
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
  const profile = useAppSelector(
    (state) => state.user.profile,
  );
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
  return (
    <AppBar
      {...props}
      className={classNames(
        styles.header,
        styles[background],
      )}
    >
      <Link href="/">
        <Image
          src={
            background === "transparent"
              ? logoIcon
              : logoPrimaryIcon
          }
          alt="islamic online-academy logo"
          width={40}
          height={40}
          className={styles.logo}
        />
      </Link>
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
        {upMd ? (
          <Fragment>
            <LanguageSelect
              color={
                background === "transparent"
                  ? "white"
                  : "black"
              }
            />
            {profile ? (
              <UserProfile
                profile={profile}
                shortFullname
                color={
                  background === "transparent"
                    ? "white"
                    : "black"
                }
              />
            ) : (
              <LoginButton />
            )}
          </Fragment>
        ) : (
          <Fragment>
            <IconButton
              onClick={handleDrawerOpen}
            >
              <Image
                src={
                  background === "transparent"
                    ? menuIcon
                    : menuGrayIcon
                }
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
              profile={profile}
            />
          </Fragment>
        )}
      </Box>
    </AppBar>
  );
}
