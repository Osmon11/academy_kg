"use client";

import { useTranslations } from "next-intl";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { RecommendationCard } from "@/features/RecommendationCard";

import { TubeSpinner } from "@/shared/UI";
import { CAROUSEL_ITEM_BOX } from "@/shared/config/const";
import {
  useAppRouter,
  usePaginatedData,
} from "@/shared/hooks";
import { ICourseListItem } from "@/shared/types";

export default function RecommendationsCarousel() {
  const router = useAppRouter();
  const t = useTranslations(
    "RecommendationsCarousel",
  );

  const { data, loading } =
    usePaginatedData<ICourseListItem>({
      endpoint:
        "/academy/recommendation_courses/",
      hasNextPage: false,
    });
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box className="list_header">
        <Typography
          variant="h5"
          color="textSecondary"
          fontWeight={700}
        >
          {t("rekomendacii")}
        </Typography>
        <Button
          variant="outlined"
          onClick={() =>
            router.push("recommendations")
          }
          sx={{ textTransform: "initial" }}
        >
          {t("posmotret-vse")}
        </Button>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        {loading ? (
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
                  ...CAROUSEL_ITEM_BOX,
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
        )}
      </Box>
    </Box>
  );
}
