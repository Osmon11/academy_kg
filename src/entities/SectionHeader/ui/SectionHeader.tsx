import classNames from "classnames";
import { Typography } from "@mui/material";
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
    <div
      className={classNames(
        styles.section_header,
        styles[color]
      )}
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
    </div>
  );
}
