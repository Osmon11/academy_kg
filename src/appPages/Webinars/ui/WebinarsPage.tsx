import { Fragment } from "react";

import { Typography } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { Banner } from "@/entities/Banner";
import { PageHeading } from "@/entities/PageHeading";
import { SectionHeader } from "@/entities/SectionHeader";

import { SECTION_MARGIN_TOP } from "@/shared/config/const";
import {
  IWebinarAfterward,
  IWebinarListItem,
} from "@/shared/types";

import HowOurWebinarsPass from "./HowOurWebinarsPass";
import UpcomingWebinars from "./UpcomingWebinars";
import WebinarAfterwards from "./WebinarAfterwards";

export function WebinarsPage({
  webinarList,
  webinarAfterwards,
}: {
  webinarList: IWebinarListItem[];
  webinarAfterwards: IWebinarAfterward[];
}) {
  return (
    <Fragment>
      <Header
        background="transparent"
        elevation={0}
        position="absolute"
      />
      <PageHeading
        title="Наши вебинары"
        subtitles={[
          "Вебинары - это качественное дополнение к образовательной программе онлайн-академии, позволяющее посредством живого общения стирать границы между преподавателем и учащимся, в какой бы точке мира они ни находились.",
          "Профессиональный подход наших преподавателей, их богатый опыт и потенциал, актуальная тематика вебинаров дают комплексное представление об исламе, раскрывают глубинные стороны этой универсальной религии.",
        ]}
      />
      <SectionHeader color="primary">
        Предстоящие вебинары
      </SectionHeader>
      <UpcomingWebinars webinars={webinarList} />
      <SectionHeader color="secondary">
        Записи прошедших вебинаров
      </SectionHeader>
      <WebinarAfterwards
        webinars={webinarAfterwards}
      />
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
          О вебинаре
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "25px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Вебинар - это разновидность
          веб-конференции, лекция в виде
          проведения онлайн-встречи. Объясним
          проще: наш вебинар на темы связанные с
          исламом - это обучающее онлайн-занятие
          по шариатским дисциплинам, лекция с
          использованием современных интернет
          технологий в формате онлайн-вебинара. В
          вебинаре (онлайн лекции) всегда
          участвуют две стороны: докладчик-ведущий
          и слушатели. Обычно участники могут
          видеть ведущего, а он их - нет. Наши
          лекции по исламу сегодня одновременно
          посещают от 100 до 1000 человек.
        </Typography>
      </Banner>
      <SectionHeader color="primary">
        Как проходят наши вебинары
      </SectionHeader>
      <HowOurWebinarsPass />
      <Footer />
    </Fragment>
  );
}
