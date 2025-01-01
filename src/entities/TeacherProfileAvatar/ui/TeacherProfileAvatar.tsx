import classNames from "classnames";
import Image from "next/image";

import {
  Box,
  SxProps,
  Typography,
} from "@mui/material";

import { ITeacherListItem } from "@/shared/types";

import styles from "./TeacherProfileAvatar.module.scss";

interface ITeacherProfileAvatarProps
  extends Pick<
    ITeacherListItem,
    "full_name" | "avatar" | "position"
  > {
  fullnameColor: "secondary" | "primary";
  className?: string;
  sx?: SxProps;
}

export function TeacherProfileAvatar({
  className,
  sx,
  avatar,
  full_name,
  fullnameColor = "primary",
  position,
}: ITeacherProfileAvatarProps) {
  return (
    <Box
      className={classNames(
        styles.profile,
        className,
      )}
      sx={sx}
    >
      <Image
        src={avatar}
        alt={full_name}
        width={60}
        height={60}
        quality={100}
        className={styles.profile_image}
      />
      <span>
        <Typography
          variant="body1"
          fontWeight={700}
          color={fullnameColor}
        >
          {full_name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {position}
        </Typography>
      </span>
    </Box>
  );
}
