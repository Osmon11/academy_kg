"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { OurTeachers } from "@/widgets/OurTeachers";

import { PageHeading } from "@/entities/PageHeading";
import { SectionHeader } from "@/entities/SectionHeader";

import OurTeam from "./ui/OurTeam";

export function AboutUsPage() {
  const t = useTranslations("AboutUsPage");

  return (
    <Fragment>
      <Header
        background="transparent"
        elevation={0}
      />
      <main>
        <PageHeading
          title={t("o-nas")}
          subtitles={[
            t(
              "nasha-akademiya-predlagaet-kompleksnoe",
            ),
            t(
              "my-predlagaem-individualnyi-podkhod",
            ),
          ]}
        />
        <SectionHeader color="primary">
          {t("nasha-komanda")}
        </SectionHeader>
        <OurTeam />
        <SectionHeader color="primary">
          {t("nashi-prepodavateli")}
        </SectionHeader>
        <OurTeachers />
      </main>
      <Footer />
    </Fragment>
  );
}
