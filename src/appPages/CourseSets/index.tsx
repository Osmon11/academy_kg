"use client";

import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { SetOfCoursesCard } from "@/features/SetOfCoursesCard";

import { GoBackHeader } from "@/entities/GoBackHeader";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { ISetOfCourses } from "@/shared/types";

export function CourseSetsPage() {
  const t = useTranslations("CourseSetsPage");
  const {
    sentryRef,
    data,
    loading,
    hasNextPage,
  } = usePaginatedData<ISetOfCourses>({
    endpoint: "/academy/course_sets/list/",
  });

  return (
    <Box className="bg_gray">
      <GoBackHeader title={t("nabory-kursov")} />
      <Box className="page full_height">
        <Box className="courses_wrapper">
          {data &&
            data.results.length > 0 &&
            data.results.map((item) => (
              <SetOfCoursesCard
                key={item.id}
                setOfCourses={item}
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
                {t("net-naborov")}
              </Typography>
            )
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
