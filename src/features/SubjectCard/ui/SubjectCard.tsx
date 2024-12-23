import classNames from "classnames";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import playIcon from "@/icons/play.png";

import styles from "./SubjectCard.module.scss";

interface ISubjectCardProps {
  image: string;
  title: string;
  description: string;
  color: "primary" | "secondary";
}

export function SubjectCard({
  image,
  title,
  description,
  color,
}: ISubjectCardProps) {
  return (
    <Card
      elevation={0}
      className={classNames(
        styles.card,
        styles[color],
      )}
    >
      <CardMedia
        image={image}
        title={title}
        className={styles.media}
      />
      <CardContent className={styles.content}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            width: "100%",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
          className={styles.title}
        >
          {title}
        </Typography>
        <IconButton
          className={styles.play_button}
          aria-label="play icon"
        >
          <Image
            src={playIcon}
            alt="play icon"
            width={24}
            height={24}
          />
        </IconButton>
        <Typography
          variant="body2"
          fontWeight={500}
        >
          <Typography
            variant="body2"
            component="span"
            fontWeight={700}
            textTransform="capitalize"
          >{`${title} - `}</Typography>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
