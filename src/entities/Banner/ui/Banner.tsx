import classNames from "classnames";
import Image from "next/image";

import { Box, SxProps } from "@mui/material";

import halfmoonStarIcon from "@/icons/ay-yildiz.svg";
import lanternIcon from "@/icons/lantern.svg";

import styles from "./Banner.module.scss";

interface IBannerProps {
  color: "primary" | "secondary";
  sx?: SxProps;
  children: React.ReactNode;
}

export function Banner({
  color,
  sx,
  children,
}: IBannerProps) {
  return (
    <Box
      className={classNames(
        styles.banner,
        styles[color],
      )}
      sx={sx}
    >
      <Image
        src={lanternIcon}
        alt="lantern icon"
        className={styles.lantern_icon}
        width={146.27}
        height={146.27}
      />
      <Image
        src={halfmoonStarIcon}
        alt="halfmoon and star icon"
        className={styles.halfmoon_star_icon}
        width={146.73}
        height={146.68}
      />
      <div className={styles.content}>
        {children}
      </div>
    </Box>
  );
}
