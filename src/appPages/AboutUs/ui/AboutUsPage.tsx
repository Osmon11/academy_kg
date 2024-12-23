import { Fragment } from "react";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { OurTeachers } from "@/widgets/OurTeachers";

import { PageHeading } from "@/entities/PageHeading";
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
      <PageHeading
        title="О нас"
        subtitles={[
          "Наша академия предлагает комплексное онлайн-обучение Корану и арабскому языку для студентов всех уровней подготовки. Мы стремимся сделать изучение Священной Книги доступным каждому, используя современные технологии и методики преподавания.",
          "Мы предлагаем индивидуальный подход к каждому студенту, гибкий график занятий и раздельное обучение для мужчин и женщин. Наши преподаватели — специалисты с международным опытом, готовые помочь вам на пути к знаниям.",
        ]}
      />
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
