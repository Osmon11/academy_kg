"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { ICourseListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function CourseList() {
  const [courses, setCourses] = useState<
    ICourseListItem[]
  >([]);
  useEffect(() => {
    axiosInstance
      .get<{
        results: ICourseListItem[];
      }>("/academy/course_list/")
      .then((res) => {
        if (res?.data) {
          setCourses(res.data.results);
        }
      });
  }, []);
  return (
    <Box className={styles.courses_wrapper}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </Box>
  );
}
