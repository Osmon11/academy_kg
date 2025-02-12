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
import { SECTION_PADDING } from "@/shared/config/const";
import { usePaginatedData } from "@/shared/hooks";
import { ISubjectListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function Subjects() {
  const t = useTranslations("Subjects");

  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );

  const { sentryRef, data, loading } =
    usePaginatedData<ISubjectListItem>({
      endpoint: "/academy/course_list/",
      searchParams: { page_size: 9 },
      hasNextPage: false,
    });
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {data &&
        data.results.length > 0 &&
        (upMd ? (
          <Box
            className={styles.subjects_wrapper}
            ref={sentryRef}
          >
            {data.results.map(
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
          </Box>
        ) : (
          <Carousel options={{ align: "start" }}>
            {data.results.map(
              (card, cardIndex) => (
                <Box
                  key={card.id}
                  sx={{
                    width: "auto",
                    height: "auto",
                    paddingRight: "20px",
                  }}
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
          </Carousel>
        ))}
      {loading ? (
        <Box className={"tube_spinner_wrapper"}>
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
      )}
    </Box>
  );
}
