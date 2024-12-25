import { Box } from "@mui/material";

import { TeacherCard } from "@/features/TeacherCard";

import { SECTION_PADDING } from "@/shared/config/const";
import { ITeammateListItem } from "@/shared/types";

import styles from "./styles.module.scss";

export default function OurTeam({
  teammates,
}: {
  teammates: ITeammateListItem[];
}) {
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      <div className={styles.teammates_wrapper}>
        {teammates.map((teammate) => (
          <TeacherCard
            key={teammate.id}
            {...teammate}
            mediaSx={{
              width: "400px",
              height: "280px",
            }}
            sx={{ width: "400px" }}
          />
        ))}
      </div>
    </Box>
  );
}
