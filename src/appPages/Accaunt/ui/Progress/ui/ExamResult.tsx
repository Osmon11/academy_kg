import Image from "next/image";

import {
  Box,
  Paper,
  Rating,
  Typography,
} from "@mui/material";

import { IExamResults } from "@/shared/types";

import starGrayIcon from "@/icons/star-gray.svg";
import starPrimaryIcon from "@/icons/star-primary.svg";

import styles from "../styles.module.scss";

export default function ExamResult({
  results,
}: {
  results: IExamResults;
}) {
  return (
    <Box className={styles.carousel_item}>
      <Paper className={styles.lesson_card}>
        <Box>
          <Rating
            value={
              results.is_passed
                ? Math.round(
                    results.pass_points /
                      (results.point_sum / 5),
                  )
                : 0
            }
            readOnly
            sx={{ gap: "6px" }}
            icon={
              <Image
                src={starPrimaryIcon}
                alt="star green icon"
                width={14}
                height={14}
              />
            }
            emptyIcon={
              <Image
                src={starGrayIcon}
                alt="star gray icon"
                width={14}
                height={14}
              />
            }
          />
          <Typography
            fontSize="14px"
            fontWeight={600}
            color="primary"
            lineHeight="16px"
          >
            {`${results.is_passed ? `Вы набрали ${results.point_sum} баллов` : `Проходной балл ${results.pass_points}`} из ${results.max_points}`}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          color="#A3A3A3"
        >
          Экзамен
        </Typography>
      </Paper>
    </Box>
  );
}
