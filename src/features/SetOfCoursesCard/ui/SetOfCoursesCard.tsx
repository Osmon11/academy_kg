import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { ISetOfCourses } from "@/shared/types";

import styles from "./SetOfCoursesCard.module.scss";

interface ISetOfCoursesCardProps {
  setOfCourses: ISetOfCourses;
}
export function SetOfCoursesCard({
  setOfCourses,
}: ISetOfCoursesCardProps) {
  return (
    <Card className={styles.setOfCourses_card}>
      <CardMedia
        image={setOfCourses.image}
        title={setOfCourses.title}
        className={styles.media}
      />
      <CardContent className={styles.content}>
        <Box className={styles.badge}>
          <Typography
            variant="caption"
            fontWeight={900}
          >
            {`${setOfCourses.amout_of_courses} курса`}
          </Typography>
        </Box>
        <Box>
          <Typography
            className={styles.title}
            variant="h6"
            fontWeight={900}
            textTransform="uppercase"
          >
            {setOfCourses.title}
          </Typography>
          <Typography
            className={styles.description}
            variant="body1"
            fontWeight={900}
            textTransform="uppercase"
          >
            {setOfCourses.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
