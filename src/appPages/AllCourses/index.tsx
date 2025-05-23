"use client";

import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";

import { Box } from "@mui/material";

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

  return (
    <Fragment>
      <Header background="white" />
      <main className="page full_height">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
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
        <CourseSets />
        <CourseListContainer
          title={t("novinki")}
          courseType={1}
        />
        <CourseListContainer
          title={t("osnovy-islama")}
          courseType={2}
        />
        <CourseListContainer
          title={t("zhizneopisanie-proroka")}
          courseType={3}
        />
        <AcademyCoreProgram />
        <CourseListContainer
          title={t("arabskii-yazyk")}
          courseType={4}
        />
      </main>
      <Footer />
    </Fragment>
  );
}
