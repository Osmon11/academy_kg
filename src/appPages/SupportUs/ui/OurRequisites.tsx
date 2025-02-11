import { useTranslations } from "next-intl";

import { Box, Typography } from "@mui/material";

import { RequisiteCard } from "@/features/RequisiteCard";

import { TubeSpinner } from "@/shared/UI";
import { SECTION_PADDING } from "@/shared/config/const";
import { usePaginatedData } from "@/shared/hooks";
import { IRequisiteListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function OurRequisites() {
  const t = useTranslations("OurRequisites");

  const { sentryRef, data, loading } =
    usePaginatedData<IRequisiteListItem>({
      endpoint: "/academy/requisite_list/",
    });
  return (
    <Box sx={{ padding: SECTION_PADDING }}>
      <Box
        className={styles.requisites_wrapper}
        ref={sentryRef}
      >
        {data &&
          data.results.length > 0 &&
          data.results.map((requisite) => (
            <RequisiteCard
              key={requisite.id}
              {...requisite}
            />
          ))}
        {loading ? (
          <Box className="tube_spinner_wrapper">
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
              textAlign="center"
              color="textSecondary"
              fontWeight={600}
            >
              {t("poka-net-rekvizitov")}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}
