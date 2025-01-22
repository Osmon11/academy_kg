"use client";

import {
  Fragment,
  useEffect,
  useState,
} from "react";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { CurrentCourseCard } from "@/features/CurrentCourseCard";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { IMyCourseListItem } from "@/shared/types";

import styles from "../styles.module.scss";
import CourseList from "./CourseList";
import Recommendations from "./Recommendations";

export function AccauntMainPage() {
  const [currentCourses, setCurrentCourses] =
    useState<IMyCourseListItem[]>([]);

  useEffect(() => {
    axiosInstance
      .get<{
        results: IMyCourseListItem[];
      }>("/academy/current_courses/")
      .then((res) => {
        if (res?.data) {
          setCurrentCourses(res.data.results);
        }
      });
  }, []);
  return (
    <Fragment>
      <Header background="white" />
      <Box
        className={styles.page}
        sx={{ marginTop: "80px" }}
      >
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          Рекомендации
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Recommendations />
        </Box>
        {currentCourses.length > 0 ? (
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              color="textSecondary"
              fontWeight={700}
            >
              Продолжить обучение
            </Typography>
            <Box
              className={styles.courses_wrapper}
            >
              {currentCourses.map((item) => (
                <CurrentCourseCard
                  key={item.id}
                  course={item}
                />
              ))}
            </Box>
          </Box>
        ) : null}
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
          sx={{ marginTop: "40px" }}
        >
          Выберите курс
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <CourseList />
        </Box>
      </Box>
      <Footer />
    </Fragment>
  );
}
