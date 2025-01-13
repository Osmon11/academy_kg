"use client";

import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  TypographyProps,
} from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { ILessonDetail } from "@/shared/types";

import playCircleGrayIcon from "@/icons/play-circle-gray.svg";
import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";

import styles from "../styles.module.scss";

interface ILessonsListProps {
  lessons: ILessonDetail[];
  onSelectLesson: (lesson: ILessonDetail) => void;
}

export default function LessonsList({
  lessons,
  onSelectLesson,
}: ILessonsListProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);
  useEffect(() => {
    if (lessons.length > 0) {
      onSelectLesson(lessons[0]);
    }
  }, [lessons, onSelectLesson]);
  const typographyProps = {
    variant:
      "body1" as TypographyProps["variant"],
    color: "textSecondary",
    lineHeight: "14px",
    fontSize: "14px",
    component: "p",
  };
  return (
    <Box className={styles.accordeons}>
      {lessons.length > 0 ? (
        lessons.map((lesson, index) => {
          const isActive = index === activeIndex;
          return (
            <Accordion
              key={lesson.id}
              onChange={(_, expanded) => {
                setActiveIndex(index);
                if (expanded) {
                  onSelectLesson(lesson);
                }
              }}
              expanded={isActive}
            >
              <AccordionSummary>
                <Box
                  className={styles.flex_box}
                  sx={{ gap: "20px" }}
                >
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
                      src={
                        isActive
                          ? playCirclePrimaryIcon
                          : playCircleGrayIcon
                      }
                      alt={`play circle ${isActive ? "green" : "gray"} icon`}
                      width={24}
                      height={24}
                    />
                    <Box>
                      <Typography
                        {...typographyProps}
                        fontWeight={
                          isActive ? 600 : 400
                        }
                      >
                        {lesson.title}
                      </Typography>
                      <Typography
                        {...typographyProps}
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
                  {lesson.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
          sx={{ margin: "12px 0px" }}
        >
          Нет уроков
        </Typography>
      )}
    </Box>
  );
}
