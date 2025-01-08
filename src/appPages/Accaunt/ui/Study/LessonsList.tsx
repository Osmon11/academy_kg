"use client";

import moment from "moment";
import Image from "next/image";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { ILessonDetail } from "@/shared/types";

// import playCircleGrayIcon from "@/icons/play-circle-primary.svg";
import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";

import styles from "../styles.module.scss";

interface ILessonsListProps {
  lessons: ILessonDetail[];
}

export default function LessonsList({
  lessons,
}: ILessonsListProps) {
  return (
    <Box className={styles.accordeons}>
      {lessons.map((lesson, index) => (
        <Accordion key={lesson.id}>
          <AccordionSummary>
            <Box
              className={styles.flex_box}
              sx={{ gap: "20px" }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                color="#A3A3A3"
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
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="caption"
              color="textSecondary"
            >
              {lesson.text_lesson}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
