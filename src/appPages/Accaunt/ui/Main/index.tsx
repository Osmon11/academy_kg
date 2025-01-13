import { Fragment } from "react";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import styles from "../styles.module.scss";
import CourseList from "./CourseList";
import Recommendations from "./Recommendations";

export function AccauntMainPage() {
  return (
    <Fragment>
      <Header background="white" />
      <Box
        className={styles.page}
        sx={{ marginTop: "80px" }}
      >
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          Рекомендации
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Recommendations />
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
          <CourseList />
        </Box>
      </Box>
      <Footer />
    </Fragment>
  );
}
