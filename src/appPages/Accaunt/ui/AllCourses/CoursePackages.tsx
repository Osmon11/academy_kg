import { Box } from "@mui/material";

import { SetOfCoursesCard } from "@/features/SetOfCoursesCard";

import { ISetOfCourses } from "@/shared/types";

import styles from "../styles.module.scss";

interface ICourseSetsProps {
  courseSets: ISetOfCourses[];
}
export default function CourseSets({
  courseSets,
}: ICourseSetsProps) {
  return (
    <Box className={styles.courses_wrapper}>
      {courseSets.map((item) => (
        <SetOfCoursesCard
          key={item.id}
          setOfCourses={item}
        />
      ))}
    </Box>
  );
}
