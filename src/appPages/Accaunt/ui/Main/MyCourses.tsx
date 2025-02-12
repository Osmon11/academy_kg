import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { CurrentCourseCard } from "@/features/CurrentCourseCard";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { IMyCourseListItem } from "@/shared/types";

export default function MyCourses() {
  const t = useTranslations("MyCourses");

  const { sentryRef, data, loading } =
    usePaginatedData<IMyCourseListItem>({
      endpoint: "/academy/current_courses/",
    });
  return data && data.results ? (
    <Box sx={{ marginTop: "40px" }}>
      <Typography
        variant="h5"
        color="textSecondary"
        fontWeight={700}
        className="page_paddings"
      >
        {t("prodolzhit-obuchenie")}
      </Typography>
      <Box
        className={"current_courses"}
        ref={sentryRef}
      >
        {data.results.map((item) =>
          item.detail ? (
            <CurrentCourseCard
              key={item.id}
              course={item}
            />
          ) : null,
        )}
        {loading && (
          <Box className={"tube_spinner_wrapper"}>
            <TubeSpinner
              width={50}
              height={50}
            />
          </Box>
        )}
      </Box>
    </Box>
  ) : null;
}
