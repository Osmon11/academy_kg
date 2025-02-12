"use client";

import { useTranslations } from "next-intl";

import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { FeedbackCard } from "@/features/FeedbackCard";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { IFeedbackListItem } from "@/shared/types";

export default function Feedbacks() {
  const t = useTranslations("Feedbacks");
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const upLg = useMediaQuery((theme) =>
    theme.breakpoints.up("lg"),
  );

  const { data, loading } =
    usePaginatedData<IFeedbackListItem>({
      endpoint: "/academy/feedback_list/",
      hasNextPage: false,
    });
  return (
    <Box
      sx={{
        marginTop: {
          xs: "25px",
          md: "50px",
        },
        padding: {
          xs: "0px 15px",
          sm: "0px 30px",
          md: "0px 50px",
        },
      }}
    >
      {loading ? (
        <Box className="tube_spinner_wrapper">
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : data && data.results.length > 0 ? (
        <Carousel
          navButtons={upLg}
          dotButtonType="line"
          options={{
            align: upMd ? "center" : "start",
          }}
        >
          {data.results.map(
            (feedback, feedbackIndex) => (
              <Box
                key={feedbackIndex}
                sx={{
                  width: "auto",
                  height: "auto",
                  paddingRight: {
                    xs: "20px",
                    md: "50px",
                  },
                }}
              >
                <FeedbackCard
                  {...feedback}
                  color={
                    feedbackIndex % 2 === 0
                      ? "secondary"
                      : "primary"
                  }
                />
              </Box>
            ),
          )}
        </Carousel>
      ) : (
        <Typography
          width="100%"
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
        >
          {t("net-otzyvov")}
        </Typography>
      )}
    </Box>
  );
}
