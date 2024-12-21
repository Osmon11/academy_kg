import Image from "next/image";
import { Fragment } from "react";

import {
  Button,
  Typography,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { OurTeachers } from "@/widgets/OurTeachers";

import { Banner } from "@/entities/Banner";
import { SectionHeader } from "@/entities/SectionHeader";

import { ConvexButton } from "@/shared/UI";
import { SECTION_MARGIN_TOP } from "@/shared/config/const";

import Achievements from "./Achievements";
import Feedbacks from "./Feedbacks";
import HowItWorks from "./HowItWorks";
import Subjects from "./Subjects";
import styles from "./styles.module.scss";

export function MainPage() {
  return (
    <Fragment>
      <Header
        background="transparent"
        elevation={0}
        position="absolute"
      />
      <div className={styles.main_bg_1}>
        <Button
          startIcon={
            <Image
              src="/icons/location.webp"
              alt="location icon"
              width={24}
              height={24}
            />
          }
          variant="contained"
          sx={{
            padding: "4px 10px",
            borderRadius: "10px",
            textTransform: "uppercase",
          }}
        >
          Кыргызстан, бишкек
        </Button>
        <Typography
          component="h1"
          variant="h4"
          textTransform="uppercase"
          className={styles.title}
          sx={{ marginTop: "20px" }}
        >
          Первая исламская онлайн-академия в
          Кыргызстане - доступное образование,
          глубокие знания, духовное развитие для
          всех!
        </Typography>
        <Typography
          variant="h6"
          className={styles.subtitle}
          sx={{ marginTop: "20px" }}
        >
          Откройте мир исламских знаний в удобном
          онлайн-формате с ведущими
          преподавателями.
        </Typography>
        <ConvexButton
          color="secondary"
          sx={{
            marginTop: { xs: "20px", md: "50px" },
          }}
          endIcon={
            <Image
              src="/icons/play-secondary.webp"
              alt="orange play icon"
              width={24}
              height={24}
            />
          }
        >
          Смотреть видео
        </ConvexButton>
        <ConvexButton
          color="primary"
          sx={{
            marginTop: "18px",
          }}
          endIcon={
            <Image
              src="/icons/teacher-primary.webp"
              alt="cyan teacher icon"
              width={24}
              height={24}
            />
          }
        >
          начать обучение
        </ConvexButton>
      </div>
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
      <OurTeachers />
      <Banner
        color="primary"
        sx={{
          marginTop: SECTION_MARGIN_TOP,
        }}
      >
        <Achievements />
      </Banner>
      <SectionHeader color="secondary">
        как это работает?
      </SectionHeader>
      <HowItWorks />
      <SectionHeader color="primary">
        отзывы о нас
      </SectionHeader>
      <Feedbacks />
      <Footer />
    </Fragment>
  );
}
