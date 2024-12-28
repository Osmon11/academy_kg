import { Fragment } from "react";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { OurTeachers } from "@/widgets/OurTeachers";

import { PageHeading } from "@/entities/PageHeading";
import { SectionHeader } from "@/entities/SectionHeader";

import clientAxios from "@/shared/config/clientAxios";
import {
  ITeacherListItem,
  ITeammateListItem,
} from "@/shared/types";

import OurTeam from "./OurTeam";

export async function AboutUsPage() {
  const teammateList = await clientAxios
    .get<{
      results: ITeammateListItem[];
    }>("academy/our_team_list/")
    .then((res) => res?.data.results);
  const teacherList = await clientAxios
    .get<{
      results: ITeacherListItem[];
    }>("academy/teacher_list/")
    .then((res) => res?.data.results);
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
      <OurTeam teammates={teammateList} />
      <SectionHeader color="primary">
        Наши преподаватели
      </SectionHeader>
      <OurTeachers teachers={teacherList} />
      <Footer />
    </Fragment>
  );
}
