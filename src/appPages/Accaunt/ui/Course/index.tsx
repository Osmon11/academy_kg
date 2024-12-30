import { Fragment } from "react";

import { Box } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import styles from "../styles.module.scss";

export function CourseOverviewPage() {
  return (
    <Fragment>
      <Header background="white" />
      <Box className={styles.page}></Box>
      <Footer />
    </Fragment>
  );
}
