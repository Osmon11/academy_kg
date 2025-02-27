import { useTranslations } from "next-intl";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { TubeSpinner } from "@/shared/UI";
import { SECTION_MARGIN_TOP } from "@/shared/config/const";
import {
  useAppRouter,
  usePaginatedData,
} from "@/shared/hooks";
import { ICourseListItem } from "@/shared/types";

export default function CourseListContainer({
  title,
  courseType,
}: {
  title: string;
  courseType: number;
}) {
  const router = useAppRouter();
  const t = useTranslations(
    "CourseListContainer",
  );

  const { data, loading } =
    usePaginatedData<ICourseListItem>({
      endpoint: "/academy/course_list/",
      searchParams: {
        course_type: courseType,
      },
      hasNextPage: false,
    });
  return (
    <Box sx={{ marginTop: SECTION_MARGIN_TOP }}>
      <Box className="list_header">
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          {title}
        </Typography>
        <Button
          variant="outlined"
          onClick={() =>
            router.push("searchCourses", {
              queryParams: { title, courseType },
            })
          }
          sx={{ textTransform: "initial" }}
        >
          {t("posmotret-vse")}
        </Button>
      </Box>
      <Box className={"courses_wrapper"}>
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
    </Box>
  );
}
