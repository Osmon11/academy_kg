"use client";

import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { Banner } from "@/entities/Banner";
import { GoBackHeader } from "@/entities/GoBackHeader";
import { SectionHeader } from "@/entities/SectionHeader";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";

import styles from "./styles.module.scss";
import OurRequisites from "./ui/OurRequisites";

export function SupportUsPage() {
  const t = useTranslations("SupportUsPage");

  return (
    <Box className={styles.page}>
      <GoBackHeader title={t("podderzhat-nas")} />
      <Banner
        color="primary"
        sx={{ marginTop: SECTION_MARGIN_TOP }}
      >
        <Typography
          variant="h5"
          textAlign="center"
        >
          {t("my-iskrenne-blagodarny-kazhdomu")}
        </Typography>
      </Banner>
      <SectionHeader color="secondary">
        {t("nashi-rekvizity")}
      </SectionHeader>
      <OurRequisites />
      <Footer />
    </Box>
  );
}
