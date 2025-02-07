import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppSelector } from "@/shared/config/store";
import { useAppRouter } from "@/shared/hooks/useAppRouter";

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
  const t = useTranslations("ResultCard");
  const router = useAppRouter();
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
          {t("rezultaty-ekzamena")}
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
                {t("dano-otvetov")}
              </Typography>
              <Typography
                variant="body1"
                color="textTertiary"
                fontWeight={600}
              >
                {t("answered-questions", {
                  amount: answeredQuestions,
                  total:
                    examQuestions.questions
                      .length,
                })}
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
                {t("iz-nikh-pravilno")}
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
                {t("prokhodnoi-ball")}
              </Typography>
              <Typography
                variant="body1"
                color="textTertiary"
                fontWeight={600}
              >
                {t("pass-points", {
                  amount:
                    examQuestions.pass_points,
                  total: examQuestions.point_sum,
                })}
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
                {t("vash-rezultat")}
              </Typography>
              <Typography
                variant="body1"
                color="textTertiary"
                fontWeight={600}
              >
                {t("final-score", {
                  amount: score,
                  total: examQuestions.point_sum,
                })}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography
            variant="body1"
            color="error"
            textAlign="center"
          >
            {t("osutstvuyut-dannye-ob-ekzamene")}
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
          >
            {t(
              examPassed
                ? "exam-is-passed"
                : "exam-is-not-passed",
            )}
          </Typography>
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
                  ? t("podozhdite")
                  : t("ckachat-sertifikat")}
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
      <Button
        variant="text"
        onClick={() => router.push("accaunt")}
        sx={{
          fontSize: "22px",
          fontWeight: 700,
          textTransform: "none",
          marginTop: "40px",
        }}
      >
        {t("vernutsya-na-glavnyi-ekran")}
      </Button>
    </Box>
  );
}
