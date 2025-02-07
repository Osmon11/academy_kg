import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { RequisiteCard } from "@/features/RequisiteCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { SECTION_PADDING } from "@/shared/config/const";
import { IRequisiteListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function OurRequisites() {
  const [requisiteList, setRequisiteList] =
    useState<IRequisiteListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get<{
        results: IRequisiteListItem[];
      }>("academy/requisite_list/")
      .then((res) => {
        if (Array(res?.data.results)) {
          setRequisiteList(res.data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Box sx={{ padding: SECTION_PADDING }}>
      {loading ? (
        <Box className="tube_spinner_wrapper">
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        <Box
          className={styles.requisites_wrapper}
        >
          {requisiteList.map((requisite) => (
            <RequisiteCard
              key={requisite.id}
              {...requisite}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
