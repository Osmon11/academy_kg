import classNames from "classnames";

import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

import styles from "./TeacherCard.module.scss";

interface ITeacherCardProps {
  image: string;
  fullname: string;
  subjects: string;
}

export function TeacherCard({
  image,
  fullname,
  subjects,
}: ITeacherCardProps) {
  return (
    <Card
      elevation={0}
      className={classNames(styles.card)}
    >
      <CardMedia
        image={image}
        title={fullname}
        className={styles.media}
      />
      <CardContent className={styles.content}>
        <Chip
          label={fullname}
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
          {subjects}
        </Typography>
      </CardContent>
    </Card>
  );
}
