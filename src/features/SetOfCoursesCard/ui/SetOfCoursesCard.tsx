import { useTranslations } from "next-intl";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { ISetOfCourses } from "@/shared/types";

import styles from "./SetOfCoursesCard.module.scss";

interface ISetOfCoursesCardProps {
  setOfCourses: ISetOfCourses;
}
export function SetOfCoursesCard({
  setOfCourses,
}: ISetOfCoursesCardProps) {
  const t = useTranslations("SetOfCoursesCard");
  const router = useAppRouter();
  return (
    <Card className={styles.setOfCourses_card}>
      <CardActionArea
        className={styles.action_area}
        onClick={() =>
          router.push("searchCourses", {
            queryParams: {
              title: setOfCourses.title,
              setId: setOfCourses.id,
            },
          })
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
                {t("kursa", {
                  amount:
                    setOfCourses.course_count,
                })}
              </Typography>
            </Box>
          ) : (
            <Box />
          )}
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
      </CardActionArea>
    </Card>
  );
}
