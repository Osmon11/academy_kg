import { Box } from "@mui/material";

import { RequisiteCard } from "@/features/RequisiteCard";

import { SECTION_PADDING } from "@/shared/config/const";
import { IRequisiteListItem } from "@/shared/types";

import styles from "./styles.module.scss";

export default function OurRequisites({
  requisites,
}: {
  requisites: IRequisiteListItem[];
}) {
  return (
    <Box sx={{ padding: SECTION_PADDING }}>
      <Box className={styles.requisites_wrapper}>
        {requisites.map((requisite) => (
          <RequisiteCard
            key={requisite.id}
            {...requisite}
          />
        ))}
      </Box>
    </Box>
  );
}
