"use client";

import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { ICourseListItem } from "@/shared/types";

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<ICourseListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{
        results: ICourseListItem[];
      }>("/academy/recommendation_courses/")
      .then((res) => {
        if (res?.data) {
          setRecommendations(res.data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box className={"page"}>
      <Typography
        variant="h5"
        color="textSecondary"
        fontWeight={700}
      >
        Рекомендации
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        {loading ? (
          <Box className={"tube_spinner_wrapper"}>
            <TubeSpinner
              width={50}
              height={50}
            />
          </Box>
        ) : recommendations.length > 0 ? (
          <Box className={"courses_wrapper"}>
            {recommendations.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </Box>
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
