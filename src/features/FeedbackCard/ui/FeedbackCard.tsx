import { CommentCard } from "@/features/CommentCard";

import { TeacherProfileAvatar } from "@/entities/TeacherProfileAvatar";

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
    <CommentCard
      className={styles.card}
      contentClassName={styles.content}
      comment={comment}
      color={color}
    >
      <TeacherProfileAvatar
        className={styles.label}
        full_name={full_name}
        avatar={avatar}
        position={region}
        fullnameColor={color}
      />
    </CommentCard>
  );
}
