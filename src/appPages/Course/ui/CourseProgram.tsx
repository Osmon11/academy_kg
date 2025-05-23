import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { ICourseDetail } from "@/shared/types";

import arrowDownBlackIcon from "@/icons/arrow-down-black.svg";

import OverviewLessons from "./OverviewLessons";

interface ICourseProgramProps {
  course: ICourseDetail;
}

export default function CourseProgram({
  course,
}: ICourseProgramProps) {
  const t = useTranslations("CourseProgram");
  const durationTime = moment(
    course ? course.duration_count : "02:45:00",
    TIME_FORMAT,
  );
  const hours = durationTime.hours();
  const minutes = durationTime.minutes();
  return (
    <Fragment>
      {course.lesson_count && (
        <Typography
          variant="h5"
          color="primary"
          textAlign="center"
          fontWeight={500}
          sx={{
            marginTop: "10px",
          }}
        >
          {t("title", {
            lections: course.lesson_count,
            hours,
            minutes,
          })}
        </Typography>
      )}
      <Accordion
        elevation={0}
        sx={{
          marginTop: "8px",
          "::before": {
            top: "unset",
            bottom: "-1px",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <Image
              src={arrowDownBlackIcon}
              alt="arrow up black icon"
              width={30}
              height={30}
            />
          }
          sx={{ padding: "0px" }}
        >
          <Box>
            <Typography
              variant="h5"
              color="textSecondary"
              fontWeight={600}
            >
              {t("uroki")}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              {t("lessons", {
                amount: course.lesson_count,
              })}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          <OverviewLessons />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
