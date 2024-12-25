"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";
import { ITeacherListItem } from "@/shared/types";

import styles from "./OurTeachers.module.scss";

export function OurTeachers({
  teachers,
}: {
  teachers: ITeacherListItem[];
}) {
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const cardStyles = {
    width: "240px",
  };
  const mediaStyles = {
    width: "240px",
    height: "280px",
  };
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {upMd ? (
        <div className={styles.teachers_wrapper}>
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              {...teacher}
              mediaSx={mediaStyles}
              sx={cardStyles}
            />
          ))}
        </div>
      ) : (
        <Carousel>
          {teachers.map((teacher) => (
            <Box
              key={teacher.id}
              sx={{
                height: "auto",
                paddingRight: "20px",
              }}
            >
              <TeacherCard
                {...teacher}
                mediaSx={mediaStyles}
                sx={cardStyles}
              />
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
}
