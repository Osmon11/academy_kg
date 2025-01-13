import moment from "moment";
import Image from "next/image";

import { Box, Typography } from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { ILessonDetail } from "@/shared/types";

import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";

import styles from "../styles.module.scss";

interface ITextOfTheLessonProps {
  lesson: ILessonDetail | null;
}

export default function TextOfTheLesson({
  lesson,
}: ITextOfTheLessonProps) {
  return lesson ? (
    <Box>
      <Box
        className={styles.flex_box}
        sx={{ gap: "8px" }}
      >
        <Image
          src={playCirclePrimaryIcon}
          alt="play circle green icon"
          width={24}
          height={24}
        />
        <Box>
          <Typography
            variant="body1"
            color="textSecondary"
            fontWeight={600}
          >
            {lesson.tittle}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
          >{`Видео - ${moment(lesson.duration, TIME_FORMAT).format("HH:mm")}`}</Typography>
        </Box>
      </Box>
      <Box className={styles.wrapper}>
        <Box
          className={styles.text_of_the_lesson}
        >
          <Typography
            variant="caption"
            color="textSecondary"
          >
            {lesson.text_lesson}
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : null;
}
