"use client";

import { useTranslations } from "next-intl";

import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SubjectCard } from "@/features/SubjectCard";

import { TubeSpinner } from "@/shared/UI";
import {
  CAROUSEL_ITEM_BOX,
  SECTION_PADDING,
} from "@/shared/config/const";
import { usePaginatedData } from "@/shared/hooks";
import { ISubjectListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function Subjects() {
  const t = useTranslations("Subjects");

  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );

  const { data, loading } =
    usePaginatedData<ISubjectListItem>({
      endpoint: "/academy/course_list/",
      hasNextPage: false,
    });
  const LoadingAndEmptyState = loading ? (
    <Box className="tube_spinner_wrapper">
      <TubeSpinner
        width={50}
        height={50}
      />
    </Box>
  ) : (
    Boolean(
      !data || data.results.length === 0,
    ) && (
      <Typography
        width="100%"
        textAlign="center"
        color="textSecondary"
        fontWeight={600}
      >
        {t("net-dannykh")}
      </Typography>
    )
  );
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {upMd ? (
        <Box className={styles.subjects_wrapper}>
          {data &&
            data.results.length > 0 &&
            data.results.map(
              (course, cardIndex) => (
                <SubjectCard
                  key={course.id}
                  color={
                    cardIndex % 2 === 0
                      ? "primary"
                      : "secondary"
                  }
                  {...course}
                />
              ),
            )}
          {LoadingAndEmptyState}
        </Box>
      ) : (
        <Carousel options={{ align: "start" }}>
          {data &&
            data.results.length > 0 &&
            data.results.map(
              (card, cardIndex) => (
                <Box
                  key={card.id}
                  sx={CAROUSEL_ITEM_BOX}
                >
                  <SubjectCard
                    color={
                      cardIndex % 2 === 0
                        ? "primary"
                        : "secondary"
                    }
                    {...card}
                  />
                </Box>
              ),
            )}
          {LoadingAndEmptyState}
        </Carousel>
      )}
    </Box>
  );
}
