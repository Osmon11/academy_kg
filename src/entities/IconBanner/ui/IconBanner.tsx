"use client";

import classNames from "classnames";
import Image from "next/image";

import {
  Box,
  SxProps,
  Typography,
  useMediaQuery,
} from "@mui/material";

import styles from "./IconBanner.module.scss";

interface IIconBannerProps {
  color: "primary" | "secondary";
  sx?: SxProps;
  icon: string;
  icon_alt: string;
  title?: string;
  description: string;
}

export function IconBanner({
  color,
  sx,
  icon,
  icon_alt,
  title,
  description,
}: IIconBannerProps) {
  const xs = useMediaQuery((theme) =>
    theme.breakpoints.only("xs"),
  );
  return (
    <Box
      className={classNames(
        styles.icon_banner,
        styles[color],
      )}
      sx={sx}
    >
      <div className={styles.icon}>
        <Image
          src={icon}
          alt={icon_alt}
          width={48}
          height={48}
        />
      </div>
      {Boolean(title) && (
        <Typography
          variant="h6"
          textTransform="uppercase"
          fontWeight={700}
          sx={{ marginTop: "10px" }}
        >
          {title}
        </Typography>
      )}
      <Typography
        variant={xs ? "body2" : "body1"}
        textTransform="uppercase"
        sx={{
          marginTop: Boolean(title)
            ? "10px"
            : "20px",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
