import classNames from "classnames";
import { forwardRef } from "react";

import { Box, Typography } from "@mui/material";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";

import styles from "./SectionHeader.module.scss";

interface ISectionHeaderProps {
  color: "primary" | "secondary";
  children: React.ReactNode;
}

export const SectionHeader = forwardRef<
  HTMLDivElement,
  ISectionHeaderProps
>(function SectionHeader(
  { color, children },
  ref,
) {
  return (
    <Box
      ref={ref}
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
          textWrap: { xs: "wrap", md: "nowrap" },
          fontWeight: 900,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {children}
      </Typography>
      <div className={styles.line} />
    </Box>
  );
});
