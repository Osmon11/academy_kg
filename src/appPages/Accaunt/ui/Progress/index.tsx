"use client";

import classNames from "classnames";
import queryString from "query-string";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  ICourseProgress,
  IPaginatedList,
} from "@/shared/types";

import ProgressAccordion from "./ProgressAccordion";
import styles from "./styles.module.scss";

const levels = [1, 2, 3, 4, 5, 6, 7];

export function ProgressPage() {
  const [data, setData] = useState<
    ICourseProgress[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(1);

  const fetchProgress = useCallback(
    (level: number) => {
      setLoading(true);
      axiosInstance
        .get<IPaginatedList<ICourseProgress>>(
          `/academy/progress_view/?${queryString.stringify({ level })}`,
        )
        .then((res) => {
          if (Array.isArray(res?.data?.results)) {
            setData(res.data.results);
          }
        })
        .finally(() => setLoading(false));
    },
    [],
  );

  useEffect(() => {
    fetchProgress(level);
  }, [fetchProgress, level]);

  const [
    expandedAccordion,
    setExpandedAccordion,
  ] = useState<number | null>(null);
  return (
    <Box className="bg_gray">
      <Header background="white" />
      <Box
        className="page full_height"
        sx={{
          marginTop: { xs: "72px", md: "80px" },
        }}
      >
        <Box className={styles.levels_wrapper}>
          {levels.map((item) => {
            const isActive = level === item;
            return (
              <Button
                key={item}
                className={classNames(
                  styles.button,
                  {
                    [styles.active_level]:
                      isActive,
                  },
                )}
                variant="text"
                onClick={(event) => {
                  setLevel(item);
                  event.currentTarget.scrollIntoView(
                    {
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    },
                  );
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color={
                    isActive
                      ? "primary"
                      : "#A3A3A3"
                  }
                  textAlign="center"
                  lineHeight="16px"
                >
                  {item}
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color={
                    isActive
                      ? "primary"
                      : "#A3A3A3"
                  }
                  textAlign="center"
                >
                  Уровень
                </Typography>
              </Button>
            );
          })}
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          {loading ? (
            <Box className="tube_spinner_wrapper">
              <TubeSpinner
                width={50}
                height={50}
              />
            </Box>
          ) : data.length > 0 ? (
            data.map((item) => (
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
            ))
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              textAlign="center"
            >
              Нет данных
            </Typography>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
