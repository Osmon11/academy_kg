import Image from "next/image";

import { Box, Typography } from "@mui/material";

import { formatThePrice } from "@/shared/functions/formatThePrice";
import { ICourseListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function CourseList({
  courses,
}: {
  courses: ICourseListItem[];
}) {
  return (
    <Box className={styles.courses_wrapper}>
      {courses.map((item) => (
        <Box
          key={item.id}
          className={styles.course_card}
        >
          <Box className={styles.flex_column}>
            <Box>
              <Typography
                variant="h5"
                color="secondary"
                fontWeight={700}
              >
                {item.title}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ marginTop: "8px" }}
              >
                {item.description}
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
                {item.teacher}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.flex_column}>
            <Box className={styles.price}>
              <Typography
                variant="h6"
                fontWeight={600}
              >
                {formatThePrice(item.price)}
              </Typography>
            </Box>
            <Image
              src={item.image}
              alt={item.title}
              width={160}
              height={160}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
