import Image from "next/image";
import React from "react";

import { Box, Typography } from "@mui/material";

import mainBg from "@/backgrounds/main-bg.webp";

import styles from "./PageHeading.module.scss";

interface IPageHeadingProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  subtitles?: string[];
}

export function PageHeading({
  header,
  title,
  subtitles,
  children,
}: IPageHeadingProps) {
  return (
    <Box className={styles.page_heading}>
      <Image
        className={styles.bg_image}
        src={mainBg}
        alt="mosque"
        placeholder="blur"
        quality={100}
        fill
        priority
        sizes="100%"
      />
      <Box className={styles.content}>
        {header}
        {Boolean(title) && (
          <Typography
            component="h1"
            variant="h4"
            textTransform="uppercase"
            className={styles.title}
            sx={{ marginTop: "20px" }}
          >
            {title}
          </Typography>
        )}
        {Array.isArray(subtitles) &&
          subtitles.map(
            (subtitle, subtitleIndex) => (
              <Typography
                variant="h6"
                className={styles.subtitle}
                sx={{ marginTop: "20px" }}
                key={subtitle + subtitleIndex}
              >
                {subtitle}
              </Typography>
            ),
          )}
        {children}
      </Box>
    </Box>
  );
}
