"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  TypographyProps,
  useMediaQuery,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { SearchTextField } from "@/shared/UI";
import { useAppRouter } from "@/shared/hooks/useAppRouter";

import AcademyCoreProgram from "./ui/AcademyCoreProgram";
import CourseListContainer from "./ui/CourseListContainer";
import CourseSets from "./ui/CourseSets";

export function AllCoursesPage() {
  const t = useTranslations("AllCoursesPage");
  const router = useAppRouter();
  const [search, setSearch] = useState("");

  useEffect(() => () => setSearch(""), []);

  const headerProps = {
    className: "page_paddings",
    variant: "h5" as TypographyProps["variant"],
    color: "textSecondary",
    fontWeight: 700,
  };
  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  return (
    <Box className={"bg_gray"}>
      <Header background="white" />
      <Box
        sx={{
          marginTop: { xs: "72px", md: "80px" },
        }}
      >
        <Box className={"page"}>
          {upSm && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SearchTextField
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    search
                  ) {
                    router.push("searchCourses", {
                      queryParams: { search },
                    });
                  }
                }}
                color="white"
              />
            </Box>
          )}
          <Typography
            variant={headerProps.variant}
            color={headerProps.color}
            fontWeight={headerProps.fontWeight}
            sx={{ marginTop: "20px" }}
          >
            {t("nabory-kursov")}
          </Typography>
          <CourseSets />
        </Box>
        <Typography
          {...headerProps}
          sx={{ marginTop: "20px" }}
        >
          {t("novinki")}
        </Typography>
        <CourseListContainer courseType={1} />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          {t("osnovy-islama")}
        </Typography>
        <CourseListContainer courseType={2} />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          {t("zhizneopisanie-proroka")}
        </Typography>
        <CourseListContainer courseType={3} />
        <AcademyCoreProgram />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          {t("arabskii-yazyk")}
        </Typography>
        <CourseListContainer courseType={4} />
      </Box>
      <Footer />
    </Box>
  );
}
