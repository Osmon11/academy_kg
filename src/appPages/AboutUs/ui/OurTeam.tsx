import { Box } from "@mui/material";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";

import teammate1 from "@/backgrounds/teammate-1.png";
import teammate5 from "@/backgrounds/teammate-1.png";
import teammate2 from "@/backgrounds/teammate-2.png";
import teammate3 from "@/backgrounds/teammate-3.png";
import teammate4 from "@/backgrounds/teammate-4.png";

import styles from "./styles.module.scss";

const teammates = [
  {
    image: teammate1.src,
    fullname: "Асадулла Рахимов",
    subjects: "Руководитель академии",
  },
  {
    image: teammate2.src,
    fullname: "Шамсуддин Каримов",
    subjects: "Администратор учебных программ",
  },
  {
    image: teammate3.src,
    fullname: "Ихтияр Алиев",
    subjects: "Технический специалист",
  },
  {
    image: teammate4.src,
    fullname: "Наимуддин Саидов",
    subjects: "Специалист по работе с учениками",
  },
  {
    image: teammate5.src,
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
