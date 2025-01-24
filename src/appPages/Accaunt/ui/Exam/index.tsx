"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

import commonStyles from "../styles.module.scss";
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
  const [summary, setSummary] = useState<{
    answeredQuestions: number;
    correctAnswers: number;
    score: number;
  }>();
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
      setSummary(undefined);
      setFinished(false);
    };
  }, [dispatch, courseId]);

  function finishExam() {
    if (examQuestions && !finished) {
      const answeredQuestions = results.filter(
        (i) => !i.skipped,
      );
      const correctAnswers =
        answeredQuestions.filter(
          (i) => i.correctAnswer,
        );
      const score = correctAnswers.reduce(
        (acc, item) => acc + item.point,
        0,
      );
      dispatch(setExamLoading(true));
      axiosInstance
        .post(
          `/academy/finish_exam/${examQuestions.id}/`,
          {
            passed_count: results.filter(
              (i) =>
                !i.skipped && i.correctAnswer,
            ).length,
            point_sum: score,
          },
        )
        .then((res) => {
          if (res?.data?.message) {
            toast.success(res.data.message);
          }
        })
        .finally(() => {
          setSummary({
            answeredQuestions:
              answeredQuestions.length,
            correctAnswers: correctAnswers.length,
            score,
          });
          setFinished(true);
          dispatch(setExamLoading(false));
        });
    }
  }
  return (
    <Box className={commonStyles.bg_gray}>
      <GoBackHeader
        title={
          examQuestions
            ? examQuestions.title
            : "Экзамен"
        }
        append={
          examQuestions ? (
            <Timer
              minutes={
                finished
                  ? 0
                  : getAllMinutes(
                      examQuestions.duration,
                    )
              }
              onEnd={finishExam}
            />
          ) : undefined
        }
      />
      <Box className={commonStyles.page}>
        {loading ? (
          <Box
            className={
              commonStyles.tube_spinner_wrapper
            }
            sx={{ height: "100vh" }}
          >
            <TubeSpinner
              width={50}
              height={50}
            />
          </Box>
        ) : finished && summary ? (
          <ResultCard
            courseId={courseId}
            {...summary}
          />
        ) : (
          <Questions finishExam={finishExam} />
        )}
      </Box>
    </Box>
  );
}
