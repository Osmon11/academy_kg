"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { FeedbackCard } from "@/features/FeedbackCard";

import { IFeedbackListItem } from "@/shared/types";

export default function Feedbacks({
  feedbacks,
}: {
  feedbacks: IFeedbackListItem[];
}) {
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const upLg = useMediaQuery((theme) =>
    theme.breakpoints.up("lg"),
  );
  return (
    <Box
      sx={{
        marginTop: {
          xs: "25px",
          md: "50px",
          lg: "80px",
        },
        padding: {
          xs: "0px 15px",
          md: "0px",
          lg: "0px 70px",
        },
      }}
    >
      <Carousel
        navButtons={upLg}
        dotButtonType="line"
        options={{
          align: upMd ? "center" : "start",
        }}
      >
        {feedbacks.map(
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
    </Box>
  );
}
