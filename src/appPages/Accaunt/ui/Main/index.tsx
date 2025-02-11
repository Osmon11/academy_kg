"use client";

import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import CourseList from "./CourseList";
import MyCourses from "./MyCourses";
import RecommendationsCarousel from "./RecommendationsCarousel";

export function AccauntMainPage() {
  const t = useTranslations("AccauntMainPage");
  return (
    <Box className={"bg_gray"}>
      <Header background="white" />
      <Box
        className="full_height"
        sx={{
          marginTop: { xs: "72px", md: "80px" },
        }}
      >
        <Box
          className="page_paddings"
          sx={{ paddingTop: "40px" }}
        >
          <Typography
            variant="h5"
            color="textSecondary"
            fontWeight={700}
          >
            {t("rekomendacii")}
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <RecommendationsCarousel />
          </Box>
        </Box>
        <MyCourses />
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
          className="page_paddings"
          sx={{ marginTop: "40px" }}
        >
          {t("vyberite-kurs")}
        </Typography>
        <CourseList />
      </Box>
      <Footer />
    </Box>
  );
}
