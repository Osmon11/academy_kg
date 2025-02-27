"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import {
  Box,
  CardActionArea,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { formatThePrice } from "@/shared/functions";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { ICourseListItem } from "@/shared/types";

import styles from "./CourseCard.module.scss";

interface ICourseCardProps {
  course: ICourseListItem;
}

export function CourseCard({
  course,
}: ICourseCardProps) {
  const t = useTranslations("CourseCard");
  const router = useAppRouter();
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
  const cost =
    Number(course.price) > 0
      ? t("som", {
          price: formatThePrice(
            Number(course.price),
          ),
        })
      : t("besplatno");
  return (
    <CardActionArea
      className={styles.course_card}
      onClick={() =>
        router.push("[course]", {
          dynamicPaths: { course: course.id },
        })
      }
    >
      <Box
        className={styles.flex_box}
        sx={{ gap: "10px" }}
      >
        <Box>
          <Typography
            variant="h5"
            color="secondary"
            fontWeight={700}
            sx={{
              textAlign: {
                xs: "center",
                sm: "start",
              },
            }}
          >
            {course.title}
          </Typography>
          <Typography
            variant={upLg ? "h6" : "body1"}
            color="textSecondary"
            sx={{
              marginTop: "8px",
              textAlign: {
                xs: "center",
                sm: "start",
              },
            }}
          >
            {course.description}
          </Typography>
        </Box>
        {!onlyXs && !onlyMd && (
          <Box className={styles.price}>
            <Typography
              variant="h6"
              fontWeight={600}
              lineHeight="24px"
            >
              {cost}
            </Typography>
          </Box>
        )}
      </Box>
      <Box className={styles.flex_box}>
        <Box
          sx={
            onlyXs
              ? {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }
              : undefined
          }
        >
          {(onlyXs || onlyMd) && (
            <Box className={styles.price}>
              <Typography
                variant={upLg ? "h6" : "body1"}
                fontWeight={600}
                lineHeight={
                  upLg ? "24px" : "18px"
                }
              >
                {cost}
              </Typography>
            </Box>
          )}
          <Typography
            variant="body1"
            color="textTertiary"
            fontWeight={700}
            sx={{
              textAlign: {
                xs: "center",
                sm: "start",
              },
              marginTop: { xs: "20px" },
            }}
          >
            {t("prepodavatel")}
          </Typography>
          <Typography
            variant={upLg ? "h6" : "body1"}
            color="textSecondary"
            fontWeight={600}
            sx={{
              textAlign: {
                xs: "center",
                sm: "start",
              },
            }}
          >
            {course.teacher
              ? course.teacher.full_name
              : t("ne-naznachen")}
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
    </CardActionArea>
  );
}
