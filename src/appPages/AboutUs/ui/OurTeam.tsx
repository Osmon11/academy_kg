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
import { ITeammateListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function OurTeam() {
  const t = useTranslations("OurTeam");

  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );

  const { sentryRef, data, loading } =
    usePaginatedData<ITeammateListItem>({
      endpoint: "/academy/our_team_list/",
      hasNextPage: upMd,
    });

  const cardStyles = {
    width: { xs: "240px", sm: "400px" },
  };
  const mediaStyles = {
    width: { xs: "240px", sm: "400px" },
    height: "280px",
  };
  const LoadingAndEmptyState = loading ? (
    <Box className={"tube_spinner_wrapper"}>
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
          className={styles.teammates_wrapper}
          ref={sentryRef}
        >
          {data &&
            data.results.length > 0 &&
            data.results.map((teammate) => (
              <TeacherCard
                key={teammate.id}
                {...teammate}
                mediaSx={mediaStyles}
                sx={cardStyles}
              />
            ))}
          {LoadingAndEmptyState}
        </Box>
      ) : (
        <Carousel>
          {data &&
            data.results.length > 0 &&
            data.results.map((teammate) => (
              <TeacherCard
                key={teammate.id}
                {...teammate}
                mediaSx={mediaStyles}
                sx={cardStyles}
              />
            ))}
          {LoadingAndEmptyState}
        </Carousel>
      )}
    </Box>
  );
}
