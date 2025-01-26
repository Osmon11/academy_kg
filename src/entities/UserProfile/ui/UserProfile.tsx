import { signOut } from "next-auth/react";
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

import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";
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
  const language = useAppSelector(
    (store) => store.user.language,
  );
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const removeCookie = useCookies([
    process.env
      .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
  ])[2];
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    signOut();
    setAnchorEl(null);
    removeCookie(
      process.env
        .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    );
    router.push(routePath("main"));
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
          className={styles.avatar}
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
              router.push(routePath("accaunt"));
            }}
          >
            {language === "RU"
              ? "Личный кабинет"
              : "Жеке кабинет"}
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            router.push(routePath("profile"));
          }}
        >
          {language === "RU"
            ? "Мой профиль"
            : "Менин профилим"}
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography color="error">
            {language === "RU"
              ? "Выйти"
              : "Чыгуу"}
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
