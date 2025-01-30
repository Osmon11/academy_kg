import Image from "next/image";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import axiosInstance from "@/shared/config/axiosClientInstance";

import bookIcon from "@/icons/book.svg";
import eyeIcon from "@/icons/eye.svg";
import teacherIcon from "@/icons/teacher.svg";
import videoCircleIcon from "@/icons/video-circle.svg";

import styles from "../styles.module.scss";

export default function Achievements() {
  const [achievements, setAchievements] =
    useState([
      {
        icon: bookIcon,
        icon_alt: "book icon",
        score: 0,
        subtitle: "Предметов",
        key: "courses",
      },
      {
        icon: videoCircleIcon,
        icon_alt: "video circle icon",
        score: 0,
        subtitle: "уроков",
        key: "lessons",
      },
      {
        icon: teacherIcon,
        icon_alt: "teacher icon",
        score: 0,
        subtitle: "студентов",
        key: "students",
      },
      {
        icon: eyeIcon,
        icon_alt: "eye icon",
        score: 0,
        subtitle: "просмотров уроков",
        key: "views",
      },
    ]);

  useEffect(() => {
    axiosInstance
      .get("/auth/site_statistics/")
      .then((res) => {
        if (res.data) {
          setAchievements((state) => {
            const result: typeof state = [];
            state.forEach((item) => {
              item.score = res.data[item.key];
              result.push(item);
            });
            return result;
          });
        }
      });
  }, []);
  return (
    <Box className={styles.scores_wrapper}>
      {achievements.map((achievement) => (
        <Box
          className={styles.achievement}
          key={achievement.subtitle}
        >
          <Box className={styles.icon}>
            <Image
              src={achievement.icon}
              alt={achievement.icon_alt}
              width={60}
              height={60}
            />
          </Box>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={700}
            sx={{ marginTop: "12px" }}
          >
            {achievement.score}
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            textTransform="uppercase"
            sx={{
              marginTop: "6px",
              lineHeight: "25px",
            }}
          >
            {achievement.subtitle}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
