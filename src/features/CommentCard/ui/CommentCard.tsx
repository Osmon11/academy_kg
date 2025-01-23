import classNames from "classnames";

import {
  Card,
  CardContent,
  SxProps,
  Typography,
} from "@mui/material";

import styles from "./CommentCard.module.scss";

interface ICommentCardProps {
  header?: string;
  comment: string;
  color?: "primary" | "secondary";
  children?: React.ReactNode;
  sx?: SxProps;
  className?: string;
  contentClassName?: string;
}

export function CommentCard({
  header,
  comment,
  color = "primary",
  children,
  sx,
  className,
  contentClassName,
}: ICommentCardProps) {
  return (
    <Card
      elevation={0}
      className={classNames(
        styles.card,
        styles[color],
        className,
      )}
      sx={sx}
    >
      <CardContent
        className={classNames(
          styles.content,
          contentClassName,
        )}
      >
        {Boolean(header) && (
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ marginBottom: "12px" }}
          >
            {header}
          </Typography>
        )}
        <Typography variant="h6">
          {comment}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
