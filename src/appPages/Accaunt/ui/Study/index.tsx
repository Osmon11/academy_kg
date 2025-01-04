import { Fragment } from "react";

import { Box } from "@mui/material";

import { GoBackHeader } from "@/entities/GoBackHeader";

import { createAxiosInstanceForSSR } from "@/shared/config/axiosServerInstance";
import {
  ICourseDetail,
  ICourseLevelDetail,
} from "@/shared/types";

import styles from "../styles.module.scss";

interface IStudyPageProps {
  courseId: string;
}

export async function StudyPage({
  courseId,
}: IStudyPageProps) {
  try {
    const axiosInstance =
      await createAxiosInstanceForSSR();
    const courseDetail = await axiosInstance
      .get<ICourseDetail>(
        `/academy/course_detail/${courseId}`,
      )
      .then((res) => res.data);
    const courseLevelDetail = await axiosInstance
      .get<ICourseLevelDetail>(
        `/academy/course_level_detail/${courseId}`,
      )
      .then((res) => res.data);
    console.log(courseLevelDetail);

    return (
      <Fragment>
        <GoBackHeader
          title={courseDetail.title}
        />
        <Box className={styles.page}>
          <Box className={styles.lesson_wrapper}>
            <video />
            <Box></Box>
          </Box>
        </Box>
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
