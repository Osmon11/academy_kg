"use client";

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
import ArabLanguage from "./ui/ArabLanguage";
import BasicsOfIslam from "./ui/BasicsOfIslam";
import CourseSets from "./ui/CourseSets";
import LifeOfTheProphet from "./ui/LifeOfTheProphet";
import NewCourses from "./ui/NewCourses";

export function AllCoursesPage() {
  const router = useAppRouter();
  const [search, setSearch] = useState("");

  useEffect(() => () => setSearch(""), []);

  const headerProps = {
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
        className={"page"}
        sx={{
          marginTop: { xs: "72px", md: "80px" },
        }}
      >
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
          {...headerProps}
          sx={{ marginTop: "20px" }}
        >
          Наборы курсов
        </Typography>
        <CourseSets />
        <Typography
          {...headerProps}
          sx={{ marginTop: "20px" }}
        >
          Новинки
        </Typography>
        <NewCourses />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          Основы Ислама
        </Typography>
        <BasicsOfIslam />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          Жизнеописание пророка
        </Typography>
        <LifeOfTheProphet />
        <AcademyCoreProgram />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          Арабский язык
        </Typography>
        <ArabLanguage />
      </Box>
      <Footer />
    </Box>
  );
}
