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

export default function ExamOverview() {
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
      <Link
        href={routePath("exam", {
          id: course.id,
        })}
      >
        <Button
          variant="convex"
          size="small"
          sx={{ width: "330px" }}
        >
          Начать
        </Button>
      </Link>
    </Paper>
  ) : (
    "No course in store"
  );
}
