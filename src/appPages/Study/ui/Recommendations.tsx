"use client";

import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { ICourseListItem } from "@/shared/types";

export default function Recommendations() {
  const t = useTranslations("Recommendations");

  const { sentryRef, data, loading } =
    usePaginatedData<ICourseListItem>({
      endpoint:
        "/academy/recommendation_courses/",
    });
  return (
    <Box className={"page"}>
      <Typography
        variant="h5"
        color="textSecondary"
        fontWeight={700}
      >
        {t("rekomendacii")}
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <Box
          className={"courses_wrapper"}
          ref={sentryRef}
        >
          {data &&
            data.results.length > 0 &&
            data.results.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          {loading ? (
            <Box
              className={"tube_spinner_wrapper"}
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
                textAlign="center"
                color="textSecondary"
                fontWeight={600}
              >
                {t("poka-net-rekomendacii")}
              </Typography>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}
