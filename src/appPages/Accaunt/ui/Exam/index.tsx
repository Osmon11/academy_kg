"use client";

import { Fragment, useEffect } from "react";

import { Box } from "@mui/material";

import { GoBackHeader } from "@/entities/GoBackHeader";

import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import { getAllMinutes } from "@/shared/functions";
import {
  setCourseLevels,
  setLoading,
} from "@/shared/model";
import { ICourseLevelDetail } from "@/shared/types";

import styles from "../styles.module.scss";
import Timer from "./Timer";

interface IExamPageProps {
  courseId: string;
}

export function ExamPage({
  courseId,
}: IExamPageProps) {
  const dispatch = useAppDispatch();
  const courseLevels = useAppSelector(
    (store) => store.course.courseLevels,
  );

  useEffect(() => {
    dispatch(setLoading(true));
    axiosInstance
      .get<ICourseLevelDetail>(
        `/academy/course_level_detail/${courseId}`,
      )
      .then((res) => {
        if (res?.data) {
          dispatch(setCourseLevels(res.data));
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, courseId]);

  function onTimerEnd() {
    console.log("end");
  }
  return (
    <Fragment>
      <GoBackHeader
        title={
          courseLevels
            ? courseLevels.exam.title
            : "Экзамен"
        }
        append={
          courseLevels ? (
            <Timer
              minutes={getAllMinutes(
                courseLevels.exam.duration,
              )}
              onEnd={onTimerEnd}
            />
          ) : undefined
        }
      />
      <Box className={styles.page}></Box>
    </Fragment>
  );
}
