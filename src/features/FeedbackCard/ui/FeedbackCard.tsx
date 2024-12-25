import classNames from "classnames";
import Image from "next/image";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { IFeedbackListItem } from "@/shared/types";

import styles from "./FeedbackCard.module.scss";

interface IFeedbackCardProps
  extends IFeedbackListItem {
  color: "primary" | "secondary";
}

export function FeedbackCard({
  comment,
  full_name,
  avatar,
  region,
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
          {comment}
        </Typography>
        <div className={styles.label}>
          <Image
            src={avatar}
            alt={full_name}
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
              {full_name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {region}
            </Typography>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
