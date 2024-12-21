import { Box } from "@mui/material";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";

import styles from "./styles.module.scss";

const teammates = [
  {
    image: "/backgrounds/teammate-1.png",
    fullname: "Асадулла Рахимов",
    subjects: "Руководитель академии",
  },
  {
    image: "/backgrounds/teammate-2.png",
    fullname: "Шамсуддин Каримов",
    subjects: "Администратор учебных программ",
  },
  {
    image: "/backgrounds/teammate-3.png",
    fullname: "Ихтияр Алиев",
    subjects: "Технический специалист",
  },
  {
    image: "/backgrounds/teammate-4.png",
    fullname: "Наимуддин Саидов",
    subjects: "Специалист по работе с учениками",
  },
  {
    image: "/backgrounds/teammate-1.png",
    fullname: "Юнус Кадыров",
    subjects: "Маркетолог",
  },
];

export default function OurTeam() {
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      <div className={styles.teammates_wrapper}>
        {teammates.map(
          (teammate, teammateIndex) => (
            <TeacherCard
              key={
                teammate.fullname + teammateIndex
              }
              {...teammate}
              mediaSx={{
                width: "400px",
                height: "280px",
              }}
              sx={{ width: "400px" }}
            />
          ),
        )}
      </div>
    </Box>
  );
}
