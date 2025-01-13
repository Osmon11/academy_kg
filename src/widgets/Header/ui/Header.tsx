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

import { TubeSpinner } from "@/shared/UI";
import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";

import logoPrimaryIcon from "@/icons/logo-primary.svg";
import logoIcon from "@/icons/logo.svg";
import menuGrayIcon from "@/icons/menu-gray.svg";
import menuIcon from "@/icons/menu.svg";

import DrawerSidebar from "./DrawerSidebar";
import LanguageSelect from "./LanguageSelect";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
import styles from "./styles.module.scss";

interface INavLink {
  label: string;
  href: string;
}

const mainNavLinks: INavLink[] = [
  { label: "Главное", href: routePath("main") },
  {
    label: "Вебинары",
    href: routePath("webinars"),
  },
  { label: "О нас", href: routePath("aboutUs") },
  {
    label: "Поддержать",
    href: routePath("supportUs"),
  },
];

const accountNavLinks: INavLink[] = [
  {
    label: "Главное",
    href: routePath("accaunt"),
  },
  {
    label: "Курсы",
    href: routePath("courses"),
  },
];

interface IHeaderProps extends AppBarProps {
  background: "transparent" | "white";
}

export function Header({
  background,
  ...props
}: IHeaderProps) {
  const { profile, loading } = useAppSelector(
    (state) => state.user,
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
  const mainLayout = background === "transparent";
  const navLinks = mainLayout
    ? mainNavLinks
    : accountNavLinks;
  return (
    <AppBar
      {...props}
      className={classNames(
        styles.header,
        styles[background],
      )}
    >
      <Link href={routePath("main")}>
        <Image
          src={
            mainLayout
              ? logoIcon
              : logoPrimaryIcon
          }
          alt="islamic online-academy logo"
          width={40}
          height={40}
        />
      </Link>
      {upMd && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {navLinks.map((navItem, index) => {
            const active =
              pathname === navItem.href;
            return (
              <Link
                key={navItem.label + index}
                href={navItem.href}
                className={classNames(
                  styles.nav_link,
                  {
                    [styles.active]: active,
                  },
                )}
              >
                <Typography
                  variant="subtitle1"
                  color={
                    mainLayout || active
                      ? "textPrimary"
                      : "primary"
                  }
                  sx={{
                    textTransform: mainLayout
                      ? "uppercase"
                      : "initial",
                    lineHeight: "17px",
                  }}
                >
                  {navItem.label}
                </Typography>
              </Link>
            );
          })}
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
                mainLayout ? "white" : "black"
              }
            />
            {loading ? (
              <TubeSpinner
                width={30}
                height={30}
              />
            ) : profile ? (
              <UserProfile
                profile={profile}
                shortFullname
                color={
                  mainLayout ? "white" : "black"
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
                  mainLayout
                    ? menuIcon
                    : menuGrayIcon
                }
                alt="menu icon"
                width={32}
                height={32}
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
