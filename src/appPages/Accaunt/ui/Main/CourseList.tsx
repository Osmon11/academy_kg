"use client";

import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { ICourseListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function CourseList() {
  const [courses, setCourses] = useState<
    ICourseListItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{
        results: ICourseListItem[];
      }>("/academy/course_list/")
      .then((res) => {
        if (res?.data) {
          setCourses(res.data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Box className={styles.courses_wrapper}>
      {loading ? (
        <Box className="tube_spinner_wrapper">
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))
      ) : (
        <Typography
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
          sx={{ margin: "12px 0px" }}
        >
          Нет курсов
        </Typography>
      )}
    </Box>
  );
}
