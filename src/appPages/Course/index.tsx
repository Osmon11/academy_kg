"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

import {
  Box,
  Button,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { CommentCard } from "@/features/CommentCard";

import { GoBackHeader } from "@/entities/GoBackHeader";
import { TeacherProfileAvatar } from "@/entities/TeacherProfileAvatar";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { SECTION_MARGIN_TOP } from "@/shared/config/const";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import {
  getYouTubeVideoId,
  routePath,
} from "@/shared/functions";
import {
  setCourse,
  setCourseLevels,
  setLoading,
} from "@/shared/model";
import {
  ICourseDetail,
  ICourseLevelDetail,
} from "@/shared/types";

import styles from "./styles.module.scss";
import CourseProgram from "./ui/CourseProgram";

interface ICourseOverviewPageProps {
  courseId: string;
}

export function CourseOverviewPage({
  courseId,
}: ICourseOverviewPageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(
    (store) => store.user.profile,
  );
  const { course, courseLevels, loading } =
    useAppSelector((store) => store.course);
  const [processing, setProcessing] =
    useState(false);

  function onClickStudy() {
    if (course && !processing) {
      if (!profile) {
        return router.push(routePath("signIn"));
      }
      if (course.is_learning) {
        router.push(
          routePath("study", {
            id: course.id,
          }),
        );
      }
      {
        setProcessing(true);
        axiosInstance
          .post("/academy/start_learning/", {
            course: course.id,
          })
          .then((res) => {
            if (res?.data?.course) {
              router.push(
                routePath("study", {
                  id: course.id,
                }),
              );
            }
          })
          .finally(() => setProcessing(false));
      }
    }
  }

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

  const onlyXs = useMediaQuery((theme) =>
    theme.breakpoints.only("xs"),
  );
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const upLg = useMediaQuery((theme) =>
    theme.breakpoints.up("lg"),
  );
  const Video = course ? (
    <YouTube
      className={styles.video}
      videoId={getYouTubeVideoId(course.trailer)}
    />
  ) : null;
  const Description = course ? (
    <Box className={styles.description_wrapper}>
      <CommentCard
        className={styles.description}
        header="Описание:"
        comment={course.description}
      />
      <Box
        className={styles.actions}
        sx={{ marginTop: "20px" }}
      >
        <TeacherProfileAvatar
          fullnameColor="secondary"
          {...course.teacher}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={onClickStudy}
          size={onlyXs ? "large" : "medium"}
          sx={{
            width: {
              xs: "100%",
              sm: "300px",
            },
            textTransform: "none",
          }}
          disabled={processing}
        >
          {processing
            ? "Подождите..."
            : course.is_learning
              ? "Продолжить обучение"
              : "Начать учиться"}
        </Button>
      </Box>
    </Box>
  ) : null;
  return course && courseLevels ? (
    <Box className={"bg_gray"}>
      <GoBackHeader title={course.title} />
      {loading ? (
        <Box
          className={"tube_spinner_wrapper"}
          sx={{
            minHeight: "calc(100vh - 225px)",
          }}
        >
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        <Box
          className={classNames({
            ["page"]: upMd,
          })}
        >
          {upLg ? (
            <Box className={styles.wrapper}>
              {Video}
              {Description}
            </Box>
          ) : (
            Video
          )}
          <Box
            className={classNames({
              ["page"]: !upMd,
            })}
          >
            {!upLg && Description}
            <Typography
              variant="h4"
              color="primary"
              textAlign="center"
              fontWeight={700}
              sx={{
                marginTop: SECTION_MARGIN_TOP,
              }}
            >
              Чему вы научитесь
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ marginTop: "20px" }}
            >
              {course.objectives.map(
                (objective) => (
                  <Grid
                    key={objective.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                      lg: 3,
                    }}
                  >
                    <Box
                      className={styles.objective}
                    >
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
                ),
              )}
            </Grid>
            <Typography
              variant="h4"
              color="primary"
              textAlign="center"
              fontWeight={700}
              sx={{
                marginTop: SECTION_MARGIN_TOP,
              }}
            >
              Программа курса
            </Typography>
            <CourseProgram course={course} />
          </Box>
        </Box>
      )}
      <Footer />
    </Box>
  ) : null;
}
