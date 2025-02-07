"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import { UserProfile } from "@/entities/UserProfile";

import {
  LoginButton,
  SearchTextField,
  TubeSpinner,
} from "@/shared/UI";
import { LocalizationMenu } from "@/shared/UI";
import { ERoute } from "@/shared/config/enum";
import { useAppSelector } from "@/shared/config/store";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { usePathname } from "@/shared/i18n/routing";
import { INavLink } from "@/shared/types";

import logoPrimaryIcon from "@/icons/logo-primary.svg";
import xCloseBlackIcon from "@/icons/x-close-black.svg";

import styles from "./DrawerSidebar.module.scss";

interface IDrawerSidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
  navLinks: INavLink[];
}

export function DrawerSidebar({
  open,
  handleDrawerClose,
  navLinks,
}: IDrawerSidebarProps) {
  const t = useTranslations("Header");
  const router = useAppRouter();
  const { profile, loading } = useAppSelector(
    (state) => state.user,
  );
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  function onClose() {
    setSearch("");
    handleDrawerClose();
  }

  const up400 = useMediaQuery(
    "(min-width:400px)",
  );
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        ".MuiDrawer-paper": {
          width: up400 ? "400px" : "100vw",
          padding: "16px 20px",
        },
      }}
    >
      <Box className={styles.drawer_header}>
        <IconButton
          onClick={() => router.push("main")}
        >
          <Image
            src={logoPrimaryIcon}
            alt="islamic online-academy green icon"
            width={40}
            height={40}
          />
        </IconButton>
        <IconButton onClick={onClose}>
          <Image
            src={xCloseBlackIcon}
            alt="x close black icon"
            width={30}
            height={30}
          />
        </IconButton>
      </Box>
      <SearchTextField
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter" && search) {
            router.push("searchCourses", {
              queryParams: {
                search: search,
              },
            });
          }
        }}
        color="white"
        border={true}
        sx={{
          width: "100% !important",
          marginTop: "30px",
        }}
      />
      <List
        disablePadding
        sx={{ marginTop: "30px" }}
      >
        {navLinks.map((navItem, index) => {
          const isActive =
            pathname ===
            ERoute[navItem.routeName];
          return (
            <ListItem
              key={navItem.routeName + index}
              disablePadding
              sx={{
                marginBottom:
                  navLinks.length === index + 1
                    ? "30px"
                    : "14px",
              }}
            >
              <ListItemButton
                className={classNames(
                  styles.nav_link,
                  {
                    [styles.active]: isActive,
                  },
                )}
                onClick={() =>
                  router.push(navItem.routeName)
                }
              >
                <ListItemText
                  primary={t(navItem.label)}
                  slotProps={{
                    primary: {
                      variant: "body2",
                      color: isActive
                        ? "primary"
                        : "textSecondary",
                      textTransform: "uppercase",
                      sx: {
                        fontWeight: {
                          xs: 500,
                          sm: 600,
                        },
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {loading ? (
        <TubeSpinner
          width={30}
          height={30}
        />
      ) : profile ? (
        <UserProfile
          profile={profile}
          color="black"
        />
      ) : (
        <LoginButton fullWidth />
      )}
      <Box
        sx={{
          marginTop: "30px",
        }}
      >
        <LocalizationMenu color="black" />
      </Box>
    </Drawer>
  );
}
