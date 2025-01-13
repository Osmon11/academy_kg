import { Fragment } from "react";

import {
  Box,
  Typography,
  TypographyProps,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import {
  ICourseListItem,
  ISetOfCourses,
} from "@/shared/types";

import courseImg from "@/backgrounds/course.png";
import recommendationBg from "@/backgrounds/recommendation.png";

import styles from "../styles.module.scss";
import ArabLanguage from "./ArabLanguage";
import BasicsOfIslam from "./BasicsOfIslam";
import CourseSets from "./CoursePackages";
import LifeOfTheProphet from "./LifeOfTheProphet";
import NewCourses from "./NewCourses";

const courseSets: ISetOfCourses[] = [
  {
    id: 1,
    title: "Основы ислама",
    description:
      "Фундаментальные принципы и основы веры, которые формируют базовые убеждения",
    image: recommendationBg.src,
    amout_of_courses: 3,
  },
];
const courses: ICourseListItem[] = [
  {
    id: 1,
    title: "Тайны молитвы",
    description:
      'Курс по книге Ибн Каййима аль-Джаузия "Тайны молитвы"',
    teacher: "Карим Салимов",
    image: courseImg.src,
    price: 3490,
  },
];
export async function AllCoursesPage() {
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
          Рекомендации
        </Typography>
        <CourseSets courseSets={courseSets} />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          Новинки
        </Typography>
        <NewCourses courses={courses} />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          Основы Ислама
        </Typography>
        <BasicsOfIslam courses={courses} />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          Жизнеописание пророка
        </Typography>
        <LifeOfTheProphet courses={courses} />
        <Typography
          {...headerProps}
          sx={{ marginTop: "40px" }}
        >
          Арабский язык
        </Typography>
        <ArabLanguage courses={courses} />
      </Box>
      <Footer />
    </Fragment>
  );
}
