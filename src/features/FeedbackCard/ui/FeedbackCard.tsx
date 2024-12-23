import classNames from "classnames";
import Image from "next/image";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import styles from "./FeedbackCard.module.scss";

interface IFeedbackCardProps {
  feedback: string;
  fullname: string;
  profile_image: string;
  location: string;
  color: "primary" | "secondary";
}

export function FeedbackCard({
  feedback,
  fullname,
  profile_image,
  location,
  color,
}: IFeedbackCardProps) {
  return (
    <Card
      elevation={0}
      className={classNames(
        styles.card,
        styles[color],
      )}
    >
      <CardContent className={styles.content}>
        <Typography variant="h6">
          {feedback}
        </Typography>
        <div className={styles.label}>
          <Image
            src={profile_image}
            alt={fullname}
            width={60}
            height={60}
            quality={100}
            className={styles.profile_image}
          />
          <span>
            <Typography
              variant="body1"
              fontWeight={700}
              color={
                color === "primary"
                  ? "secondary"
                  : "primary"
              }
            >
              {fullname}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {location}
            </Typography>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
