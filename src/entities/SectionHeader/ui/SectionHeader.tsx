import classNames from "classnames";

import { Box, Typography } from "@mui/material";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";

import styles from "./SectionHeader.module.scss";

interface ISectionHeaderProps {
  color: "primary" | "secondary";
  children: React.ReactNode;
}

export function SectionHeader({
  color,
  children,
}: ISectionHeaderProps) {
  return (
    <Box
      className={classNames(
        styles.section_header,
        styles[color],
      )}
      sx={{ marginTop: SECTION_MARGIN_TOP }}
    >
      <div className={styles.line} />
      <Typography
        variant="h4"
        color={color}
        sx={{
          textTransform: "uppercase",
          fontWeight: 900,
          textWrap: "nowrap",
        }}
        className={styles.title}
      >
        {children}
      </Typography>
      <div className={styles.line} />
    </Box>
  );
}
