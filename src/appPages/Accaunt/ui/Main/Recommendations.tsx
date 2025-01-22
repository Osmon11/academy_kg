"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { RecommendationCard } from "@/features/RecommendationCard";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { ICourseListItem } from "@/shared/types";

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<ICourseListItem[]>([]);
  useEffect(() => {
    axiosInstance
      .get<{
        results: ICourseListItem[];
      }>("/academy/recommendation_courses/")
      .then((res) => {
        if (res?.data) {
          setRecommendations(res.data.results);
        }
      });
  }, []);
  return (
    <Carousel options={{ align: "start" }}>
      {recommendations.map((item) => (
        <Box
          key={item.id}
          sx={{
            height: "auto",
            paddingRight: "20px",
          }}
        >
          <RecommendationCard
            recommendation={item}
          />
        </Box>
      ))}
    </Carousel>
  );
}
