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

  const {
    sentryRef,
    data,
    loading,
    hasNextPage,
  } = usePaginatedData<ITeacherListItem>({
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
  const LoadingAndEmptyState =
    loading || hasNextPage ? (
      <Box
        ref={sentryRef}
        className={"tube_spinner_wrapper"}
      >
        <TubeSpinner
          width={50}
          height={50}
        />
      </Box>
    ) : (
      Boolean(
        !data || data.results.length === 0,
      ) && (
        <Typography
          width="100%"
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
        >
          {t("net-dannykh")}
        </Typography>
      )
    );
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {upMd ? (
        <Box
          className={styles.teachers_wrapper}
          ref={sentryRef}
        >
          {data &&
            data.results.length > 0 &&
            data.results.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                {...teacher}
                mediaSx={mediaStyles}
                sx={cardStyles}
              />
            ))}
          {LoadingAndEmptyState}
        </Box>
      ) : (
        <Carousel options={{ align: "start" }}>
          {data &&
            data.results.length > 0 &&
            data.results.map((teacher) => (
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
          {LoadingAndEmptyState}
        </Carousel>
      )}
    </Box>
  );
}
