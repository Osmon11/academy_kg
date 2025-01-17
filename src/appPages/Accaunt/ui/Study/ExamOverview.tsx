import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { useAppSelector } from "@/shared/config/store";

import styles from "../styles.module.scss";

export default function ExamOverview() {
  const { course, courseLevels } = useAppSelector(
    (store) => store.course,
  );
  return course && courseLevels ? (
    <Paper className={styles.exam_overview}>
      <Typography
        variant="h6"
        fontSize={600}
        color="primary"
        textAlign="center"
      >
        {`${course.title} (${courseLevels.level} уровень)`}
      </Typography>
      <Box className={styles.content}>
        {/* <Box className={styles.item}>
      <Typography variant="body1" color="textSecondary">Просмотрено уроков:</Typography>
      <Typography variant="body1" color="textSecondary">7 из 7</Typography>
    </Box> */}
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
          >
            {courseLevels.exam.pass_points}
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
          >
            через 1 сутки
          </Typography>
        </Box>
      </Box>
      <Button
        variant="convex"
        size="small"
        sx={{ width: "330px" }}
      >
        Начать
      </Button>
    </Paper>
  ) : (
    "No course in store"
  );
}
