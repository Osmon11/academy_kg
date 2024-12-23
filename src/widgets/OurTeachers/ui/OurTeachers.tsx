"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";

import teacher1 from "@/backgrounds/teacher-1.png";
import teacher2 from "@/backgrounds/teacher-2.png";
import teacher3 from "@/backgrounds/teacher-3.png";
import teacher4 from "@/backgrounds/teacher-4.png";
import teacher5 from "@/backgrounds/teacher-5.png";
import teacher6 from "@/backgrounds/teacher-6.png";
import teacher7 from "@/backgrounds/teacher-7.png";
import teacher8 from "@/backgrounds/teacher-8.png";
import teacher9 from "@/backgrounds/teacher-9.png";
import teacher10 from "@/backgrounds/teacher-10.png";

import styles from "./OurTeachers.module.scss";

const teachers = [
  {
    image: teacher1.src,
    fullname: "Амир Шарифов",
    subjects: "Таджвид, Хадис",
  },
  {
    image: teacher2.src,
    fullname: "Карим Салимов",
    subjects: "Акыда",
  },
  {
    image: teacher3.src,
    fullname: "Мухаммад Саидов",
    subjects: "Сира",
  },
  {
    image: teacher4.src,
    fullname: "Фарук Ханибеков",
    subjects: "Адаб",
  },
  {
    image: teacher5.src,
    fullname: "Зайнуддин Рахимов",
    subjects: "Ханафитский фикх",
  },
  {
    image: teacher6.src,
    fullname: "Карим Салимов",
    subjects: "Шафиитский фикх",
  },
  {
    image: teacher7.src,
    fullname: "Мухаммад Саидов",
    subjects: "Тафсир",
  },
  {
    image: teacher8.src,
    fullname: "Амина Саидова",
    subjects:
      "Практические занятия по Корану для женщин",
  },
  {
    image: teacher9.src,
    fullname: "Марьям Рахимова",
    subjects: "Еженедельные вебинары для женщин",
  },
  {
    image: teacher10.src,
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
