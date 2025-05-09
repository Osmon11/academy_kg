"use client";

import { useTranslations } from "next-intl";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { getAllSeconds } from "@/shared/functions";
import {
  setExamLoading,
  setExamQuestions,
} from "@/shared/model";
import { IExamQuestions } from "@/shared/types";

import ExamQuestions from "./ui/ExamQuestions";
import ResultCard from "./ui/ResultCard";

interface IExamPageProps {
  courseId: string;
  examId: string;
  levelId: string;
}

export function ExamPage({
  examId,
  levelId,
}: IExamPageProps) {
  const t = useTranslations("ExamPage");
  const dispatch = useAppDispatch();
  const { examQuestions, results, loading } =
    useAppSelector((store) => store.exam);
  const [summary, setSummary] = useState<{
    answeredQuestions: number;
    correctAnswers: number;
    score: number;
  }>();
  const [finished, setFinished] = useState(false);
  const effectCalled = useRef(false);

  useEffect(() => {
    if (!effectCalled.current) {
      effectCalled.current = true;
      dispatch(setExamLoading(true));
      axiosInstance
        .get<IExamQuestions>(
          `/academy/start_exam/${examId}`,
        )
        .then((res) => {
          if (res?.data) {
            dispatch(setExamQuestions(res.data));
          }
        })
        .finally(() => {
          dispatch(setExamLoading(false));
        });
    }
    return () => {
      setSummary(undefined);
      setFinished(false);
    };
  }, [dispatch, examId]);

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
          `/academy/finish_exam/${levelId}/`,
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
    <Fragment>
      <GoBackHeader
        title={
          examQuestions
            ? examQuestions.title
            : t("ekzamen")
        }
        append={
          examQuestions &&
          examQuestions.questions.length > 0 ? (
            <Timer
              seconds={
                finished
                  ? 0
                  : getAllSeconds(
                      examQuestions.duration,
                    )
              }
              onEnd={finishExam}
            />
          ) : undefined
        }
      />
      <main>
        <Box
          className="page"
          sx={{
            minHeight: {
              xs: "calc(100vh - 72px)",
              md: "calc(100vh - 80px)",
            },
          }}
        >
          {loading ? (
            <Box
              className="tube_spinner_wrapper"
              sx={{ height: "100vh" }}
            >
              <TubeSpinner
                width={50}
                height={50}
              />
            </Box>
          ) : finished && summary ? (
            <ResultCard
              levelId={levelId}
              {...summary}
            />
          ) : (
            <ExamQuestions
              finishExam={finishExam}
            />
          )}
        </Box>
      </main>
    </Fragment>
  );
}
