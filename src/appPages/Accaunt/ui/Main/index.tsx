"use client";

import { Fragment } from "react";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import CourseList from "./CourseList";
import MyCourses from "./MyCourses";
import RecommendationsCarousel from "./RecommendationsCarousel";

export function AccauntMainPage() {
  return (
    <Fragment>
      <Header background="white" />
      <main className="page full_height">
        <RecommendationsCarousel />
        <MyCourses />
        <CourseList />
      </main>
      <Footer />
    </Fragment>
  );
}
