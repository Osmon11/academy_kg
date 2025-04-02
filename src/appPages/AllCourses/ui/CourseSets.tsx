import { useTranslations } from "next-intl";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SetOfCoursesCard } from "@/features/SetOfCoursesCard";

import { TubeSpinner } from "@/shared/UI";
import { CAROUSEL_ITEM_BOX } from "@/shared/config/const";
import {
  useAppRouter,
  usePaginatedData,
} from "@/shared/hooks";
import { ISetOfCourses } from "@/shared/types";

export default function CourseSets() {
  const router = useAppRouter();
  const t = useTranslations("CourseSets");

  const { data, loading } =
    usePaginatedData<ISetOfCourses>({
      endpoint: "/academy/course_sets/list/",
      hasNextPage: false,
    });
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box className="list_header">
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          {t("nabory-kursov")}
        </Typography>
        <Button
          variant="outlined"
          onClick={() =>
            router.push("courseSets")
          }
          sx={{ textTransform: "initial" }}
        >
          {t("posmotret-vse")}
        </Button>
      </Box>
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
                  ...CAROUSEL_ITEM_BOX,
                  paddingBottom: "5px",
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
    </Box>
  );
}
