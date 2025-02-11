"use client";

import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { RecommendationCard } from "@/features/RecommendationCard";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { ICourseListItem } from "@/shared/types";

export default function RecommendationsCarousel() {
  const t = useTranslations(
    "RecommendationsCarousel",
  );

  const { data, loading } =
    usePaginatedData<ICourseListItem>({
      endpoint:
        "/academy/recommendation_courses/",
      hasNextPage: false,
    });
  return loading ? (
    <Box className="tube_spinner_wrapper">
      <TubeSpinner
        width={50}
        height={50}
      />
    </Box>
  ) : data && data.results.length > 0 ? (
    <Carousel options={{ align: "start" }}>
      {data.results.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "auto",
            height: "auto",
            paddingRight: "20px",
            paddingBottom: "5px",
          }}
        >
          <RecommendationCard
            recommendation={item}
          />
        </Box>
      ))}
    </Carousel>
  ) : (
    <Typography
      textAlign="center"
      color="textSecondary"
      fontWeight={600}
    >
      {t("poka-net-rekomendacii")}
    </Typography>
  );
}
