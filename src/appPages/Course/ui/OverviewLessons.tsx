"use client";

import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";

import {
  Box,
  ListItem,
  Typography,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import { TIME_FORMAT } from "@/shared/config/const";
import { useAppSelector } from "@/shared/config/store";
import { usePaginatedData } from "@/shared/hooks";
import { ILessonDetail } from "@/shared/types";

import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";

import styles from "../styles.module.scss";

export default function OverviewLessons() {
  const t = useTranslations("OverviewLessons");
  const course = useAppSelector(
    (store) => store.course.course,
  );

  const {
    sentryRef,
    data,
    loading,
    hasNextPage,
  } = usePaginatedData<ILessonDetail>({
    endpoint: `/academy/course_lesson_list/${course!.id}`,
  });
  // className={styles.lessons_wrapper}
  return (
    <Box>
      {data &&
        data.results.length > 0 &&
        data.results.map(
          (lesson, index, array) => (
            <ListItem
              key={lesson.id}
              component="div"
              className={styles.lesson_item}
              sx={{
                borderBottom:
                  index + 1 !== array.length
                    ? "1px solid #E5E5E5"
                    : "none",
              }}
            >
              <Box className={"flex_box"}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color="#A3A3A3"
                  minWidth="33px"
                >
                  {index + 1}
                </Typography>
                <Box
                  className={"flex_box"}
                  sx={{ gap: "8px" }}
                >
                  <Image
                    src={playCirclePrimaryIcon}
                    alt="play circle green icon"
                    width={24}
                    height={24}
                  />
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    fontWeight={600}
                  >
                    {lesson.title}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body1"
                color="textSecondary"
                textAlign="right"
              >
                {t("video", {
                  duration: moment(
                    lesson.duration,
                    TIME_FORMAT,
                  ).format("HH:mm"),
                })}
              </Typography>
            </ListItem>
          ),
        )}
      {loading || hasNextPage ? (
        <Box
          ref={sentryRef}
          className="tube_spinner_wrapper"
        >
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        Boolean(
          !data || data.results.length === 0,
        ) && (
          <Typography
            textAlign="center"
            color="textSecondary"
            fontWeight={600}
            sx={{ marginTop: "16px" }}
          >
            {t("net-urokov")}
          </Typography>
        )
      )}
    </Box>
  );
}
