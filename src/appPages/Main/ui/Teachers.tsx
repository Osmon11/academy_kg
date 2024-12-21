"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";

import styles from "./styles.module.scss";

const teachers = [
  {
    image: "/backgrounds/teacher-1.png",
    fullname: "Амир Шарифов",
    subjects: "Амир Шарифов",
  },
  {
    image: "/backgrounds/teacher-2.png",
    fullname: "Карим Салимов",
    subjects: "Карим Салимов",
  },
  {
    image: "/backgrounds/teacher-3.png",
    fullname: "Мухаммад Саидов",
    subjects: "Мухаммад Саидов",
  },
  {
    image: "/backgrounds/teacher-4.png",
    fullname: "Фарук Ханибеков",
    subjects: "Фарук Ханибеков",
  },
  {
    image: "/backgrounds/teacher-5.png",
    fullname: "Зайнуддин Рахимов",
    subjects: "Зайнуддин Рахимов",
  },
  {
    image: "/backgrounds/teacher-6.png",
    fullname: "Карим Салимов",
    subjects: "Карим Салимов",
  },
  {
    image: "/backgrounds/teacher-7.png",
    fullname: "Мухаммад Саидов",
    subjects: "Мухаммад Саидов",
  },
  {
    image: "/backgrounds/teacher-8.png",
    fullname: "Амина Саидова",
    subjects: "Амина Саидова",
  },
  {
    image: "/backgrounds/teacher-9.png",
    fullname: "Марьям Рахимова",
    subjects: "Марьям Рахимова",
  },
  {
    image: "/backgrounds/teacher-10.png",
    fullname: "Лейла Нурмухамедова",
    subjects: "Лейла Нурмухамедова",
  },
];

export default function Teachers() {
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
        <div className={styles.teachers_wrapper}>
          {teachers.map(
            (teacher, teacherIndex) => (
              <TeacherCard
                key={
                  teacher.fullname + teacherIndex
                }
                {...teacher}
              />
            ),
          )}
        </div>
      ) : (
        <Carousel>
          {teachers.map(
            (teacher, teacherIndex) => (
              <Box
                key={
                  teacher.fullname + teacherIndex
                }
                sx={{
                  height: "auto",
                  paddingRight: "20px",
                }}
              >
                <TeacherCard {...teacher} />
              </Box>
            ),
          )}
        </Carousel>
      )}
    </Box>
  );
}
