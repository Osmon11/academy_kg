"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { CourseCard } from "@/features/CourseCard";

import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  ICourseListItem,
  IPaginatedList,
} from "@/shared/types";

import styles from "../styles.module.scss";

export default function AcademyCoreProgram() {
  const [courses, setCourses] = useState<
    ICourseListItem[]
  >([]);

  useEffect(() => {
    axiosInstance
      .get<
        IPaginatedList<ICourseListItem>
      >("/academy/course_list/?course_type=5")
      .then((res) => {
        if (Array.isArray(res.data?.results)) {
          setCourses(res.data.results);
        }
      });
  }, []);
  return (
    <Box className={styles.core_program_wrapper}>
      <Typography
        variant="h5"
        fontWeight={700}
        textAlign="center"
      >
        Базовая программа Академии
      </Typography>
      <Carousel>
        {courses.map((item) => (
          <Box
            key={item.id}
            sx={{
              height: "auto",
              padding: "20px 10px",
            }}
          >
            <CourseCard course={item} />
          </Box>
        ))}
      </Carousel>
      <Box className={styles.certificate_wrapper}>
        <Paper
          className={styles.card}
          elevation={0}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            color="secondary"
          >
            Аттестат от Академии
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="textSecondary"
            sx={{ marginTop: "16px" }}
          >
            Пройдите все 7 курсов, сдайте зачёты и
            итоговый экзамен и получите аттестат о
            начальном исламском образовании
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
