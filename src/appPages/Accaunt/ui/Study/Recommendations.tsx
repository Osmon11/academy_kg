"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Box, Typography } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  PAGINATION_LIMIT,
  SECTION_MARGIN_TOP,
} from "@/shared/config/const";
import { ICourseListItem } from "@/shared/types";

export default function Recommendations() {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["recommendations"],
    queryFn: ({
      pageParam = 0,
    }): Promise<ICourseListItem[]> => {
      return axiosInstance
        .get(
          `/academy/recommendation_courses?${queryString.stringify(
            {
              page: pageParam,
              page_size: PAGINATION_LIMIT,
            },
          )}`,
        )
        .then((res) => res.data?.results);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGINATION_LIMIT
        ? allPages.length * PAGINATION_LIMIT
        : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isError) {
      fetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    fetchNextPage,
    isError,
  ]);
  return (
    <Box sx={{ marginTop: SECTION_MARGIN_TOP }}>
      <Typography
        variant="h5"
        fontWeight={700}
      >
        Рекомендации
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        {data ? (
          data.pages.flat().map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))
        ) : (
          <Typography textAlign="center">
            Пока нет ракомендаций
          </Typography>
        )}
        {data && (
          <Typography
            ref={ref}
            textAlign="center"
          >
            {isFetchingNextPage
              ? "Загрузка..."
              : hasNextPage
                ? "Прокрутите, чтобы загрузить больше"
                : "Нет больше рекомендаций"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
