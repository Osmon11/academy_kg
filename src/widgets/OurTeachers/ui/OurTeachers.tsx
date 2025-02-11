import { useTranslations } from "next-intl";

import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { TeacherCard } from "@/features/TeacherCard";

import { TubeSpinner } from "@/shared/UI";
import { SECTION_PADDING } from "@/shared/config/const";
import { usePaginatedData } from "@/shared/hooks";
import { ITeacherListItem } from "@/shared/types";

import styles from "./OurTeachers.module.scss";

export function OurTeachers() {
  const t = useTranslations("OurTeachers");

  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );

  const { sentryRef, data, loading } =
    usePaginatedData<ITeacherListItem>({
      endpoint: "/academy/teacher_list/",
      hasNextPage: upMd,
    });

  const cardStyles = {
    width: "240px",
  };
  const mediaStyles = {
    width: "240px",
    height: "280px",
  };
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {data && data.results.length > 0 ? (
        upMd ? (
          <Box
            className={styles.teachers_wrapper}
            ref={sentryRef}
          >
            {data.results.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                {...teacher}
                mediaSx={mediaStyles}
                sx={cardStyles}
              />
            ))}
          </Box>
        ) : (
          <Carousel options={{ align: "start" }}>
            {data.results.map((teacher) => (
              <Box
                key={teacher.id}
                sx={{
                  height: "auto",
                  paddingRight: "20px",
                }}
              >
                <TeacherCard
                  {...teacher}
                  mediaSx={mediaStyles}
                  sx={cardStyles}
                />
              </Box>
            ))}
          </Carousel>
        )
      ) : (
        <Typography
          width="100%"
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
        >
          {t("net-dannykh")}
        </Typography>
      )}
      {loading && (
        <Box className={"tube_spinner_wrapper"}>
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      )}
    </Box>
  );
}
