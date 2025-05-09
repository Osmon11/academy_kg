"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import {
  Fragment,
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

import styles from "./styles.module.scss";
import LevelProgress from "./ui/LevelProgress";

export function ProgressPage() {
  const t = useTranslations("ProgressPage");
  const [loadingLevels, setLoadingLevels] =
    useState(true);
  const [levels, setLevels] = useState<number[]>(
    [],
  );
  const [level, setLevel] = useState(0);

  useEffect(() => {
    setLoadingLevels(true);
    axiosInstance
      .get("/academy/level_list/")
      .then((res) => {
        if (
          Array.isArray(res.data) &&
          typeof res.data[0] === "number"
        ) {
          setLevels(res.data);
          setLevel(res.data[0]);
        }
      })
      .finally(() => setLoadingLevels(false));
  }, []);

  return (
    <Fragment>
      <Header background="white" />
      <main className="page full_height">
        {loadingLevels ? (
          <Box className="tube_spinner_wrapper">
            <TubeSpinner
              width={50}
              height={50}
            />
          </Box>
        ) : (
          <Fragment>
            <Box
              className={styles.levels_wrapper}
            >
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
                      {t("uroven")}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
            {levels.map(
              (item) =>
                item === level && (
                  <LevelProgress
                    key={"LevelProgress" + item}
                    level={item}
                  />
                ),
            )}
          </Fragment>
        )}
      </main>
      <Footer />
    </Fragment>
  );
}
