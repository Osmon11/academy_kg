import Image from "next/image";
import Link from "next/link";

import { Box, Typography } from "@mui/material";

import {
  formatThePrice,
  routePath,
} from "@/shared/functions";
import { ICourseListItem } from "@/shared/types";

import styles from "./CourseCard.module.scss";

interface ICourseCardProps {
  course: ICourseListItem;
}

export function CourseCard({
  course,
}: ICourseCardProps) {
  return (
    <Link
      href={routePath("[course]", {
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
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ marginTop: "8px" }}
            >
              {course.description}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              color="textThirtiary"
              fontWeight={700}
            >
              Преподаватель
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              fontWeight={600}
              sx={{ marginTop: "8px" }}
            >
              {course.teacher
                ? course.teacher.full_name
                : "Не назначен"}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.flex_column}>
          <Box className={styles.price}>
            <Typography
              variant="h6"
              fontWeight={600}
              lineHeight="24px"
            >
              {formatThePrice(course.price)}
            </Typography>
          </Box>
          {course.icon ? (
            <Image
              src={course.icon}
              alt={course.title}
              width={160}
              height={160}
            />
          ) : null}
        </Box>
      </Box>
    </Link>
  );
}
