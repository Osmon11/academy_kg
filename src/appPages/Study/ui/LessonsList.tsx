"use client";

import moment from "moment";
import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
  TypographyProps,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { TIME_FORMAT } from "@/shared/config/const";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import { getAllMinutes } from "@/shared/functions";
import { setCourseLevels } from "@/shared/model";
import {
  ICourseLevelDetail,
  ILessonDetail,
  ILevel,
} from "@/shared/types";

import playCircleGrayIcon from "@/icons/play-circle-gray.svg";
import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";
import starCircleGrayIcon from "@/icons/star-circle-gray.svg";
import starCirclePrimaryIcon from "@/icons/star-circle-primary.svg";

import styles from "../styles.module.scss";

interface ILessonsListProps {
  isExam: boolean;
  lessonId: number | null;
  activeId: number | undefined;
  onSelectLesson: (lesson: ILessonDetail) => void;
  onSelectExam: () => void;
}

export default function LessonsList({
  isExam,
  lessonId,
  activeId,
  onSelectLesson,
  onSelectExam,
}: ILessonsListProps) {
  const dispatch = useAppDispatch();
  const { course, courseLevels } = useAppSelector(
    (store) => store.course,
  );
  const [level, setLevel] =
    useState<ILevel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLevelDetail = useCallback(
    (levelId: number) => {
      setLoading(true);
      axiosInstance
        .get<ICourseLevelDetail>(
          `/academy/course_level_detail/${levelId}`,
        )
        .then((res) => {
          if (res?.data) {
            dispatch(setCourseLevels(res.data));
            setLevel({
              id: res.data.id,
              level: res.data.level,
            });
          }
        })
        .finally(() => setLoading(false));
    },
    [dispatch],
  );

  useEffect(() => {
    if (course) {
      fetchLevelDetail(course?.current_level);
    }
  }, [course, fetchLevelDetail]);

  const typographyProps = {
    variant:
      "body1" as TypographyProps["variant"],
    color: "textSecondary",
    lineHeight: "14px",
    fontSize: "14px",
    component: "p",
  };

  const currentLevel = course
    ? course.levels.find(
        (i) => i.id === course.current_level,
      )
    : undefined;
  const isAvailableLevel =
    currentLevel && courseLevels
      ? currentLevel.level <= courseLevels.level
      : false;
  return (
    <Box className={"accordeons"}>
      <Box className={styles.levels_wrapper}>
        {course?.levels.map((item) => (
          <Chip
            key={item.id}
            label={`Уровень ${item.level}`}
            variant={
              item.id === level?.id
                ? "filled"
                : "outlined"
            }
            color="secondary"
            onClick={(event) => {
              setLevel(item);
              event.currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
              fetchLevelDetail(item.id);
            }}
          />
        ))}
      </Box>
      {loading ? (
        <Box className={"tube_spinner_wrapper"}>
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : course &&
        courseLevels &&
        courseLevels.lessons.length > 0 ? (
        <Fragment>
          {courseLevels.lessons.map(
            (item, index) => {
              const isActive =
                !isExam && item.id === activeId;
              const disabled =
                isAvailableLevel &&
                (item.id === lessonId
                  ? false
                  : !item.is_finished);
              return (
                <Accordion
                  key={`${item.id}-lesson`}
                  onChange={(_, expanded) => {
                    if (expanded) {
                      onSelectLesson(item);
                    }
                  }}
                  expanded={isActive}
                  disabled={disabled}
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
                            {item.title}
                          </Typography>
                          <Typography
                            {...typographyProps}
                          >{`Видео - ${moment(item.duration, TIME_FORMAT).format("HH:mm")}`}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                    >
                      {item.description ??
                        "Нет описания"}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            },
          )}
          {courseLevels.exam && (
            <Accordion
              key={`${courseLevels.exam.id}-exam`}
              onChange={(_, expanded) => {
                if (expanded) {
                  onSelectExam();
                }
              }}
              expanded={isExam}
              disabled={!isAvailableLevel}
            >
              <AccordionSummary>
                <Box className={"flex_box"}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color="#A3A3A3"
                    minWidth="33px"
                  >
                    {courseLevels.lessons.length +
                      1}
                  </Typography>
                  <Box
                    className={"flex_box"}
                    sx={{ gap: "8px" }}
                  >
                    <Image
                      src={
                        isExam
                          ? starCirclePrimaryIcon
                          : starCircleGrayIcon
                      }
                      alt={`star circle ${isExam ? "green" : "gray"} icon`}
                      width={24}
                      height={24}
                    />
                    <Box>
                      <Typography
                        {...typographyProps}
                        fontWeight={
                          isExam ? 600 : 400
                        }
                      >
                        {courseLevels.exam.title}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Fragment>
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                  >
                    {`Необходимый минимум
                        баллов: ${courseLevels.exam.pass_points}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                  >{`Время на экзамен: ${getAllMinutes(courseLevels.exam.duration)} мин.`}</Typography>
                </Fragment>
              </AccordionDetails>
            </Accordion>
          )}
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
