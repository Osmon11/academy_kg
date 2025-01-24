import { useRouter } from "next/navigation";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { routePath } from "@/shared/functions";
import { ISetOfCourses } from "@/shared/types";

import styles from "./SetOfCoursesCard.module.scss";

interface ISetOfCoursesCardProps {
  setOfCourses: ISetOfCourses;
}
export function SetOfCoursesCard({
  setOfCourses,
}: ISetOfCoursesCardProps) {
  const router = useRouter();
  return (
    <Card
      className={styles.setOfCourses_card}
      onClick={() =>
        router.push(
          routePath("searchCourses", {
            queryParams: {
              setId: setOfCourses.id,
              setTitle: setOfCourses.title,
            },
          }),
        )
      }
    >
      <CardMedia
        image={setOfCourses.img}
        title={setOfCourses.title}
        className={styles.media}
      />
      <CardContent className={styles.content}>
        {setOfCourses.course_count ? (
          <Box className={styles.badge}>
            <Typography
              variant="caption"
              fontWeight={900}
            >
              {`${setOfCourses.course_count} курса`}
            </Typography>
          </Box>
        ) : null}
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
