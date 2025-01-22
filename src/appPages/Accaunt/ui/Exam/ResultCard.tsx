import Link from "next/link";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";

import styles from "./styles.module.scss";

export default function ResultCard() {
  const { examQuestions, results } =
    useAppSelector((store) => store.exam);
  const answeredQuestions = results.filter(
    (i) => !i.skipped,
  );
  const correctAnswers = answeredQuestions.filter(
    (i) => i.correctAnswer,
  );
  const score = correctAnswers.reduce(
    (acc, item) => acc + item.point,
    0,
  );
  const examPassed =
    examQuestions &&
    score >= examQuestions?.pass_points;
  return (
    <Box className={styles.wrapper}>
      <Paper className={styles.question_card}>
        <Typography
          variant="body1"
          fontWeight={600}
          color="textSecondary"
          textAlign="center"
        >
          Результаты экзамена
        </Typography>
        {examQuestions ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Box
              className={styles.item}
              sx={{
                paddingBottom: "10px",
                borderBottom: "1px solid #E5E5E5",
              }}
            >
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >
                Дано ответов:
              </Typography>
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >{`${answeredQuestions.length} из ${examQuestions.questions.length}`}</Typography>
            </Box>
            <Box
              className={styles.item}
              sx={{
                paddingBottom: "10px",
                borderBottom: "1px solid #E5E5E5",
              }}
            >
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >
                Из них правильно:
              </Typography>
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >
                {correctAnswers.length}
              </Typography>
            </Box>
            <Box
              className={styles.item}
              sx={{
                paddingBottom: "10px",
                borderBottom: "1px solid #E5E5E5",
              }}
            >
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >
                Проходной балл:
              </Typography>
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >{`${examQuestions.pass_points} из ${examQuestions.point_sum}`}</Typography>
            </Box>
            <Box
              className={styles.item}
              sx={{
                paddingBottom: "10px",
                borderBottom: "1px solid #E5E5E5",
              }}
            >
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >
                Ваш результат:
              </Typography>
              <Typography
                variant="body1"
                color="textThirtiary"
                fontWeight={600}
              >{`${score} из ${examQuestions.point_sum}`}</Typography>
            </Box>
          </Box>
        ) : (
          <Typography
            variant="body1"
            color="error"
            textAlign="center"
          >
            Осутствуют данные об экзамене
          </Typography>
        )}
        <Typography
          variant="h4"
          fontWeight={600}
          color={
            examPassed ? "primary" : "secondary"
          }
          textAlign="center"
        >{`ЭКЗАМЕН ${examPassed ? "" : "НЕ "}СДАН`}</Typography>
      </Paper>
      <Link href={routePath("accaunt")}>
        <Button
          variant="text"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            textTransform: "none",
            marginTop: "40px",
          }}
        >
          Вернуться на главный экран
        </Button>
      </Link>
    </Box>
  );
}
