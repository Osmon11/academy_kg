"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { Banner } from "@/entities/Banner";
import { PageHeading } from "@/entities/PageHeading";
import { SectionHeader } from "@/entities/SectionHeader";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";

import HowOurWebinarsPass from "./ui/HowOurWebinarsPass";
import UpcomingWebinars from "./ui/UpcomingWebinars";
import WebinarAfterwards from "./ui/WebinarAfterwards";

export function WebinarsPage() {
  const t = useTranslations("WebinarsPage");
  return (
    <Fragment>
      <Header
        background="transparent"
        elevation={0}
      />
      <PageHeading
        title={t("nashi-vebinary")}
        subtitles={[
          t(
            "vebinary-eto-kachestvennoe-dopolnenie",
          ),
          t(
            "professionalnyi-podkhod-nashikh-prepodavatelei",
          ),
        ]}
      />
      <SectionHeader color="primary">
        {t("predstoyashie-vebinary")}
      </SectionHeader>
      <UpcomingWebinars />
      <SectionHeader color="secondary">
        {t("zapisi-proshedshikh-vebinarov")}
      </SectionHeader>
      <WebinarAfterwards />
      <Banner
        color="secondary"
        sx={{
          marginTop: SECTION_MARGIN_TOP,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            position: "relative",
            width: "fit-content",
            margin: "0px auto",
            fontWeight: 900,
            ":after": {
              content: '""',
              position: "absolute",
              bottom: "-5px",
              left: 0,
              width: "100%",
              height: "4px",
              background: "#FFFFFF",
              borderRadius: "30px",
            },
          }}
        >
          {t("o-vebinare")}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "25px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {t("vebinar-eto-raznovidnost-veb")}
        </Typography>
      </Banner>
      <SectionHeader color="primary">
        {t("kak-prokhodyat-nashi-vebinary")}
      </SectionHeader>
      <HowOurWebinarsPass />
      <Footer />
    </Fragment>
  );
}
