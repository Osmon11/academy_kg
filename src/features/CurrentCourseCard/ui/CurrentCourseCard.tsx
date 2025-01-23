import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Box,
  LinearProgress,
  Typography,
  useMediaQuery,
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
  const router = useRouter();
  const onlyXs = useMediaQuery((theme) =>
    theme.breakpoints.only("xs"),
  );
  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  const onlyMd = useMediaQuery((theme) =>
    theme.breakpoints.only("md"),
  );
  const upLg = useMediaQuery((theme) =>
    theme.breakpoints.up("lg"),
  );
  return (
    <Box
      className={styles.course_card}
      onClick={() =>
        router.push(
          routePath("study", {
            id: course.id,
          }),
        )
      }
    >
      <Box className={styles.flex_box}>
        <Box>
          <Typography
            variant="h5"
            color="secondary"
            fontWeight={700}
          >
            {course.title}
          </Typography>
          {course.detail.exam_result !==
          "Passed" ? (
            <Box
              className={styles.lesson_wrapper}
            >
              {course.detail.exam_result !==
              "Not passed" ? (
                <Image
                  src={playCirclePrimaryIcon}
                  alt="play circle green icon"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={starCirclePrimaryIcon}
                  alt="star circle green icon"
                  width={24}
                  height={24}
                />
              )}
              <Typography
                variant={upLg ? "h6" : "body1"}
                color="textSecondary"
              >
                {course.detail.exam_result !==
                "Not passed"
                  ? course.detail.lesson
                  : "Экзамен"}
              </Typography>
            </Box>
          ) : null}
        </Box>
        {!onlyXs && !onlyMd && (
          <Box className={styles.level}>
            <Typography
              className={styles.text}
              variant="h6"
              fontWeight={600}
              lineHeight="24px"
            >
              {`Уровень ${course.detail.level}`}
            </Typography>
          </Box>
        )}
      </Box>
      <Box className={styles.flex_box}>
        <Box>
          {(onlyXs || onlyMd) && (
            <Box className={styles.level}>
              <Typography
                className={styles.text}
                variant="h6"
                fontWeight={600}
                lineHeight="24px"
              >
                {`Уровень ${course.detail.level}`}
              </Typography>
            </Box>
          )}
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ marginTop: { xs: "20px" } }}
          >
            {`Пройдено: ${course.detail.finished_count}/${course.detail.lesson_count}`}
          </Typography>
        </Box>
        {course.icon ? (
          <Image
            src={course.icon}
            alt={course.title}
            width={upSm ? 160 : 130}
            height={upSm ? 160 : 130}
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
  );
}
