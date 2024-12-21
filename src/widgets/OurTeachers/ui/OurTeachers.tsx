"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";

import styles from "./OurTeachers.module.scss";

const teachers = [
  {
    image: "/backgrounds/teacher-1.png",
    fullname: "Амир Шарифов",
    subjects: "Таджвид, Хадис",
  },
  {
    image: "/backgrounds/teacher-2.png",
    fullname: "Карим Салимов",
    subjects: "Акыда",
  },
  {
    image: "/backgrounds/teacher-3.png",
    fullname: "Мухаммад Саидов",
    subjects: "Сира",
  },
  {
    image: "/backgrounds/teacher-4.png",
    fullname: "Фарук Ханибеков",
    subjects: "Адаб",
  },
  {
    image: "/backgrounds/teacher-5.png",
    fullname: "Зайнуддин Рахимов",
    subjects: "Ханафитский фикх",
  },
  {
    image: "/backgrounds/teacher-6.png",
    fullname: "Карим Салимов",
    subjects: "Шафиитский фикх",
  },
  {
    image: "/backgrounds/teacher-7.png",
    fullname: "Мухаммад Саидов",
    subjects: "Тафсир",
  },
  {
    image: "/backgrounds/teacher-8.png",
    fullname: "Амина Саидова",
    subjects:
      "Практические занятия по Корану для женщин",
  },
  {
    image: "/backgrounds/teacher-9.png",
    fullname: "Марьям Рахимова",
    subjects: "Еженедельные вебинары для женщин",
  },
  {
    image: "/backgrounds/teacher-10.png",
    fullname: "Лейла Нурмухамедова",
    subjects:
      "Практические занятия по Корану для женщин",
  },
];

export function OurTeachers() {
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
          {teachers.map(
            (teacher, teacherIndex) => (
              <TeacherCard
                key={
                  teacher.fullname + teacherIndex
                }
                {...teacher}
                mediaSx={mediaStyles}
                sx={cardStyles}
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
                <TeacherCard
                  {...teacher}
                  mediaSx={mediaStyles}
                  sx={cardStyles}
                />
              </Box>
            ),
          )}
        </Carousel>
      )}
    </Box>
  );
}
