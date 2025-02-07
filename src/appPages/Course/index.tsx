"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
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
import { getYouTubeVideoId } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import {
  setCourse,
  setLoading,
} from "@/shared/model";
import { ICourseDetail } from "@/shared/types";

import styles from "./styles.module.scss";
import CourseProgram from "./ui/CourseProgram";

interface ICourseOverviewPageProps {
  courseId: string;
}

export function CourseOverviewPage({
  courseId,
}: ICourseOverviewPageProps) {
  const t = useTranslations("CourseOverviewPage");
  const router = useAppRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(
    (store) => store.user.profile,
  );
  const { course, loading } = useAppSelector(
    (store) => store.course,
  );

  const [processing, setProcessing] =
    useState(false);

  function onClickStudy() {
    if (course && !processing) {
      if (!profile) {
        return router.push("signIn");
      }
      if (course.is_learning) {
        router.push("study", {
          dynamicPaths: { course: course.id },
        });
      } else {
        setProcessing(true);
        axiosInstance
          .post("/academy/start_learning/", {
            course: course.id,
          })
          .then((res) => {
            if (res?.data?.message) {
              router.push("study", {
                dynamicPaths: {
                  course: course.id,
                },
              });
            }
          })
          .finally(() => setProcessing(false));
      }
    }
  }

  useEffect(() => {
    dispatch(setLoading(true));
    axiosInstance
      .get<ICourseDetail>(
        `/academy/course_detail/${courseId}`,
      )
      .then((res) => {
        if (res?.data) {
          dispatch(setCourse(res.data));
        }
      })
      .finally(() => {
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
        header={t("opisanie")}
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
            ? t("podozhdite")
            : course.is_learning
              ? t("prodolzhit-obuchenie")
              : t("nachat-uchitsya")}
        </Button>
      </Box>
    </Box>
  ) : null;
  return course ? (
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
              {t("chemu-vy-nauchites")}
            </Typography>
            {course.objectives ? (
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
                        className={
                          styles.objective
                        }
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
            ) : (
              <Typography
                variant="h6"
                color="textSecondary"
                textAlign="center"
              >
                {t("net-dannykh")}
              </Typography>
            )}
            <Typography
              variant="h4"
              color="primary"
              textAlign="center"
              fontWeight={700}
              sx={{
                marginTop: SECTION_MARGIN_TOP,
              }}
            >
              {t("programma-kursa")}
            </Typography>
            <CourseProgram course={course} />
          </Box>
        </Box>
      )}
      <Footer />
    </Box>
  ) : null;
}
