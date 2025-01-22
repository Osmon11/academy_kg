"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  ICourseListItem,
  IPaginatedList,
} from "@/shared/types";

import styles from "../styles.module.scss";

export default function ArabLanguage() {
  const [courses, setCourses] = useState<
    ICourseListItem[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<IPaginatedList<ICourseListItem>>(
        "/academy/course_list/?course_type=1",
      )
      .then((res) => {
        if (Array.isArray(res.data?.results)) {
          setCourses(res.data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Box className={styles.courses_wrapper}>
      {loading ? (
        <Box
          className={styles.tube_spinner_wrapper}
        >
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))
      )}
    </Box>
  );
}
