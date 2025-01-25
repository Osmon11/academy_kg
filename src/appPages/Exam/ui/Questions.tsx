import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Step,
  Stepper,
  Typography,
} from "@mui/material";

import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import { setResults } from "@/shared/model";

import styles from "../styles.module.scss";
import { QuestionCard } from "./QuestionCard";

interface IQuestionsProps {
  finishExam: () => void;
}

export default function Questions({
  finishExam,
}: IQuestionsProps) {
  const dispatch = useAppDispatch();
  const { examQuestions, results } =
    useAppSelector((store) => store.exam);
  const [activeQuestion, setActiveQuestion] =
    useState(0);
  const [finishExamModal, setFinishExamModal] =
    useState(false);

  useEffect(
    () => () => {
      setActiveQuestion(0);
      setFinishExamModal(false);
    },
    [],
  );

  function updateResults(
    skipped: boolean,
    correctAnswer = false,
  ) {
    if (examQuestions) {
      const newState = [...results];
      newState[activeQuestion] = {
        ...examQuestions.questions[
          activeQuestion
        ],
        skipped,
        correctAnswer,
      };
      dispatch(setResults(newState));
      if (
        activeQuestion + 1 ===
        examQuestions.questions.length
      ) {
        finishExam();
      } else {
        setActiveQuestion((state) => state + 1);
      }
    }
  }
  return examQuestions ? (
    <Box>
      <Stepper
        activeStep={activeQuestion}
        connector={null}
        sx={{
          marginTop: "20px",
          justifyContent: "center",
          gap: { md: "20px", lg: "40px" },
        }}
      >
        {examQuestions.questions.map(
          (item, index) => (
            <Step
              key={item.id}
              completed={activeQuestion > index}
            >
              <Box
                sx={{
                  borderBottom:
                    activeQuestion === index
                      ? "2px solid #1DA599"
                      : "none",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    color:
                      activeQuestion === index
                        ? "#1DA599"
                        : index > activeQuestion
                          ? "#D9D9D9"
                          : "#A3D6C9",
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
            </Step>
          ),
        )}
      </Stepper>
      <Box className={styles.wrapper}>
        <QuestionCard
          question={
            examQuestions.questions[
              activeQuestion
            ]
          }
          onBack={() =>
            setActiveQuestion(
              (state) => state - 1,
            )
          }
          firstQuestion={activeQuestion <= 0}
          onSkip={() => updateResults(true)}
          onNext={(isCorrect) =>
            updateResults(false, isCorrect)
          }
        />
        <Button
          variant="text"
          onClick={() => setFinishExamModal(true)}
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            textTransform: "none",
            marginTop: { xs: "20px", md: "40px" },
          }}
        >
          Завершить экзамен
        </Button>
        <Dialog
          open={finishExamModal}
          onClose={() =>
            setFinishExamModal(false)
          }
        >
          <DialogTitle color="textSecondary">
            Завершить экзамен?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Некоторые задания остались
              нерешенными. Вы дейстивительно
              хотите завершить экзамен, пропустив
              их?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              onClick={() =>
                setFinishExamModal(false)
              }
            >
              отмена
            </Button>
            <Button
              variant="text"
              onClick={finishExam}
            >
              Завершить экзамен
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  ) : null;
}
