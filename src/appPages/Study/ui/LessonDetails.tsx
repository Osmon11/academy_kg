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
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import { getYouTubeVideoId } from "@/shared/functions";
import {
  setCourse,
  setCourseLevels,
} from "@/shared/model";
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
  const dispatch = useAppDispatch();
  const { course, courseLevels, loading } =
    useAppSelector((store) => store.course);
  const [lesson, setLesson] =
    useState<ILessonDetail>();
  const [videoId, setVideoId] =
    useState<string>();
  const [isExam, setIsExam] = useState(false);
  const [tab, setTab] = useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    if (tabButtons[newValue]) {
      setTab(newValue);
    }
  };

  function finishLesson() {
    if (course && courseLevels && lesson) {
      axiosInstance
        .post(
          `/academy/finish_lesson/${course.current_lesson}/`,
        )
        .then((res) => {
          if (res?.data?.message) {
            toast.success(res.data.message);
            if (
              courseLevels.finished_count + 1 <=
              courseLevels.lessons.length
            ) {
              dispatch(
                setCourseLevels({
                  ...courseLevels,
                  finished_count:
                    courseLevels.finished_count +
                    1,
                }),
              );
            }
            if (course.current_lesson) {
              const nextLessonId =
                courseLevels.lessons.at(-1)
                  ?.id !== course.current_lesson
                  ? courseLevels.lessons[
                      courseLevels.lessons.findIndex(
                        (i) =>
                          i.id ===
                          course.current_lesson,
                      ) + 1
                    ].id
                  : null;
              dispatch(
                setCourse({
                  ...course,
                  current_lesson: nextLessonId,
                }),
              );
              setIsExam(nextLessonId === null);
            } else {
              setIsExam(true);
            }
          }
        });
    }
  }

  useEffect(() => {
    if (
      course &&
      courseLevels &&
      course?.current_level === courseLevels?.id
    ) {
      if (
        course.current_lesson &&
        courseLevels.lessons.length > 0
      ) {
        const currentLesson =
          courseLevels.lessons.find(
            (i) => i.id === course.current_lesson,
          );
        setIsExam(false);
        setLesson(currentLesson);
        setVideoId(
          currentLesson
            ? getYouTubeVideoId(
                currentLesson.video,
              )
            : undefined,
        );
      } else {
        setIsExam(true);
        setLesson(undefined);
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
  const [tabButtons, setTabButtons] = useState<
    string[]
  >(["Уроки", "Вопросы"]);

  useEffect(() => {
    if (
      lesson &&
      course?.current_level === courseLevels?.id
    ) {
      setTabButtons((state) =>
        state.includes("Текст урока")
          ? state
          : [...state, "Текст урока"],
      );
    } else {
      setTabButtons(["Уроки", "Вопросы"]);
    }
  }, [course, courseLevels, lesson]);

  return (
    <Box
      className={classNames(
        styles.lesson_wrapper,
        { ["page"]: upMd },
      )}
      sx={
        loading
          ? { justifyContent: "center" }
          : undefined
      }
    >
      {loading ? (
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
              key={videoId} // 👈 Forces re-render when videoId changes
              videoId={videoId}
              onEnd={finishLesson}
              // onStateChange={(event) => {
              //   if (
              //     event.data ===
              //     //@ts-expect-error Property 'YT' does not exist on type 'Window & typeof globalThis'.
              //     window.YT.PlayerState
              //   ) {
              //     finishLesson();
              //   }
              // }}
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
                {tabButtons.map(
                  (label, index) => (
                    <Tab
                      key={label + index}
                      label={label}
                      {...a11yProps(index)}
                    />
                  ),
                )}
              </Tabs>
              <SettingsMenu />
            </Box>
            <Box className={styles.list}>
              {[
                <LessonsList
                  key="LessonsList"
                  isExam={isExam}
                  lessonId={
                    course
                      ? course.current_lesson
                      : null
                  }
                  activeId={lesson?.id}
                  onSelectLesson={(lesson) => {
                    if (
                      lesson.is_finished ||
                      (course &&
                        lesson.id ===
                          course.current_lesson)
                    ) {
                      setIsExam(false);
                      setLesson(lesson);
                      setVideoId(
                        getYouTubeVideoId(
                          lesson.video,
                        ),
                      );
                    }
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
              ][tab] ?? "No content"}
            </Box>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
