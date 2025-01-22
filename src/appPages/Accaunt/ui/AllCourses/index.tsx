import { Fragment } from "react";

import {
  Box,
  Typography,
  TypographyProps,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import styles from "../styles.module.scss";
import AcademyCoreProgram from "./AcademyCoreProgram";
import ArabLanguage from "./ArabLanguage";
import BasicsOfIslam from "./BasicsOfIslam";
import CourseSets from "./CourseSets";
import LifeOfTheProphet from "./LifeOfTheProphet";
import NewCourses from "./NewCourses";

export function AllCoursesPage() {
  const headerProps = {
    variant: "h5" as TypographyProps["variant"],
    color: "textSecondary",
    fontWeight: 700,
  };
  return (
    <Fragment>
      <Header background="white" />
      <Box
        className={styles.page}
        sx={{ marginTop: "80px" }}
      >
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
    </Fragment>
  );
}
