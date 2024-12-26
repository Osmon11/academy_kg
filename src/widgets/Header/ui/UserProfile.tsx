import Image from "next/image";
import Link from "next/link";

import {
  Box,
  SxProps,
  Typography,
} from "@mui/material";

import { IProfile } from "@/shared/types";

import avatarGrayIcon from "@/icons/avatar-gray.svg";

import styles from "./styles.module.scss";

interface IUserProfileProps {
  profile: IProfile;
  sx?: SxProps;
}

export default function UserProfile({
  profile,
  sx,
}: IUserProfileProps) {
  return (
    <Box
      className={styles.user_profile}
      sx={sx}
    >
      <Link href="/">
        <Image
          src={profile?.avatar ?? avatarGrayIcon}
          alt="user profile avatar"
          width={30}
          height={30}
        />
      </Link>
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
          color="textSecondary"
        >
          {profile?.full_name}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          fontWeight={700}
          lineHeight="16px"
        >
          {`${profile?.level} ур.`}
        </Typography>
      </Box>
    </Box>
  );
}
