"use client";

import moment from "moment";
import Image from "next/image";

import {
  Box,
  ListItem,
  Typography,
} from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { useAppSelector } from "@/shared/config/store";

import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";

import commonStyles from "../styles.module.scss";
import styles from "./styles.module.scss";

export default function OverviewLessons() {
  const courseLevels = useAppSelector(
    (store) => store.course.courseLevels,
  );
  const lessons = courseLevels
    ? courseLevels.lessons
    : [];
  return lessons.length > 0 ? (
    <Box>
      {lessons.map((lesson, index) => (
        <ListItem
          key={lesson.id}
          component="div"
          className={styles.lesson_item}
          sx={{
            borderBottom:
              index + 1 !== lessons.length
                ? "1px solid #E5E5E5"
                : "none",
          }}
        >
          <Box className={commonStyles.flex_box}>
            <Typography
              variant="h5"
              fontWeight={600}
              color="#A3A3A3"
              minWidth="33px"
            >
              {index + 1}
            </Typography>
            <Box
              className={commonStyles.flex_box}
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
            textAlign="right"
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
