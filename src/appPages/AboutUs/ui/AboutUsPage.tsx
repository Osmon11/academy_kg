import { Fragment } from "react";

import { Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { OurTeachers } from "@/widgets/OurTeachers";

import { SectionHeader } from "@/entities/SectionHeader";

import OurTeam from "./OurTeam";

export function AboutUsPage() {
  return (
    <Fragment>
      <Header
        background="transparent"
        elevation={0}
        position="absolute"
      />
      <div className="page_title_bg">
        <Typography
          component="h1"
          variant="h4"
          textTransform="uppercase"
          className="title"
          sx={{ marginTop: "20px" }}
        >
          О нас
        </Typography>
        <Typography
          variant="h6"
          className="subtitle"
          sx={{ marginTop: "20px" }}
        >
          Наша академия предлагает комплексное
          онлайн-обучение Корану и арабскому языку
          для студентов всех уровней подготовки.
          Мы стремимся сделать изучение Священной
          Книги доступным каждому, используя
          современные технологии и методики
          преподавания.
        </Typography>
        <Typography
          variant="h6"
          className="subtitle"
          sx={{ marginTop: "20px" }}
        >
          Мы предлагаем индивидуальный подход к
          каждому студенту, гибкий график занятий
          и раздельное обучение для мужчин и
          женщин. Наши преподаватели — специалисты
          с международным опытом, готовые помочь
          вам на пути к знаниям.
        </Typography>
      </div>
      <SectionHeader color="primary">
        наша команда
      </SectionHeader>
      <OurTeam />
      <SectionHeader color="primary">
        Наши преподаватели
      </SectionHeader>
      <OurTeachers />
      <Footer />
    </Fragment>
  );
}
