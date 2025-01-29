"use client";

import classNames from "classnames";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
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

import { DrawerSidebar } from "@/entities/DrawerSidebar";
import { UserProfile } from "@/entities/UserProfile";

import {
  LanguageSelect,
  LoginButton,
  TubeSpinner,
} from "@/shared/UI";
import {
  accountNavLinks,
  mainNavLinks,
} from "@/shared/config/const";
import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";

import logoPrimaryIcon from "@/icons/logo-primary.svg";
import logoIcon from "@/icons/logo.svg";
import menuGrayIcon from "@/icons/menu-gray.svg";
import menuIcon from "@/icons/menu.svg";

import styles from "./Header.module.scss";

interface IHeaderProps extends AppBarProps {
  background: "transparent" | "white";
}

export function Header({
  background,
  ...props
}: IHeaderProps) {
  const router = useRouter();
  const { profile, loading, language } =
    useAppSelector((state) => state.user);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const isTransparent =
    background === "transparent";
  const navLinks = pathname.includes(
    "personal-accaunt",
  )
    ? accountNavLinks
    : mainNavLinks;
  return (
    <AppBar
      {...props}
      className={classNames(
        styles.header,
        styles[background],
      )}
    >
      <IconButton
        onClick={() =>
          router.push(routePath("main"))
        }
      >
        <Image
          src={
            isTransparent
              ? logoIcon
              : logoPrimaryIcon
          }
          alt="islamic online-academy logo"
          width={40}
          height={40}
        />
      </IconButton>
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
              <Typography
                key={navItem.href + index}
                className={classNames(
                  styles.nav_link,
                  {
                    [styles.active]: active,
                  },
                )}
                variant="subtitle1"
                color={
                  isTransparent || active
                    ? "textPrimary"
                    : "primary"
                }
                onClick={() =>
                  router.push(navItem.href)
                }
                sx={{
                  textTransform: isTransparent
                    ? "uppercase"
                    : "initial",
                  lineHeight: "17px",
                }}
              >
                {navItem.label[language]}
              </Typography>
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
                isTransparent ? "white" : "black"
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
                  isTransparent
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
              onClick={() => setOpen(true)}
            >
              <Image
                src={
                  isTransparent
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
              handleDrawerClose={() =>
                setOpen(false)
              }
              navLinks={navLinks}
            />
          </Fragment>
        )}
      </Box>
    </AppBar>
  );
}
