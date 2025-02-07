"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { CurrentCourseCard } from "@/features/CurrentCourseCard";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { IMyCourseListItem } from "@/shared/types";

import CourseList from "./CourseList";
import RecommendationsCarousel from "./RecommendationsCarousel";

export function AccauntMainPage() {
  const t = useTranslations("AccauntMainPage");
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
    <Box className={"bg_gray"}>
      <Header background="white" />
      <Box
        className={classNames(
          "page",
          "full_height",
        )}
        sx={{
          marginTop: { xs: "72px", md: "80px" },
        }}
      >
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          {t("rekomendacii")}
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <RecommendationsCarousel />
        </Box>
        {currentCourses.length > 0 ? (
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              color="textSecondary"
              fontWeight={700}
            >
              {t("prodolzhit-obuchenie")}
            </Typography>
            <Box className={"courses_wrapper"}>
              {currentCourses.map((item) =>
                item.detail ? (
                  <CurrentCourseCard
                    key={item.id}
                    course={item}
                  />
                ) : null,
              )}
            </Box>
          </Box>
        ) : null}
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
          sx={{ marginTop: "40px" }}
        >
          {t("vyberite-kurs")}
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <CourseList />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
