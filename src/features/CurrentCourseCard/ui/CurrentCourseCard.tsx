import Image from "next/image";
import Link from "next/link";

import {
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";

import {
  getPercentage,
  routePath,
} from "@/shared/functions";
import { IMyCourseListItem } from "@/shared/types";

import playCirclePrimaryIcon from "@/icons/play-circle-primary.svg";
import starCirclePrimaryIcon from "@/icons/star-circle-primary.svg";

import styles from "./CurrentCourseCard.module.scss";

interface ICurrentCourseCardProps {
  course: IMyCourseListItem;
}

export function CurrentCourseCard({
  course,
}: ICurrentCourseCardProps) {
  return (
    <Link
      href={routePath("study", {
        id: course.id,
      })}
    >
      <Box className={styles.course_card}>
        <Box className={styles.flex_column}>
          <Box>
            <Typography
              variant="h5"
              color="secondary"
              fontWeight={700}
            >
              {course.title}
            </Typography>
            <Box sx={{ marginTop: "30px" }}>
              <Image
                src={playCirclePrimaryIcon}
                alt="play circle green icon"
                width={24}
                height={24}
              />
              <Image
                src={starCirclePrimaryIcon}
                alt="star circle green icon"
                width={24}
                height={24}
              />
            </Box>
          </Box>
          {course.detail ? (
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {`Пройдено: ${course.detail.finished_count}/${course.detail.lesson_count}`}
            </Typography>
          ) : null}
        </Box>
        <Box className={styles.flex_column}>
          {course.detail ? (
            <Box className={styles.price}>
              <Typography
                variant="h6"
                fontWeight={600}
                lineHeight="24px"
              >
                {`Уровень ${course.detail.level}`}
              </Typography>
            </Box>
          ) : (
            <Box />
          )}
          {course.icon ? (
            <Image
              src={course.icon}
              alt={course.title}
              width={160}
              height={160}
            />
          ) : null}
        </Box>
        {course.detail ? (
          <Box className={styles.progress_bar}>
            <LinearProgress
              variant="determinate"
              value={getPercentage(
                course.detail.finished_count,
                course.detail.lesson_count,
              )}
              sx={{ width: "100%" }}
            />
          </Box>
        ) : null}
      </Box>
    </Link>
  );
}
