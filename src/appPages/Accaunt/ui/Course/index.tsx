"use client";

import moment from "moment";
import Image from "next/image";
import { Fragment, useEffect } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { CommentCard } from "@/features/CommentCard";

import { GoBackHeader } from "@/entities/GoBackHeader";
import { TeacherProfileAvatar } from "@/entities/TeacherProfileAvatar";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { TIME_FORMAT } from "@/shared/config/const";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import {
  setCourse,
  setCourseLevels,
  setLoading,
} from "@/shared/model";
import {
  ICourseDetail,
  ICourseLevelDetail,
} from "@/shared/types";

import arrowDownBlackIcon from "@/icons/arrow-down-black.svg";

import styles from "../styles.module.scss";
import OverviewLessons from "./OverviewLessons";
import StartStudying from "./StartStudying";

interface ICourseOverviewPageProps {
  courseId: string;
}

export function CourseOverviewPage({
  courseId,
}: ICourseOverviewPageProps) {
  const dispatch = useAppDispatch();
  const { course, courseLevels } = useAppSelector(
    (store) => store.course,
  );
  useEffect(() => {
    dispatch(setLoading(true));
    Promise.all([
      axiosInstance
        .get<ICourseDetail>(
          `/academy/course_detail/${courseId}`,
        )
        .then((res) => {
          if (res?.data) {
            dispatch(setCourse(res.data));
          }
        }),
      axiosInstance
        .get<ICourseLevelDetail>(
          `/academy/course_level_detail/${courseId}`,
        )
        .then((res) => {
          if (res?.data) {
            dispatch(setCourseLevels(res.data));
          }
        }),
    ]).finally(() => {
      dispatch(setLoading(false));
    });
  }, [dispatch, courseId]);
  const durationTime = moment(
    course ? course.duration_count : "02:45:00",
    TIME_FORMAT,
  );
  const hours = durationTime.hours();
  const minutes = durationTime.minutes();
  return course && courseLevels ? (
    <Fragment>
      <GoBackHeader title={course.title} />
      <Box className={styles.page}>
        <Box className={styles.course_heading}>
          <iframe
            src={course.trailer}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
          <CommentCard
            header="Описание:"
            comment={course.description}
            sx={{
              width: "100% !important",
              marginTop: "20px",
            }}
          />
          <Box
            className={styles.actions}
            sx={{ marginTop: "20px" }}
          >
            <TeacherProfileAvatar
              fullnameColor="secondary"
              {...course.teacher}
            />
            <StartStudying courseId={courseId} />
          </Box>
        </Box>
        <Typography
          variant="h4"
          color="primary"
          textAlign="center"
          fontWeight={700}
          sx={{ marginTop: "40px" }}
        >
          Чему вы научитесь
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: "40px" }}
        >
          {course.objectives.map((objective) => (
            <Grid
              key={objective.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Box className={styles.objective}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  textAlign="center"
                  lineHeight="24px"
                >
                  {objective.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="h4"
          color="primary"
          textAlign="center"
          fontWeight={700}
          sx={{ marginTop: "40px" }}
        >
          Программа курса
        </Typography>
        {course.lesson_count && (
          <Typography
            variant="h5"
            color="primary"
            textAlign="center"
            fontWeight={500}
            sx={{ marginTop: "20px" }}
          >
            {`${course.lesson_count} лекций, ${hours ? hours + " часов" : ""} ${minutes} минут`}
          </Typography>
        )}
        <Accordion
          elevation={0}
          sx={{
            marginTop: "40px",
            "::before": {
              top: "unset",
              bottom: "-1px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Image
                src={arrowDownBlackIcon}
                alt="arrow up black icon"
                width={30}
                height={30}
              />
            }
            sx={{ padding: "0px" }}
          >
            <Box>
              <Typography
                variant="h5"
                color="textSecondary"
                fontWeight={600}
              >
                Уроки
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
              >{`${course.lesson_count} уроков`}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            <OverviewLessons
              lessons={courseLevels.lessons}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
      <Footer />
    </Fragment>
  ) : null;
}
