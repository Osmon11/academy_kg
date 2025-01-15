"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";
import { ILessonDetail } from "@/shared/types";

import bookSquareIconPrimary from "@/icons/book-square-primary.svg";
import settingIconPrimary from "@/icons/settng-primary.svg";
import shareIconPrimary from "@/icons/share-primary.svg";

import styles from "../styles.module.scss";
import LessonsList from "./LessonsList";
import Questions from "./Questions";
import TextOfTheLesson from "./TextOfTheLesson";

function a11yProps(index: number) {
  return {
    id: `study-tab-${index}`,
    "aria-controls": `study-tabpanel-${index}`,
  };
}

export default function LessonDetails() {
  const router = useRouter();
  const { course, courseLevels, loading } =
    useAppSelector((store) => store.course);
  const [lesson, setLesson] =
    useState<ILessonDetail | null>(null);
  const [isExam, setIsExam] = useState(false);
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [tab, setTab] = useState(0);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    if (tabs[newValue]) {
      setTab(newValue);
    }
  };
  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  const tabs = [
    <LessonsList
      key="LessonsList"
      lessonsAndExam={
        courseLevels
          ? [
              ...courseLevels.lessons,
              courseLevels.exam,
            ]
          : []
      }
      onSelectLesson={(lesson) => {
        console.log("onSelectLesson");

        setIsExam(false);
        setLesson(lesson);
      }}
      onSelectExam={() => {
        setIsExam(true);
      }}
    />,
    <Questions key="Questions" />,
    <TextOfTheLesson
      key="TextOfTheLesson"
      lesson={lesson}
    />,
  ];
  const menuItemStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };
  return (
    <Box className={styles.lesson_wrapper}>
      {loading ? (
        <Box
          className={styles.tube_spinner_wrapper}
        >
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        <Fragment>
          {isExam ? (
            <Paper>
              <Typography
                variant="h6"
                fontSize={600}
                color="primary"
                textAlign="center"
              >
                Таджвид (3 уровень)
              </Typography>
              <Box>
                <Typography></Typography>
              </Box>
            </Paper>
          ) : (
            <iframe
              src={lesson?.video}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <Box
            sx={{
              width: {
                sx: "100%",
                md: "calc(40% - 25px)",
              },
            }}
          >
            <Box
              className={styles.flex_box}
              sx={{
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Tabs
                value={tab}
                onChange={handleChange}
                aria-label="study tabs example"
                variant={
                  upSm ? "standard" : "scrollable"
                }
              >
                <Tab
                  label="Уроки"
                  {...a11yProps(0)}
                />
                <Tab
                  label="Вопросы"
                  {...a11yProps(1)}
                />
                <Tab
                  label="Текст урока"
                  {...a11yProps(2)}
                />
              </Tabs>
              <IconButton
                aria-controls={
                  open
                    ? "settings-menu"
                    : undefined
                }
                aria-haspopup="true"
                aria-expanded={
                  open ? "true" : undefined
                }
                onClick={(event) => {
                  setAnchorEl(
                    event.currentTarget,
                  );
                }}
              >
                <Image
                  src={settingIconPrimary}
                  alt="setting green icon"
                  width={24}
                  height={24}
                />
              </IconButton>
            </Box>
            {course && (
              <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby":
                    "settings-button",
                  color: "primary",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    router.push(
                      routePath("[course]", {
                        id: course.id,
                      }),
                    );
                  }}
                  sx={menuItemStyles}
                >
                  <Image
                    src={bookSquareIconPrimary}
                    alt="book square green icon"
                    width={24}
                    height={24}
                  />
                  О курсе
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                  }}
                  sx={menuItemStyles}
                >
                  <Image
                    src={shareIconPrimary}
                    alt="share green icon"
                    width={24}
                    height={24}
                  />
                  Поделиться курсом
                </MenuItem>
              </Menu>
            )}
            <Box className={styles.list}>
              {tabs[tab] ?? "No content"}
            </Box>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
