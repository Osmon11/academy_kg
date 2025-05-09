"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { CourseCard } from "@/features/CourseCard";

import { GoBackHeader } from "@/entities/GoBackHeader";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { ICourseListItem } from "@/shared/types";

export function RecommendationsPage() {
  const t = useTranslations(
    "RecommendationsPage",
  );
  const {
    sentryRef,
    data,
    loading,
    hasNextPage,
  } = usePaginatedData<ICourseListItem>({
    endpoint: "/academy/recommendation_courses/",
  });

  return (
    <Fragment>
      <GoBackHeader title={t("rekomendacii")} />
      <main className="page full_height">
        <Box className="courses_wrapper">
          {data &&
            data.results.length > 0 &&
            data.results.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          {loading || hasNextPage ? (
            <Box
              className="tube_spinner_wrapper"
              ref={sentryRef}
            >
              <TubeSpinner
                width={50}
                height={50}
              />
            </Box>
          ) : (
            Boolean(
              !data || data.results.length === 0,
            ) && (
              <Typography
                width="100%"
                textAlign="center"
                color="textSecondary"
                fontWeight={600}
              >
                {t("net-kursov")}
              </Typography>
            )
          )}
        </Box>
      </main>
      <Footer />
    </Fragment>
  );
}
