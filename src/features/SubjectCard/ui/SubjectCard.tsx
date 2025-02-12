import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import YouTube from "react-youtube";

import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";

import { getYouTubeVideoId } from "@/shared/functions";
import { ISubjectListItem } from "@/shared/types";

import playIcon from "@/icons/play.svg";
import closeBlackIcon from "@/icons/x-close-black.svg";

import styles from "./SubjectCard.module.scss";

interface ISubjectCardProps
  extends ISubjectListItem {
  color: "primary" | "secondary";
}

export function SubjectCard({
  image,
  title,
  description,
  color,
  trailer,
}: ISubjectCardProps) {
  const t = useTranslations("SubjectCard");
  const [dialog, setDialog] = useState(false);
  return (
    <Card
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
        {trailer && (
          <IconButton
            className={styles.play_button}
            aria-label="play icon"
            onClick={() => setDialog(true)}
          >
            <Image
              src={playIcon}
              alt="play icon"
              width={24}
              height={24}
            />
          </IconButton>
        )}
        <Typography
          variant="body2"
          fontWeight={500}
        >
          <Typography
            variant="body2"
            component="span"
            fontWeight={700}
            textTransform="capitalize"
          >
            {t("title", { title })}
          </Typography>
          {description}
        </Typography>
        <Dialog
          fullScreen
          open={dialog}
          onClose={() => setDialog(false)}
          className="page"
          PaperProps={{
            sx: {
              paddingTop: "58px",
              borderRadius: "8px",
            },
          }}
        >
          <IconButton
            className="close_dialog_button"
            aria-label="close"
            onClick={() => setDialog(false)}
          >
            <Image
              src={closeBlackIcon}
              alt="x close black icon"
              width={24}
              height={24}
            />
          </IconButton>
          <YouTube
            className={"video"}
            videoId={
              trailer
                ? getYouTubeVideoId(trailer)
                : undefined
            }
          />
        </Dialog>
      </CardContent>
    </Card>
  );
}
