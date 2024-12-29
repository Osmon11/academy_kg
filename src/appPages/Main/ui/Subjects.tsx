"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SubjectCard } from "@/features/SubjectCard";

import { SECTION_PADDING } from "@/shared/config/const";
import { ISubjectListItem } from "@/shared/types";

import styles from "./styles.module.scss";

interface ISubjectsProps {
  subjects: ISubjectListItem[];
}

export default function Subjects({
  subjects,
}: ISubjectsProps) {
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {upMd ? (
        <div className={styles.subjects_wrapper}>
          {subjects.map((course, cardIndex) => (
            <SubjectCard
              key={course.id}
              color={
                cardIndex % 2 === 0
                  ? "primary"
                  : "secondary"
              }
              {...course}
            />
          ))}
        </div>
      ) : (
        <Carousel options={{ align: "start" }}>
          {subjects.map((card, cardIndex) => (
            <Box
              key={card.id}
              sx={{
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
          ))}
        </Carousel>
      )}
    </Box>
  );
}
