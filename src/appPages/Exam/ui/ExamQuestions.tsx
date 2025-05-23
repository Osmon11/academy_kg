import { useTranslations } from "next-intl";
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

interface IExamQuestionsProps {
  finishExam: () => void;
}

export default function ExamQuestions({
  finishExam,
}: IExamQuestionsProps) {
  const t = useTranslations("ExamQuestions");
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
  return examQuestions &&
    examQuestions.questions.length > 0 ? (
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
          {t("zavershit-ekzamen")}
        </Button>
        <Dialog
          open={finishExamModal}
          onClose={() =>
            setFinishExamModal(false)
          }
        >
          <DialogTitle color="textSecondary">
            {t("zavershit-ekzamen")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t(
                "nekotorye-zadaniya-ostalis-nereshennymi",
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              onClick={() =>
                setFinishExamModal(false)
              }
            >
              {t("otmena")}
            </Button>
            <Button
              variant="text"
              onClick={finishExam}
            >
              {t("zavershit-ekzamen")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  ) : (
    <Typography
      textAlign="center"
      color="textSecondary"
      fontWeight={600}
      sx={{ width: "100%", margin: "12px 0px" }}
    >
      {t("net-voprosov")}
    </Typography>
  );
}
