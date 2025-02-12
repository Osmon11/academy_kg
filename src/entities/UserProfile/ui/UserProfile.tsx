import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";

import {
  Box,
  Menu,
  MenuItem,
  SxProps,
  Typography,
} from "@mui/material";

import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { usePathname } from "@/shared/i18n/routing";
import { IProfile } from "@/shared/types";

import avatarGrayIcon from "@/icons/avatar-gray.svg";

import styles from "./UserProfile.module.scss";

interface IUserProfileProps {
  profile: IProfile;
  color: "white" | "black";
  shortFullname?: boolean;
  sx?: SxProps;
}

export function UserProfile({
  profile,
  color,
  shortFullname,
  sx,
}: IUserProfileProps) {
  const t = useTranslations("Header");
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useAppRouter();
  const pathname = usePathname();

  function logout() {
    setAnchorEl(null);
    signOut();
    deleteCookie(
      process.env
        .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
      { path: "/" },
    );
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
          className="avatar"
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
                  .slice(0, 2)
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
            {t("lv", { level: profile?.level })}
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
              router.push("accaunt");
            }}
          >
            {t("personalAccaunt")}
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            router.push("profile");
          }}
        >
          {t("myProfile")}
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography color="error">
            {t("logout")}
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
