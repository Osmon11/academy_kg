"use client";

import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { CurrentCourseCard } from "@/features/CurrentCourseCard";

import { GoBackHeader } from "@/entities/GoBackHeader";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { IMyCourseListItem } from "@/shared/types";

export function MyCoursesPage() {
  const t = useTranslations("MyCoursesPage");
  const {
    sentryRef,
    data,
    loading,
    hasNextPage,
  } = usePaginatedData<IMyCourseListItem>({
    endpoint: "/academy/current_courses/",
  });

  return (
    <Box className="bg_gray">
      <GoBackHeader title={t("moi-kursy")} />
      <Box className="page full_height">
        <Box className="courses_wrapper">
          {data &&
            data.results.length > 0 &&
            data.results.map((course) => (
              <CurrentCourseCard
                key={course.id}
                course={course}
              />
            ))}
          {loading || hasNextPage ? (
            <Box
              className={"tube_spinner_wrapper"}
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
      </Box>
      <Footer />
    </Box>
  );
}
