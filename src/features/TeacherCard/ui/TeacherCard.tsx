import classNames from "classnames";

import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  SxProps,
  Typography,
} from "@mui/material";

import { ITeacherListItem } from "@/shared/types";

import styles from "./TeacherCard.module.scss";

interface ITeacherCardProps
  extends ITeacherListItem {
  mediaSx?: SxProps;
  sx?: SxProps;
}

export function TeacherCard({
  full_name,
  position,
  avatar,
  mediaSx,
  sx,
}: ITeacherCardProps) {
  return (
    <Card
      elevation={0}
      className={classNames(styles.card)}
      sx={sx}
    >
      <CardMedia
        image={avatar}
        title={full_name}
        className={styles.media}
        sx={mediaSx}
      />
      <CardContent className={styles.content}>
        <Chip
          label={full_name}
          variant="outlined"
          color="secondary"
          sx={{
            marginTop: "16px",
            height: 40,
            borderWidth: "2px",
            borderRadius: "30px",
            ".MuiChip-label": {
              fontSize: 16,
              fontWeight: 700,
            },
          }}
        />
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginTop: "6px" }}
        >
          {position}
        </Typography>
      </CardContent>
    </Card>
  );
}
