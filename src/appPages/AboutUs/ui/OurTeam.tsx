"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";
import { ITeammateListItem } from "@/shared/types";

import styles from "./styles.module.scss";

export default function OurTeam({
  teammates,
}: {
  teammates: ITeammateListItem[];
}) {
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const cardStyles = {
    width: { xs: "240px", sm: "400px" },
  };
  const mediaStyles = {
    width: { xs: "240px", sm: "400px" },
    height: "280px",
  };
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {upMd ? (
        <Box className={styles.teammates_wrapper}>
          {teammates.map((teammate) => (
            <TeacherCard
              key={teammate.id}
              {...teammate}
              mediaSx={mediaStyles}
              sx={cardStyles}
            />
          ))}
        </Box>
      ) : (
        <Carousel>
          {teammates.map((teammate) => (
            <TeacherCard
              key={teammate.id}
              {...teammate}
              mediaSx={mediaStyles}
              sx={cardStyles}
            />
          ))}
        </Carousel>
      )}
    </Box>
  );
}
