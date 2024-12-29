import { Fragment } from "react";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import {
  ICourseListItem,
  IRecommendationListItem,
} from "@/shared/types";

import logoIcon from "@/icons/logo.svg";

import courseImg from "@/backgrounds/course.png";
import recommendationBg from "@/backgrounds/recommendation.png";

import styles from "../styles.module.scss";
import CourseList from "./CourseList";
import Recommendations from "./Recommendations";

const recommendations: IRecommendationListItem[] =
  [
    {
      id: 1,
      title: "Новые курсы",
      description: "от академии",
      image: recommendationBg.src,
      logo: logoIcon,
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

export function AccauntMainPage() {
  return (
    <Fragment>
      <Header background="white" />
      <Box className={styles.page}>
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          Рекомендации
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Recommendations
            recommendations={recommendations}
          />
        </Box>
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
          sx={{ marginTop: "40px" }}
        >
          Выберите курс
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <CourseList courses={courses} />
        </Box>
      </Box>
      <Footer />
    </Fragment>
  );
}
