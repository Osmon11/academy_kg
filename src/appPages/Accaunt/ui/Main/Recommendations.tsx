"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { RecommendationCard } from "@/features/RecommendationCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { ICourseListItem } from "@/shared/types";

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<ICourseListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{
        results: ICourseListItem[];
      }>("/academy/recommendation_courses/")
      .then((res) => {
        if (res?.data) {
          setRecommendations(res.data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <Box className="tube_spinner_wrapper">
      <TubeSpinner
        width={50}
        height={50}
      />
    </Box>
  ) : (
    <Carousel options={{ align: "start" }}>
      {recommendations.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "auto",
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
