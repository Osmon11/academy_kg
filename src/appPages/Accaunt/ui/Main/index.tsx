"use client";

import { Box } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import CourseList from "./CourseList";
import MyCourses from "./MyCourses";
import RecommendationsCarousel from "./RecommendationsCarousel";

export function AccauntMainPage() {
  return (
    <Box className={"bg_gray"}>
      <Header background="white" />
      <Box
        className="page full_height"
        sx={{
          marginTop: { xs: "72px", md: "80px" },
        }}
      >
        <RecommendationsCarousel />
        <MyCourses />
        <CourseList />
      </Box>
      <Footer />
    </Box>
  );
}
