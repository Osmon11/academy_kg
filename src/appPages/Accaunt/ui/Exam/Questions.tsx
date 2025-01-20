import { useState } from "react";

import {
  Box,
  Step,
  Stepper,
  Typography,
} from "@mui/material";

import { QuestionCard } from "@/features/QuestionCard";

import { useAppSelector } from "@/shared/config/store";

export default function Questions() {
  const examQuestions = useAppSelector(
    (store) => store.exam.examQuestions,
  );
  const [activeQuestion, setActiveQuestion] =
    useState(0);
  return examQuestions ? (
    <Box>
      <Stepper
        activeStep={activeQuestion}
        connector={null}
        sx={{
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
                  textDecoration:
                    activeQuestion === index
                      ? "underline"
                      : "none",
                }}
              >
                {index + 1}
              </Typography>
            </Step>
          ),
        )}
      </Stepper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QuestionCard
          question={
            examQuestions.questions[
              activeQuestion
            ]
          }
          backButtonProps={{
            disabled: activeQuestion <= 0,
            onClick: () =>
              setActiveQuestion(
                (state) => state - 1,
              ),
          }}
          nextButtonProps={{
            onClick: () =>
              setActiveQuestion(
                (state) => state + 1,
              ),
          }}
          skipButtonProps={{
            disabled:
              activeQuestion + 1 ===
              examQuestions.questions.length,
            onClick: () =>
              setActiveQuestion(
                (state) => state + 1,
              ),
          }}
        />
      </Box>
    </Box>
  ) : null;
}
