import classNames from "classnames";
import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";

import styles from "../styles.module.scss";

export default function ViewCertificate({
  levelId,
}: {
  levelId: number;
}) {
  const [loading, setLoading] = useState(false);

  function fetchCertificate() {
    if (!loading) {
      setLoading(true);
      axiosInstance
        .get(`/auth/certificate/${levelId}/`)
        .then((res) => {
          if (res?.data?.file_url) {
            window.open(
              res.data.file_url,
              "_blank",
            );
          }
        })
        .finally(() => setLoading(false));
    }
  }
  return (
    <Box className={styles.carousel_item}>
      <Paper
        className={classNames(
          styles.lesson_card,
          styles.clickable,
        )}
        onClick={fetchCertificate}
      >
        <Box className={styles.flex_between}>
          <Typography
            fontSize="14px"
            fontWeight={600}
            color="primary"
            lineHeight="16px"
          >
            Сертификат
          </Typography>
          {loading && (
            <TubeSpinner
              width={24}
              height={24}
            />
          )}
        </Box>
        <Box className={styles.flex_between}>
          <Typography
            variant="caption"
            color="#A3A3A3"
          >
            Просмотреть
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
