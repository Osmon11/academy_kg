import moment from "moment";
import Image from "next/image";
import { Fragment } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid2 as Grid,
  Typography,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { CommentCard } from "@/features/CommentCard";

import { GoBackHeader } from "@/entities/GoBackHeader";
import { TeacherProfileAvatar } from "@/entities/TeacherProfileAvatar";

import { createAxiosInstanceForSSR } from "@/shared/config/axiosServerInstance";
import { TIME_FORMAT } from "@/shared/config/const";
import { ICourseDetail } from "@/shared/types";

import arrowUpBlackIcon from "@/icons/arrow-up-black.svg";

import styles from "../styles.module.scss";

interface ICourseOverviewPageProps {
  courseId: string;
}

export async function CourseOverviewPage({
  courseId,
}: ICourseOverviewPageProps) {
  try {
    const axiosInstance =
      await createAxiosInstanceForSSR();
    const courseDetail = await axiosInstance
      .get<ICourseDetail>(
        `/academy/course_detail/${courseId}`,
      )
      .then((res) => res.data);
    // const courseLevelDetail = await axiosInstance
    //   .get<ICourseLevelDetail>(
    //     `/academy/course_level_detail/${courseId}`,
    //   )
    //   .then((res) => res.data);
    const durationTime = moment(
      courseDetail.duration_count,
      TIME_FORMAT,
    );
    return (
      <Fragment>
        <GoBackHeader
          title={courseDetail.title}
        />
        <Box className={styles.page}>
          <Box className={styles.course_heading}>
            <video />
            <CommentCard
              header="Описание:"
              comment={courseDetail.description}
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
                {...courseDetail.teacher}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: "300px" }}
              >
                Начать учиться
              </Button>
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
            {courseDetail.objectives.map(
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
            sx={{ marginTop: "40px" }}
          >
            Программа курса
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            textAlign="center"
            fontWeight={500}
            sx={{ marginTop: "20px" }}
          >
            {`${courseDetail.lesson_count} лекций, ${durationTime.hours()} часов ${durationTime.minutes()} минуты`}
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <Image
                  src={arrowUpBlackIcon}
                  alt="arrow up black icon"
                  width={30}
                  height={30}
                />
              }
              aria-controls="panel1-content"
              id="panel1-header"
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
                >{`${courseDetail.lesson_count} уроков`}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {/* <Lessons
                lessons={
                  courseLevelDetail.lessons
                }
              /> */}
            </AccordionDetails>
          </Accordion>
        </Box>
        <Footer />
      </Fragment>
    );
  } catch (error) {
    console.error(
      "Error fetching course detail:",
      error,
    );
    return (
      <div>Failed to load course detail</div>
    );
  }
}
