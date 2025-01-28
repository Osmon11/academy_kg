import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";

import documentDownloadIcon from "@/icons/document-download.svg";

import styles from "../styles.module.scss";

interface IResultCardProps {
  levelId: string;
  answeredQuestions: number;
  correctAnswers: number;
  score: number;
}

export default function ResultCard({
  levelId,
  answeredQuestions,
  correctAnswers,
  score,
}: IResultCardProps) {
  const { examQuestions } = useAppSelector(
    (store) => store.exam,
  );
  const [loading, setLoading] = useState(false);

  function fetchCertificate() {
    setLoading(true);
    axiosInstance
      .get(`/auth/certificate/${levelId}/`)
      .then((res) => {
        if (res?.data?.file_url) {
          window.open(
            res.data.file_url,
            "_blank",
          );
        }
      })
      .finally(() => setLoading(false));
  }

  const examPassed = examQuestions
    ? score >= examQuestions?.pass_points
    : false;
  return (
    <Box className={styles.wrapper}>
      <Paper className={styles.question_card}>
        <Typography
          variant="h5"
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
              gap: { xs: "20px", md: "30px" },
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
                color="textTertiary"
                fontWeight={600}
              >
                Дано ответов:
              </Typography>
              <Typography
                variant="body1"
                color="textTertiary"
                fontWeight={600}
              >{`${answeredQuestions} из ${examQuestions.questions.length}`}</Typography>
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
                color="textTertiary"
                fontWeight={600}
              >
                Из них правильно:
              </Typography>
              <Typography
                variant="body1"
                color="textTertiary"
                fontWeight={600}
              >
                {correctAnswers}
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
                color="textTertiary"
                fontWeight={600}
              >
                Проходной балл:
              </Typography>
              <Typography
                variant="body1"
                color="textTertiary"
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
                color="textTertiary"
                fontWeight={600}
              >
                Ваш результат:
              </Typography>
              <Typography
                variant="body1"
                color="textTertiary"
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
        <Box>
          <Typography
            variant="h4"
            fontWeight={600}
            color={
              examPassed ? "primary" : "secondary"
            }
            textAlign="center"
          >{`ЭКЗАМЕН ${examPassed ? "" : "НЕ "}СДАН`}</Typography>
          {examPassed && (
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="convex"
                color="secondary"
                size="small"
                onClick={fetchCertificate}
                disabled={loading}
                endIcon={
                  <Image
                    src={documentDownloadIcon}
                    alt="document download icon"
                    width={20}
                    height={20}
                  />
                }
              >
                {loading
                  ? "Подождите..."
                  : "Cкачать сертификат"}
              </Button>
            </Box>
          )}
        </Box>
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
