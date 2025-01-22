"use client";

import {
  Fragment,
  useEffect,
  useState,
} from "react";

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
import ResultCard from "./ResultCard";

interface IExamPageProps {
  courseId: string;
}

export function ExamPage({
  courseId,
}: IExamPageProps) {
  const dispatch = useAppDispatch();
  const { examQuestions, results, loading } =
    useAppSelector((store) => store.exam);
  const [finished, setFinished] = useState(false);

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
    return () => {
      setFinished(false);
    };
  }, [dispatch, courseId]);

  function finishExam() {
    if (examQuestions) {
      dispatch(setExamLoading(true));
      axiosInstance
        .post(
          `/academy/finish_exam/${examQuestions.id}/`,
          {
            passed_count: results.filter(
              (i) =>
                !i.skipped && i.correctAnswer,
            ).length,
          },
        )
        .then(() => setFinished(true))
        .finally(() =>
          dispatch(setExamLoading(false)),
        );
    }
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
              onEnd={finishExam}
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
        ) : finished ? (
          <ResultCard />
        ) : (
          <Questions finishExam={finishExam} />
        )}
      </Box>
    </Fragment>
  );
}
