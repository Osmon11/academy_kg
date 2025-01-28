"use client";

import classNames from "classnames";
import {
  Fragment,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import YouTube from "react-youtube";

import {
  Box,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppSelector } from "@/shared/config/store";
import { getYouTubeVideoId } from "@/shared/functions";
import { ILessonDetail } from "@/shared/types";

import styles from "../styles.module.scss";
import ExamOverview from "./ExamOverview";
import LessonsList from "./LessonsList";
import Questions from "./Questions";
import SettingsMenu from "./SettingsMenu";
import TextOfTheLesson from "./TextOfTheLesson";

function a11yProps(index: number) {
  return {
    id: `study-tab-${index}`,
    "aria-controls": `study-tabpanel-${index}`,
  };
}

export default function LessonDetails() {
  const { course, courseLevels, loading } =
    useAppSelector((store) => store.course);
  const [lesson, setLesson] =
    useState<ILessonDetail | null>(null);
  const [videoId, setVideoId] =
    useState<string>();
  const [isExam, setIsExam] = useState(false);
  const [tab, setTab] = useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    if (tabs[newValue]) {
      setTab(newValue);
    }
  };

  function finishLesson() {
    if (lesson) {
      axiosInstance
        .post(
          `/academy/finish_lesson/${lesson.id}/`,
        )
        .then((res) => {
          if (res?.data?.message) {
            toast.success(res.data.message);
          }
        });
    }
  }

  useEffect(() => {
    if (course && courseLevels) {
      if (courseLevels.lessons.length > 0) {
        setIsExam(false);
        setLesson(courseLevels.lessons[0]);
        if (
          course.current_level ===
          courseLevels.level
        ) {
          setVideoId(
            getYouTubeVideoId(
              courseLevels.lessons[0].video,
            ),
          );
        }
      } else {
        setLesson(null);
        setVideoId(undefined);
      }
    }
  }, [course, courseLevels]);

  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const tabs = [
    <LessonsList
      key="LessonsList"
      onSelectLesson={(lesson) => {
        setIsExam(false);
        setLesson({ ...lesson });
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
  return (
    <Box
      className={classNames(
        styles.lesson_wrapper,
        { ["page"]: upMd },
      )}
      sx={
        loading || !courseLevels
          ? { justifyContent: "center" }
          : undefined
      }
    >
      {loading || !courseLevels ? (
        <Box
          className={"tube_spinner_wrapper"}
          sx={{ height: "100%" }}
        >
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        <Fragment>
          {isExam ? (
            <ExamOverview />
          ) : (
            <YouTube
              className={styles.video}
              videoId={videoId}
              onEnd={finishLesson}
              onStateChange={(event) => {
                if (
                  event.data ===
                  //@ts-expect-error Property 'YT' does not exist on type 'Window & typeof globalThis'.
                  window.YT.PlayerState
                ) {
                  finishLesson();
                }
              }}
            />
          )}
          <Box
            className={classNames(
              styles.content,
              { ["page"]: !upMd },
            )}
          >
            <Box
              className={"flex_box"}
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
              <SettingsMenu />
            </Box>
            <Box className={styles.list}>
              {tabs[tab] ?? "No content"}
            </Box>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
