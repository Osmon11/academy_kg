import { Box } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { ICourseListItem } from "@/shared/types";

import styles from "../styles.module.scss";

interface IArabLanguageProps {
  courses: ICourseListItem[];
}

export default function ArabLanguage({
  courses,
}: IArabLanguageProps) {
  return (
    <Box className={styles.courses_wrapper}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </Box>
  );
}
