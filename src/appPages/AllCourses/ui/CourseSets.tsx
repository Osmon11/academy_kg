import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SetOfCoursesCard } from "@/features/SetOfCoursesCard";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { ISetOfCourses } from "@/shared/types";

export default function CourseSets() {
  const t = useTranslations("CourseSets");

  const { data, loading } =
    usePaginatedData<ISetOfCourses>({
      endpoint: "/academy/course_sets/list/",
      hasNextPage: false,
    });
  return (
    <Box sx={{ marginTop: "20px" }}>
      {loading ? (
        <Box className={"tube_spinner_wrapper"}>
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : data && data.results.length > 0 ? (
        <Carousel options={{ align: "start" }}>
          {data.results.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: "auto",
                height: "auto",
                paddingRight: "20px",
              }}
            >
              <SetOfCoursesCard
                setOfCourses={item}
              />
            </Box>
          ))}
        </Carousel>
      ) : (
        <Typography
          width="100%"
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
          sx={{ margin: "12px 0px" }}
        >
          {t("net-naborov")}
        </Typography>
      )}
    </Box>
  );
}
