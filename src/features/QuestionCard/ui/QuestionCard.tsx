import Image from "next/image";
import { useState } from "react";

import {
  Box,
  Button,
  ButtonProps,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { IQuestion } from "@/shared/types";

import arrowLeftGrayCoalIcon from "@/icons/arrow-left-gray-coal.svg";
import arrowRightGrayCoalIcon from "@/icons/arrow-right-gray-coal.svg";
import arrowRightIcon from "@/icons/arrow-right.svg";
import radioUncheckedIcon from "@/icons/radio-unchecked.svg";

import styles from "./QuestionCard.module.scss";

interface IQuestionCardProps {
  question: IQuestion;
  backButtonProps: ButtonProps;
  nextButtonProps: ButtonProps;
  skipButtonProps: ButtonProps;
}

export function QuestionCard({
  question,
  backButtonProps,
  nextButtonProps,
  skipButtonProps,
}: IQuestionCardProps) {
  const [userAnswer, setUserAnswer] =
    useState<string>();
  return (
    <Paper className={styles.question_card}>
      <Box>
        <Typography
          variant="h6"
          fontWeight={600}
          color="textSecondary"
          textAlign="center"
        >
          {question.question}
        </Typography>
        <Box className={styles.answers}>
          <RadioGroup
            value={userAnswer}
            onChange={(_, value) =>
              setUserAnswer(value)
            }
          >
            {question.answers.map((answer) => (
              <FormControlLabel
                key={answer.id}
                label={answer.key}
                value={answer.value}
                control={
                  <Radio
                    icon={
                      <Image
                        src={radioUncheckedIcon}
                        alt="radio unchecked icon"
                        width={24}
                        height={24}
                      />
                    }
                  />
                }
              />
            ))}
            {/* <Box
              className={styles.item}
              key={answer.id}
            >
              <Chip label={answer.key} />
              <Typography>
                {answer.value}
              </Typography>
            </Box> */}
          </RadioGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Button
            variant="convex"
            color="white"
            {...backButtonProps}
            startIcon={
              <Image
                src={arrowLeftGrayCoalIcon}
                alt="arrow left gray coal icon"
                width={24}
                height={24}
              />
            }
          >
            Назад
          </Button>
          {userAnswer ? (
            <Button
              variant="convex"
              {...nextButtonProps}
              endIcon={
                <Image
                  src={arrowRightIcon}
                  alt="arrow right icon"
                  width={24}
                  height={24}
                />
              }
              sx={{ minHeight: "50px" }}
            >
              Далее
            </Button>
          ) : (
            <Button
              variant="convex"
              color="white"
              {...skipButtonProps}
              endIcon={
                <Image
                  src={arrowRightGrayCoalIcon}
                  alt="arrow right gray coal icon"
                  width={24}
                  height={24}
                />
              }
            >
              Пропустить
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
