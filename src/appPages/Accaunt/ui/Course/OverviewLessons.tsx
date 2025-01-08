"use client";

import moment from "moment";
import Image from "next/image";
import {
  FixedSizeList,
  ListChildComponentProps,
} from "react-window";

import {
  Box,
  ListItem,
  Typography,
} from "@mui/material";

import { TIME_FORMAT } from "@/shared/config/const";
import { ILessonDetail } from "@/shared/types";

import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";

import styles from "../styles.module.scss";

interface IOverviewLessonsProps {
  lessons: ILessonDetail[];
}

function renderRow(
  props: ListChildComponentProps<ILessonDetail[]>,
) {
  const { index, style, data } = props;
  const lesson = data[index];
  return (
    <ListItem
      style={style}
      key={lesson.id}
      component="div"
      className={styles.item}
    >
      <Box
        className={styles.flex_box}
        sx={{ gap: "20px" }}
      >
        <Typography>{index + 1}</Typography>
        <Box
          className={styles.flex_box}
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
            {lesson.tittle}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        color="textSecondary"
      >{`Видео - ${moment(lesson.duration, TIME_FORMAT).format("HH:mm")}`}</Typography>
    </ListItem>
  );
}

export default function OverviewLessons({
  lessons,
}: IOverviewLessonsProps) {
  return (
    <FixedSizeList
      className={styles.accordeons}
      height={400}
      width={800}
      itemSize={46}
      itemCount={lessons.length}
      overscanCount={5}
      itemData={lessons}
    >
      {renderRow}
    </FixedSizeList>
  );
}
