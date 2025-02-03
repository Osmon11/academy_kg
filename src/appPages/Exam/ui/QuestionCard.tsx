import classNames from "classnames";
import Image from "next/image";
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { shuffleValues } from "@/shared/functions";
import {
  IAnswer,
  IQuestion,
} from "@/shared/types";

import arrowLeftGrayCoalIcon from "@/icons/arrow-left-gray-coal.svg";
import arrowRightBoldBlackIcon from "@/icons/arrow-right-bold-black.svg";
import arrowRightBoldPrimaryIcon from "@/icons/arrow-right-bold-primary.svg";
import arrowRightBoldSecondaryIcon from "@/icons/arrow-right-bold-secondary.svg";
import arrowRightGrayCoalIcon from "@/icons/arrow-right-gray-coal.svg";
import arrowRightIcon from "@/icons/arrow-right.svg";
import radioUncheckedIcon from "@/icons/radio-unchecked.svg";

import styles from "../styles.module.scss";
import Arrow, { IArrowProps } from "./Arrow";

interface IArrow extends Partial<IArrowProps> {
  key: string;
  value: string;
}

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
  const theme = useTheme();
  const [userAnswer, setUserAnswer] = useState<
    string | null
  >(null);
  const [isCorrect, setIsCorrect] =
    useState(false);
  const [arrowStart, setArrowStart] =
    useState<Omit<IArrow, "value"> | null>(null);
  const [arrows, setArrows] = useState<IArrow[]>(
    [],
  );
  const [isClient, setIsClient] = useState(false);
  const randomizedValues = useMemo<
    IAnswer[] | undefined
  >(
    () =>
      isClient &&
      question.answers.length > 0 &&
      question.answers[0].key
        ? shuffleValues(question.answers)
        : undefined,
    [question, isClient],
  );

  // Detect if we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      {question.answers.length > 0 ? (
        <Box className={styles.answers}>
          {randomizedValues ? (
            <Fragment>
              {randomizedValues.map((item) => {
                const arrowKey = arrows.find(
                  (i) => i.key === item.key,
                );
                const arrowValue = arrows.find(
                  (i) => i.value === item.value,
                );
                return (
                  <Box
                    className={styles.item}
                    key={item.id}
                  >
                    <Chip
                      label={item.key}
                      variant="outlined"
                      color={
                        arrowKey
                          ? arrowKey.color
                          : "default"
                      }
                      clickable={!arrowKey}
                      onClick={(event) => {
                        if (!arrowKey) {
                          const startRect =
                            event.currentTarget.getBoundingClientRect();
                          setArrowStart({
                            key: item.key,
                            start: {
                              x:
                                startRect.right +
                                5,
                              y:
                                startRect.top +
                                startRect.height /
                                  2,
                            },
                          });
                        }
                      }}
                      className={classNames({
                        [styles.active_chip]:
                          !arrowKey &&
                          arrowStart &&
                          arrowStart.key ===
                            item.key,
                      })}
                    />
                    <Button
                      variant="text"
                      sx={{
                        color: arrowValue?.color
                          ? theme.palette[
                              arrowValue.color
                            ].main
                          : theme.palette.text
                              .secondary,
                      }}
                      startIcon={
                        <Image
                          src={
                            arrowValue?.color
                              ? arrowValue.color ===
                                "primary"
                                ? arrowRightBoldPrimaryIcon
                                : arrowRightBoldSecondaryIcon
                              : arrowRightBoldBlackIcon
                          }
                          alt={`arrow right ${arrowValue?.color ? (arrowValue.color === "primary" ? "green" : "orange") : "black"} bold icon`}
                          width={24}
                          height={24}
                        />
                      }
                      onClick={(event) => {
                        if (arrowStart) {
                          const endRect =
                            event.currentTarget.getBoundingClientRect();
                          const isCorrect =
                            Boolean(
                              question.answers.find(
                                (i) =>
                                  i.key ===
                                    arrowStart.key &&
                                  i.value ===
                                    item.value,
                              ),
                            );
                          setArrows((state) => [
                            ...state,
                            {
                              key: arrowStart.key,
                              value: item.value,
                              start:
                                arrowStart.start,
                              end: {
                                x: endRect.left,
                                y:
                                  endRect.top +
                                  endRect.height /
                                    2,
                              },
                              color: isCorrect
                                ? "primary"
                                : "secondary",
                            },
                          ]);
                          setArrowStart(null);
                        }
                      }}
                      disabled={Boolean(
                        arrowValue,
                      )}
                    >
                      {item.value}
                    </Button>
                  </Box>
                );
              })}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Button
                  variant="text"
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    if (arrowStart) {
                      setArrowStart(null);
                    } else {
                      setArrows(
                        arrows.slice(0, -1),
                      );
                    }
                  }}
                >
                  отмена
                </Button>
                <Button
                  variant="text"
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    setArrowStart(null);
                    setArrows([]);
                  }}
                >
                  сброс
                </Button>
              </Box>
            </Fragment>
          ) : (
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
          )}
        </Box>
      ) : (
        <Typography
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
          sx={{
            width: "100%",
            margin: "12px 0px",
          }}
        >
          Нет ответов на вопрос
        </Typography>
      )}
      {arrows.map((item) =>
        item.start && item.end && item.color ? (
          <Arrow
            key={item.key + item.value}
            start={item.start}
            end={item.end}
            color={item.color}
          />
        ) : null,
      )}
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
        {userAnswer || arrows.length > 0 ? (
          <Button
            className={styles.button}
            variant="convex"
            onClick={() => {
              onNext(
                randomizedValues
                  ? arrows.length > 0 &&
                      !arrows.some(
                        (i) =>
                          i.color === "secondary",
                      )
                  : isCorrect,
              );
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
