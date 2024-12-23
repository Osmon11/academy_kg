"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SubjectCard } from "@/features/SubjectCard";

import { SECTION_PADDING } from "@/shared/config/const";

import subjectCardBg1 from "@/backgrounds/subject-card-1.png";
import subjectCardBg2 from "@/backgrounds/subject-card-2.png";
import subjectCardBg3 from "@/backgrounds/subject-card-3.png";
import subjectCardBg4 from "@/backgrounds/subject-card-4.png";
import subjectCardBg5 from "@/backgrounds/subject-card-5.png";
import subjectCardBg6 from "@/backgrounds/subject-card-6.png";
import subjectCardBg7 from "@/backgrounds/subject-card-7.png";
import subjectCardBg8 from "@/backgrounds/subject-card-8.png";

import styles from "./styles.module.scss";

const subjects = [
  {
    image: subjectCardBg1.src,
    title: "адаб",
    description:
      "правила поведения, основанные на Коране и Сунне",
    color: "secondary" as const,
  },
  {
    image: subjectCardBg2.src,
    title: "таджвид",
    description:
      "правила чтения Корана, исключающие искажения смысла.",
    color: "primary" as const,
  },
  {
    image: subjectCardBg3.src,
    title: "Акыда",
    description:
      "исламское вероубеждение, форма раскрытия имана, «символ веры»",
    color: "secondary" as const,
  },
  {
    image: subjectCardBg4.src,
    title: "Сира",
    description:
      "история жизни Пророка Мухаммада ﷺ, его путь и пример для мусульман",
    color: "primary" as const,
  },
  {
    image: subjectCardBg5.src,
    title: "Ханафитский фикх",
    description:
      "наука о шариатских нормах, регулирующих практическую жизнь мусульманина",
    color: "secondary" as const,
  },
  {
    image: subjectCardBg6.src,
    title: "Шафиитский фикх",
    description:
      "наука о шариатских нормах, регулирующих практическую жизнь мусульманина",
    color: "primary" as const,
  },
  {
    image: subjectCardBg7.src,
    title: "ХАДИС",
    description:
      "предания о словах и действиях Пророка Мухаммада ﷺ",
    color: "secondary" as const,
  },
  {
    image: subjectCardBg8.src,
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
