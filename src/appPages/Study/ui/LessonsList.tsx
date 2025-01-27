"use client";

import moment from "moment";
import Image from "next/image";
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  TypographyProps,
} from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { useAppSelector } from "@/shared/config/store";
import { getAllMinutes } from "@/shared/functions";
import {
  IExamDetail,
  ILessonDetail,
  isExamTypeGuard,
} from "@/shared/types";

import playCircleGrayIcon from "@/icons/play-circle-gray.svg";
import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";
import starCirclePrimaryIcon from "@/icons/star-circle-primary.svg";

interface ILessonsListProps {
  onSelectLesson: (lesson: ILessonDetail) => void;
  onSelectExam: () => void;
}

export default function LessonsList({
  onSelectLesson,
  onSelectExam,
}: ILessonsListProps) {
  const { courseLevels } = useAppSelector(
    (store) => store.course,
  );
  const lessonsAndExam = useMemo<
    (ILessonDetail | IExamDetail)[]
  >(() => {
    const result: (
      | ILessonDetail
      | IExamDetail
    )[] = courseLevels
      ? [...courseLevels.lessons]
      : [];
    if (courseLevels?.exam) {
      result.push(courseLevels.exam);
    }
    return result;
  }, [courseLevels]);
  const [activeIndex, setActiveIndex] =
    useState(-1);

  useEffect(() => {
    if (
      activeIndex < 0 &&
      lessonsAndExam.length > 0 &&
      lessonsAndExam[0] &&
      !isExamTypeGuard(lessonsAndExam[0])
    ) {
      setActiveIndex(0);
      onSelectLesson(lessonsAndExam[0]);
    }
  }, [
    activeIndex,
    lessonsAndExam,
    onSelectLesson,
  ]);

  const typographyProps = {
    variant:
      "body1" as TypographyProps["variant"],
    color: "textSecondary",
    lineHeight: "14px",
    fontSize: "14px",
    component: "p",
  };
  return (
    <Box className={"accordeons"}>
      {lessonsAndExam.length > 0 ? (
        <Fragment>
          {lessonsAndExam.map((item, index) => {
            const isActive =
              index === activeIndex;
            const isExam = isExamTypeGuard(item);
            return (
              <Accordion
                key={`${item.id}-${isExam ? "exam" : "lesson"}`}
                onChange={(_, expanded) => {
                  setActiveIndex(index);
                  if (expanded) {
                    if (isExam) {
                      onSelectExam();
                    } else {
                      onSelectLesson(item);
                    }
                  }
                }}
                expanded={isActive}
              >
                <AccordionSummary>
                  <Box className={"flex_box"}>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      color="#A3A3A3"
                      minWidth="33px"
                    >
                      {index + 1}
                    </Typography>
                    <Box
                      className={"flex_box"}
                      sx={{ gap: "8px" }}
                    >
                      <Image
                        src={
                          isExam
                            ? starCirclePrimaryIcon
                            : isActive
                              ? playCirclePrimaryIcon
                              : playCircleGrayIcon
                        }
                        alt={
                          isExam
                            ? "star circle green icon"
                            : `play circle ${isActive ? "green" : "gray"} icon`
                        }
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
                          {isExam
                            ? "Экзамен"
                            : item.title}
                        </Typography>
                        {!isExam && (
                          <Typography
                            {...typographyProps}
                          >{`Видео - ${moment(item.duration, TIME_FORMAT).format("HH:mm")}`}</Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {isExam ? (
                    <Fragment>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >
                        {`Необходимый минимум
                        баллов: ${item.pass_points}`}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="p"
                        color="textSecondary"
                      >{`Время на экзамен: ${getAllMinutes(item.duration)} мин.`}</Typography>
                    </Fragment>
                  ) : (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                    >
                      {item.description}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Fragment>
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
