"use client";

import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { useCookies } from "react-cookie";

import {
  Box,
  Menu,
  MenuItem,
  SxProps,
  Typography,
} from "@mui/material";

import { IProfile } from "@/shared/types";

import avatarGrayIcon from "@/icons/avatar-gray.svg";

import styles from "./styles.module.scss";

interface IUserProfileProps {
  profile: IProfile;
  color: "white" | "black";
  shortFullname?: boolean;
  sx?: SxProps;
}

export default function UserProfile({
  profile,
  color,
  shortFullname,
  sx,
}: IUserProfileProps) {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const removeCookie = useCookies([
    "access_token_ilimnuru_kg",
  ])[2];
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    setAnchorEl(null);
    removeCookie("access_token_ilimnuru_kg");
    router.push("/");
  }
  return (
    <Fragment>
      <Box
        className={styles.user_profile}
        id="profile-button"
        aria-controls={
          open ? "profile-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={sx}
      >
        <Image
          src={profile?.avatar ?? avatarGrayIcon}
          alt="user profile avatar"
          width={30}
          height={30}
        />
        <Box
          sx={{
            display: { xs: "flex", md: "block" },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={600}
            lineHeight="16px"
            color={
              color === "white"
                ? "textPrimary"
                : "textSecondary"
            }
            className={styles.clickable}
          >
            {shortFullname
              ? profile?.full_name
                  .split(" ")
                  .map((item, index) =>
                    index === 0
                      ? item
                      : `${item[0]}.`,
                  )
                  .join(" ")
              : profile.full_name}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={700}
            lineHeight="16px"
            color={
              color === "white"
                ? "secondary"
                : "primary"
            }
            className={styles.clickable}
          >
            {`${profile?.level} ур.`}
          </Typography>
        </Box>
      </Box>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "profile-button",
          color: "primary",
        }}
      >
        {!pathname.includes(
          "/personal-accaunt",
        ) && (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              router.push(
                "/personal-accaunt/main",
              );
            }}
          >
            Личный кабинет
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Мой профиль
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography color="error">
            Выйти
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
