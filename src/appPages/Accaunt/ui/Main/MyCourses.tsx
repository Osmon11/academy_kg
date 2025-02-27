import { useTranslations } from "next-intl";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { CurrentCourseCard } from "@/features/CurrentCourseCard";

import { TubeSpinner } from "@/shared/UI";
import {
  useAppRouter,
  usePaginatedData,
} from "@/shared/hooks";
import { IMyCourseListItem } from "@/shared/types";

export default function MyCourses() {
  const router = useAppRouter();
  const t = useTranslations("MyCourses");

  const { data, loading } =
    usePaginatedData<IMyCourseListItem>({
      endpoint: "/academy/current_courses/",
      hasNextPage: false,
    });
  return data && data.results ? (
    <Box sx={{ marginTop: "40px" }}>
      <Box className="list_header">
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          {t("prodolzhit-obuchenie")}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.push("myCourses")}
          sx={{ textTransform: "initial" }}
        >
          {t("posmotret-vse")}
        </Button>
      </Box>
      <Box className={"courses_wrapper"}>
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
