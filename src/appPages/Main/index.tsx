"use client";

import {
  useLocale,
  useTranslations,
} from "next-intl";
import Image from "next/image";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { OurTeachers } from "@/widgets/OurTeachers";

import { Banner } from "@/entities/Banner";
import { PageHeading } from "@/entities/PageHeading";
import { SectionHeader } from "@/entities/SectionHeader";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";
import { getUserLocation } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";

import locationIcon from "@/icons/location.svg";
import playSecondaryIcon from "@/icons/play-secondary.svg";
import teacherPrimaryIcon from "@/icons/teacher-primary.svg";

import styles from "./styles.module.scss";
import Achievements from "./ui/Achievements";
import Feedbacks from "./ui/Feedbacks";
import HowItWorks from "./ui/HowItWorks";
import Subjects from "./ui/Subjects";

export function MainPage() {
  const t = useTranslations("MainPage");
  const router = useAppRouter();
  const locale = useLocale();
  const videoRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] =
    useState("неизвестно");
  const [fetchingLocation, setFetchingLocation] =
    useState(true);

  useEffect(() => {
    getUserLocation(locale)
      .then((location) => {
        if (location) {
          setUserLocation(location);
        }
      })
      .finally(() => setFetchingLocation(false));
  }, [locale]);

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <Fragment>
      <Header
        background="transparent"
        elevation={0}
        position="absolute"
      />
      <PageHeading
        header={
          <Box
            className={styles.location_wrapper}
          >
            <Image
              src={locationIcon}
              alt="location icon"
              width={24}
              height={24}
            />
            <Typography
              variant="subtitle2"
              textTransform="uppercase"
            >
              {fetchingLocation
                ? "Загрузка..."
                : userLocation}
            </Typography>
          </Box>
        }
        title={t(
          "pervaya-islamskaya-onlain-akademiya",
        )}
        subtitles={[
          t("otkroite-mir-islamskikh-znanii"),
        ]}
      >
        <Button
          variant="convex"
          color="secondary"
          sx={{
            marginTop: { xs: "20px", md: "50px" },
          }}
          endIcon={
            <Box className="circle_icon_wrapper">
              <Image
                src={playSecondaryIcon}
                alt="orange play icon"
                width={24}
                height={24}
              />
            </Box>
          }
          onClick={scrollToVideo}
        >
          {t("smotret-video")}
        </Button>
        <Button
          variant="convex"
          color="primary"
          onClick={() => router.push("signUp")}
          sx={{
            marginTop: "18px",
          }}
          endIcon={
            <Box className="circle_icon_wrapper">
              <Image
                src={teacherPrimaryIcon}
                alt="cyan teacher icon"
                width={24}
                height={24}
              />
            </Box>
          }
        >
          {t("nachat-obuchenie")}
        </Button>
      </PageHeading>
      <SectionHeader color="primary">
        {t("nashi-predmety")}
      </SectionHeader>
      <Subjects />
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
          {t("ob-akademii")}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "25px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {t(
            "nauchno-obrazovatelnyi-proekt-medina",
          )}
        </Typography>
      </Banner>
      <SectionHeader color="primary">
        {t("nashi-prepodavateli")}
      </SectionHeader>
      <OurTeachers />
      <Banner
        color="primary"
        sx={{
          marginTop: SECTION_MARGIN_TOP,
        }}
      >
        <Achievements />
      </Banner>
      <SectionHeader
        ref={videoRef}
        color="secondary"
      >
        {t("kak-eto-rabotaet")}
      </SectionHeader>
      <HowItWorks />
      <SectionHeader color="primary">
        {t("otzyvy-o-nas")}
      </SectionHeader>
      <Feedbacks />
      <Footer />
    </Fragment>
  );
}
