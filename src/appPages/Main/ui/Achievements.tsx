import Image from "next/image";

import { Box, Typography } from "@mui/material";

import bookIcon from "@/icons/book.svg";
import eyeIcon from "@/icons/eye.svg";
import teacherIcon from "@/icons/teacher.svg";
import videoCircleIcon from "@/icons/video-circle.svg";

import styles from "./styles.module.scss";

const achievements = [
  {
    icon: bookIcon,
    icon_alt: "book icon",
    score: "7",
    subtitle: "Предметов",
  },
  {
    icon: videoCircleIcon,
    icon_alt: "video circle icon",
    score: "365",
    subtitle: "уроков",
  },
  {
    icon: teacherIcon,
    icon_alt: "teacher icon",
    score: "294229",
    subtitle: "студентов",
  },
  {
    icon: eyeIcon,
    icon_alt: "eye icon",
    score: "3052760",
    subtitle: "просмотров уроков",
  },
];

export default function Achievements() {
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
