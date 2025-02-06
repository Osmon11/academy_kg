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
        {`${course.title} (${courseLevels.level}-уровень)`}
      </Typography>
      <Box className={styles.content}>
        <Box className={styles.item}>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            Просмотрено уроков:
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="right"
          >{`${courseLevels.finished_count} из ${courseLevels.lessons.length}`}</Typography>
        </Box>
        <Box className={styles.item}>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            Необходимый минимум баллов:
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="right"
          >
            {courseLevels.exam?.pass_points ??
              "Не указано"}
          </Typography>
        </Box>
        <Box className={styles.item}>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            Пересдача доступна:
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="right"
          >
            через 1 сутки
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
        Начать
      </Button>
    </Paper>
  ) : (
    "No course in store"
  );
}
