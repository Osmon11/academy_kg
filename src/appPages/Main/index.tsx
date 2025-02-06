"use client";

import { useLocale } from "next-intl";
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

import axiosInstance from "@/shared/config/axiosClientInstance";
import { SECTION_MARGIN_TOP } from "@/shared/config/const";
import { getUserLocation } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import {
  IFeedbackListItem,
  ITeacherListItem,
} from "@/shared/types";

import locationIcon from "@/icons/location.svg";
import playSecondaryIcon from "@/icons/play-secondary.svg";
import teacherPrimaryIcon from "@/icons/teacher-primary.svg";

import styles from "./styles.module.scss";
import Achievements from "./ui/Achievements";
import Feedbacks from "./ui/Feedbacks";
import HowItWorks from "./ui/HowItWorks";
import Subjects from "./ui/Subjects";

export function MainPage() {
  const router = useAppRouter();
  const locale = useLocale();
  const videoRef = useRef<HTMLDivElement>(null);
  const [teacherList, setTeacherList] = useState<
    ITeacherListItem[]
  >([]);
  const [feedbackList, setFeedbackList] =
    useState<IFeedbackListItem[]>([]);
  const [userLocation, setUserLocation] =
    useState("неизвестно");
  const [fetchingLocation, setFetchingLocation] =
    useState(true);

  useEffect(() => {
    axiosInstance
      .get<{
        results: ITeacherListItem[];
      }>("academy/teacher_list/")
      .then((res) => {
        if (
          res?.data &&
          Array.isArray(res.data.results)
        ) {
          setTeacherList(res.data.results);
        }
      });
    axiosInstance
      .get<{
        results: IFeedbackListItem[];
      }>("academy/feedback_list/")
      .then((res) => {
        if (
          res?.data &&
          Array.isArray(res.data.results)
        ) {
          setFeedbackList(res.data.results);
        }
      });
  }, []);
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
        title="Первая исламская онлайн-академия в
          Кыргызстане - доступное образование,
          глубокие знания, духовное развитие для
          всех!"
        subtitles={[
          "Откройте мир исламских знаний в удобном онлайн-формате с ведущими преподавателями.",
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
          Смотреть видео
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
          начать обучение
        </Button>
      </PageHeading>
      <SectionHeader color="primary">
        Наши предметы
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
          Об академии
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "25px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Научно-образовательный проект «Медина»
          призван донести до современного общества
          правильное понимание ислама. Его задача
          - раскрыть ту Божественную милость,
          которая ниспослана человечеству Творцом
          всего сущего, через Благородный Коран и
          Пречистую Сунну.
        </Typography>
      </Banner>
      <SectionHeader color="primary">
        Наши преподаватели
      </SectionHeader>
      <OurTeachers teachers={teacherList} />
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
        как это работает?
      </SectionHeader>
      <HowItWorks />
      <SectionHeader color="primary">
        отзывы о нас
      </SectionHeader>
      <Feedbacks feedbacks={feedbackList} />
      <Footer />
    </Fragment>
  );
}
