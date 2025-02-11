import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { ICourseListItem } from "@/shared/types";

export default function CourseListContainer({
  courseType,
}: {
  courseType: number;
}) {
  const t = useTranslations("CourseList");

  const { sentryRef, data, loading } =
    usePaginatedData<ICourseListItem>({
      endpoint: "/academy/course_list/",
      searchParams: {
        course_type: courseType,
      },
    });
  return (
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
        <Box className={"tube_spinner_wrapper"}>
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
            sx={{ margin: "12px 0px" }}
          >
            {t("net-kursov")}
          </Typography>
        )
      )}
    </Box>
  );
}
