import { useTranslations } from "next-intl";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { CourseCard } from "@/features/CourseCard";

import { usePaginatedData } from "@/shared/hooks";
import { ICourseListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function AcademyCoreProgram() {
  const t = useTranslations("AcademyCoreProgram");

  const { data } =
    usePaginatedData<ICourseListItem>({
      endpoint: "/academy/course_list/",
      searchParams: {
        course_type: 5,
      },
      hasNextPage: false,
    });
  return (
    <Box className={styles.core_program_wrapper}>
      <Typography
        variant="h5"
        fontWeight={700}
        textAlign="center"
        marginBottom="20px"
      >
        {t("bazovaya-programma-akademii")}
      </Typography>
      <Carousel>
        {data &&
          data.results.map((item) => (
            <Box
              key={item.id}
              sx={{
                height: "auto",
                padding: "20px 10px",
              }}
            >
              <CourseCard course={item} />
            </Box>
          ))}
      </Carousel>
      <Box className={styles.certificate_wrapper}>
        <Paper
          className={styles.card}
          elevation={0}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            color="secondary"
          >
            {t("attestat-ot-akademii")}
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="textSecondary"
            sx={{ marginTop: "16px" }}
          >
            {t("proidite-vse-kursov", {
              courses: data
                ? data.results.length
                : 0,
            })}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
