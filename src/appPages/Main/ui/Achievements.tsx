import Image from "next/image";

import { Typography } from "@mui/material";

import styles from "./styles.module.scss";

const achievements = [
  {
    icon: "/icons/book.webp",
    icon_alt: "book icon",
    score: "7",
    subtitle: "Предметов",
  },
  {
    icon: "/icons/video-circle.webp",
    icon_alt: "video circle icon",
    score: "365",
    subtitle: "уроков",
  },
  {
    icon: "/icons/teacher.webp",
    icon_alt: "teacher icon",
    score: "294229",
    subtitle: "студентов",
  },
  {
    icon: "/icons/eye.webp",
    icon_alt: "eye icon",
    score: "3052760",
    subtitle: "просмотров уроков",
  },
];

export default function Achievements() {
  return (
    <div className={styles.scores_wrapper}>
      {achievements.map((achievement) => (
        <div
          className={styles.achievement}
          key={achievement.subtitle}
        >
          <div className={styles.icon}>
            <Image
              src={achievement.icon}
              alt={achievement.icon_alt}
              width={60}
              height={60}
            />
          </div>
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
        </div>
      ))}
    </div>
  );
}
