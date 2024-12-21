"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SubjectCard } from "@/features/SubjectCard";

import { SECTION_PADDING } from "@/shared/config/const";

import styles from "./styles.module.scss";

const subjects = [
  {
    video: "/backgrounds/subject-card-1.png",
    title: "адаб",
    description:
      "правила поведения, основанные на Коране и Сунне",
    color: "secondary" as const,
  },
  {
    video: "/backgrounds/subject-card-2.png",
    title: "таджвид",
    description:
      "правила чтения Корана, исключающие искажения смысла.",
    color: "primary" as const,
  },
  {
    video: "/backgrounds/subject-card-3.png",
    title: "Акыда",
    description:
      "исламское вероубеждение, форма раскрытия имана, «символ веры»",
    color: "secondary" as const,
  },
  {
    video: "/backgrounds/subject-card-4.png",
    title: "Сира",
    description:
      "история жизни Пророка Мухаммада ﷺ, его путь и пример для мусульман",
    color: "primary" as const,
  },
  {
    video: "/backgrounds/subject-card-5.png",
    title: "Ханафитский фикх",
    description:
      "наука о шариатских нормах, регулирующих практическую жизнь мусульманина",
    color: "secondary" as const,
  },
  {
    video: "/backgrounds/subject-card-6.png",
    title: "Шафиитский фикх",
    description:
      "наука о шариатских нормах, регулирующих практическую жизнь мусульманина",
    color: "primary" as const,
  },
  {
    video: "/backgrounds/subject-card-7.png",
    title: "ХАДИС",
    description:
      "предания о словах и действиях Пророка Мухаммада ﷺ",
    color: "secondary" as const,
  },
  {
    video: "/backgrounds/subject-card-8.png",
    title: "Тафсир",
    description:
      "правила чтения Корана, исключающие искажения смысла",
    color: "primary" as const,
  },
];

export default function Subjects() {
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
          {subjects.map((card, cardIndex) => (
            <SubjectCard
              key={cardIndex}
              {...card}
            />
          ))}
        </div>
      ) : (
        <Carousel options={{ align: "start" }}>
          {subjects.map((card, cardIndex) => (
            <Box
              key={cardIndex}
              sx={{
                height: "auto",
                paddingRight: "20px",
              }}
            >
              <SubjectCard {...card} />
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
}
