"use client";

import moment from "moment";
import Image from "next/image";

import {
  Box,
  ListItem,
  Typography,
} from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { ILessonDetail } from "@/shared/types";

import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";

import styles from "../styles.module.scss";

interface IOverviewLessonsProps {
  lessons: ILessonDetail[];
}

export default function OverviewLessons({
  lessons,
}: IOverviewLessonsProps) {
  return lessons.length > 0 ? (
    <Box>
      {lessons.map((lesson, index) => (
        <ListItem
          key={lesson.id}
          component="div"
          className={styles.item}
          sx={{
            borderBottom:
              index + 1 !== lessons.length
                ? "1px solid #E5E5E5"
                : "none",
          }}
        >
          <Box className={styles.flex_box}>
            <Typography
              variant="h5"
              fontWeight={600}
              color="#A3A3A3"
              minWidth="33px"
            >
              {index + 1}
            </Typography>
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
              <Typography
                variant="body1"
                color="textSecondary"
                fontWeight={600}
              >
                {lesson.title}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body1"
            color="textSecondary"
          >{`Видео - ${moment(lesson.duration, TIME_FORMAT).format("HH:mm")}`}</Typography>
        </ListItem>
      ))}
    </Box>
  ) : (
    <Typography
      textAlign="center"
      color="textSecondary"
      fontWeight={600}
      sx={{ marginTop: "16px" }}
    >
      Нет уроков
    </Typography>
  );
}
