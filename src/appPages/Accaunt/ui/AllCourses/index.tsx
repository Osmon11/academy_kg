"use client";

import { useRouter } from "next/navigation";
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
import { routePath } from "@/shared/functions";

import commonStyles from "../styles.module.scss";
import AcademyCoreProgram from "./AcademyCoreProgram";
import ArabLanguage from "./ArabLanguage";
import BasicsOfIslam from "./BasicsOfIslam";
import CourseSets from "./CourseSets";
import LifeOfTheProphet from "./LifeOfTheProphet";
import NewCourses from "./NewCourses";

export function AllCoursesPage() {
  const router = useRouter();
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
    <Box className={commonStyles.bg_gray}>
      <Header background="white" />
      <Box
        className={commonStyles.page}
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
                  router.push(
                    routePath("searchCourses", {
                      queryParams: { search },
                    }),
                  );
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
