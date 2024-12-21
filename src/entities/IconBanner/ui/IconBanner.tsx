import classNames from "classnames";
import Image from "next/image";

import {
  Box,
  SxProps,
  Typography,
} from "@mui/material";

import styles from "./IconBanner.module.scss";

interface IIconBannerProps {
  color: "primary" | "secondary";
  sx?: SxProps;
  icon: string;
  icon_alt: string;
  title: string;
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
      <Typography
        variant="h6"
        textTransform="uppercase"
        fontWeight={700}
        sx={{ marginTop: "10px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        textTransform="uppercase"
        sx={{
          fontSize: { xs: "14px", sm: "16px" },
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
