"use client";

import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { SECTION_MARGIN_TOP } from "@/shared/config/const";
import { ICourseListItem } from "@/shared/types";

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<ICourseListItem[]>([]);
  useEffect(() => {
    axiosInstance
      .get<{
        results: ICourseListItem[];
      }>("/academy/recommendation_courses/")
      .then((res) => {
        if (res?.data) {
          setRecommendations(res.data.results);
        }
      });
  }, []);
  return (
    <Box sx={{ marginTop: SECTION_MARGIN_TOP }}>
      <Typography
        variant="h5"
        color="textSecondary"
        fontWeight={700}
      >
        Рекомендации
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        {recommendations.length > 0 ? (
          recommendations.map((course) => (
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
          >
            Пока нет рекомендаций
          </Typography>
        )}
        {/* {data && (
          <Typography
            ref={ref}
            textAlign="center"
            color="textSecondary"
          >
            {isFetchingNextPage
              ? "Загрузка..."
              : hasNextPage
                ? "Прокрутите, чтобы загрузить больше"
                : "Нет больше рекомендаций"}
          </Typography>
        )} */}
      </Box>
    </Box>
  );
}
