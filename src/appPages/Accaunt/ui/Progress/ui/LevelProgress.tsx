import { useTranslations } from "next-intl";
import { useState } from "react";

import { Box, Typography } from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { ICourseProgress } from "@/shared/types";

import ProgressAccordion from "./ProgressAccordion";

export default function LevelProgress({
  level,
}: {
  level: number;
}) {
  const t = useTranslations("LevelProgress");
  const {
    sentryRef,
    data,
    loading,
    hasNextPage,
  } = usePaginatedData<ICourseProgress>({
    endpoint: "/academy/progress_view/",
    searchParams: { level },
  });

  const [
    expandedAccordion,
    setExpandedAccordion,
  ] = useState<number | null>(null);
  return (
    <Box sx={{ marginTop: "40px" }}>
      {data &&
        data.results.length > 0 &&
        data.results.map((item) => (
          <ProgressAccordion
            key={`${level}-${item.id}`}
            progress={item}
            expanded={
              item.id === expandedAccordion
            }
            onToggle={(value) =>
              setExpandedAccordion(
                value ? item.id : null,
              )
            }
          />
        ))}
      {loading || hasNextPage ? (
        <Box
          ref={sentryRef}
          className="tube_spinner_wrapper"
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
            variant="h6"
            color="textSecondary"
            textAlign="center"
          >
            {t("net-dannykh")}
          </Typography>
        )
      )}
    </Box>
  );
}
