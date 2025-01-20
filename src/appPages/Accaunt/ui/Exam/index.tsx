"use client";

import { Fragment, useEffect } from "react";

import { Box } from "@mui/material";

import { GoBackHeader } from "@/entities/GoBackHeader";
import { Timer } from "@/entities/Timer";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import { getAllMinutes } from "@/shared/functions";
import {
  setExamLoading,
  setExamQuestions,
} from "@/shared/model";
import { IExamQuestions } from "@/shared/types";

import styles from "../styles.module.scss";
import Questions from "./Questions";

interface IExamPageProps {
  courseId: string;
}

export function ExamPage({
  courseId,
}: IExamPageProps) {
  const dispatch = useAppDispatch();
  const { examQuestions, loading } =
    useAppSelector((store) => store.exam);

  useEffect(() => {
    dispatch(setExamLoading(true));
    axiosInstance
      .get<IExamQuestions>(
        `/academy/start_exam/${courseId}`,
      )
      .then((res) => {
        if (res?.data) {
          dispatch(setExamQuestions(res.data));
        }
      })
      .finally(() => {
        dispatch(setExamLoading(false));
      });
  }, [dispatch, courseId]);

  function onTimerEnd() {
    console.log("end");
  }
  return (
    <Fragment>
      <GoBackHeader
        title={
          examQuestions
            ? examQuestions.title
            : "Экзамен"
        }
        append={
          examQuestions ? (
            <Timer
              minutes={getAllMinutes(
                examQuestions.duration,
              )}
              onEnd={onTimerEnd}
            />
          ) : undefined
        }
      />
      <Box className={styles.page}>
        {loading ? (
          <Box
            className={
              styles.tube_spinner_wrapper
            }
          >
            <TubeSpinner
              width={50}
              height={50}
            />
          </Box>
        ) : (
          <Questions />
        )}
      </Box>
    </Fragment>
  );
}
