import { useTranslations } from "next-intl";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { useAppSelector } from "@/shared/config/store";
import { useAppRouter } from "@/shared/hooks/useAppRouter";

import styles from "../styles.module.scss";

export default function ExamOverview() {
  const t = useTranslations("ExamOverview");
  const router = useAppRouter();
  const { course, courseLevels } = useAppSelector(
    (store) => store.course,
  );

  return course && courseLevels ? (
    <Paper className={styles.exam_overview}>
      <Typography
        variant="h6"
        fontWeight={600}
        color="primary"
        textAlign="center"
      >
        {t("title-and-level", {
          title: course.title,
          level: courseLevels.level,
        })}
      </Typography>
      <Box className={styles.content}>
        <Box className={styles.item}>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            {t("prosmotreno-urokov")}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="right"
          >
            {t("finished-lessons", {
              amount: courseLevels.finished_count,
              total: courseLevels.lessons.length,
            })}
          </Typography>
        </Box>
        <Box className={styles.item}>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            {t("neobkhodimyi-minimum-ballov")}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="right"
          >
            {courseLevels.exam?.pass_points ??
              t("ne-ukazano")}
          </Typography>
        </Box>
        <Box className={styles.item}>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            {t("peresdacha-dostupna")}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="right"
          >
            {t("cherez-1-sutki")}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="convex"
        size="small"
        onClick={() => {
          if (courseLevels.exam) {
            router.push("exam", {
              dynamicPaths: {
                course: course.id,
                exam: courseLevels.exam.id,
                level: courseLevels.level,
              },
            });
          }
        }}
        disabled={
          !courseLevels.exam ||
          courseLevels.finished_count <
            courseLevels.lessons.length
        }
        sx={{ width: "330px" }}
      >
        {t("nachat")}
      </Button>
    </Paper>
  ) : (
    "No course in store"
  );
}
