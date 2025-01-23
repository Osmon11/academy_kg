import Image from "next/image";
import { useState } from "react";

import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { IQuestion } from "@/shared/types";

import arrowLeftGrayCoalIcon from "@/icons/arrow-left-gray-coal.svg";
// import arrowRightBoldBlackIcon from "@/icons/arrow-right-bold-black.svg";
// import arrowRightBoldPrimaryIcon from "@/icons/arrow-right-bold-primary.svg";
// import arrowRightBoldSecondaryIcon from "@/icons/arrow-right-bold-secondary.svg";
import arrowRightGrayCoalIcon from "@/icons/arrow-right-gray-coal.svg";
import arrowRightIcon from "@/icons/arrow-right.svg";
import radioUncheckedIcon from "@/icons/radio-unchecked.svg";

import styles from "./styles.module.scss";

interface IQuestionCardProps {
  question: IQuestion;
  firstQuestion: boolean;
  onBack: () => void;
  onSkip: () => void;
  onNext: (isCorrect: boolean) => void;
}

export function QuestionCard({
  question,
  firstQuestion,
  onBack,
  onSkip,
  onNext,
}: IQuestionCardProps) {
  const [userAnswer, setUserAnswer] = useState<
    string | null
  >(null);
  const [isCorrect, setIsCorrect] =
    useState(false);

  function clear() {
    setUserAnswer(null);
    setIsCorrect(false);
  }

  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  return (
    <Paper className={styles.question_card}>
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
          onChange={(_, value) => {
            setUserAnswer(value);
            setIsCorrect(
              question.answers.find(
                (i) => i.value === value,
              )?.is_correct ?? false,
            );
          }}
        >
          {question.answers.map((answer) => (
            <FormControlLabel
              key={answer.id}
              className={styles.label}
              label={answer.value}
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
        </RadioGroup>
        {/* {question.answers[0].key ? (
          question.answers.map((item) => (
            <Box
              className={styles.item}
              key={item.id}
            >
              <Chip
                label={item.key}
                variant="outlined"
                color="default"
                clickable
                onClick={(event) => {
                  setArrowStart({
                    value: item,
                    position: {
                      x: event.clientX,
                      y: event.clientX,
                    },
                  });
                }}
                className={classNames({
                  [styles.active_chip]:
                    arrowStart &&
                    arrowStart.value.id ===
                      item.id,
                })}
              />
              <Box
                className={classNames(
                  styles.value_wrapper,
                  { [styles.active]: arrowStart },
                )}
                onClick={(event) => {
                  if (arrowStart) {
                    setArrows((state) => [
                      ...state,
                      {
                        start:
                          arrowStart.position,
                        end: {
                          x: event.clientX,
                          y: event.clientX,
                        },
                        color: "primary",
                      },
                    ]);
                  }
                }}
              >
                <Image
                  src={arrowRightBoldBlackIcon}
                  alt="arrow right"
                  width={24}
                  height={24}
                />
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
          ))
        ) : } */}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button
          className={styles.button}
          variant="convex"
          color="white"
          onClick={() => {
            onBack();
            clear();
          }}
          disabled={firstQuestion}
          startIcon={
            upSm ? (
              <Image
                src={arrowLeftGrayCoalIcon}
                alt="arrow left gray coal icon"
                width={24}
                height={24}
              />
            ) : undefined
          }
        >
          Назад
        </Button>
        {userAnswer ? (
          <Button
            className={styles.button}
            variant="convex"
            onClick={() => {
              onNext(isCorrect);
              clear();
            }}
            endIcon={
              upSm ? (
                <Image
                  src={arrowRightIcon}
                  alt="arrow right icon"
                  width={24}
                  height={24}
                />
              ) : undefined
            }
            sx={{ minHeight: "50px" }}
          >
            Далее
          </Button>
        ) : (
          <Button
            className={styles.button}
            variant="convex"
            color="white"
            onClick={() => {
              onSkip();
              clear();
            }}
            endIcon={
              upSm ? (
                <Image
                  src={arrowRightGrayCoalIcon}
                  alt="arrow right gray coal icon"
                  width={24}
                  height={24}
                />
              ) : undefined
            }
          >
            Пропустить
          </Button>
        )}
      </Box>
    </Paper>
  );
}
