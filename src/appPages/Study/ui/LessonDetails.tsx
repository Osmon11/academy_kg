"use client";

import classNames from "classnames";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
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
import {
  getYouTubeVideoId,
  routePath,
} from "@/shared/functions";
import { setCourseLevels } from "@/shared/model";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { course, courseLevels, loading } =
    useAppSelector((store) => store.course);
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson");
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
    if (lesson) {
      axiosInstance
        .post(
          `/academy/finish_lesson/${lesson.id}/`,
        )
        .then((res) => {
          if (
            res?.data?.message &&
            course &&
            courseLevels
          ) {
            toast.success(res.data.message);
            const nextLessonIndex =
              courseLevels.lessons.findIndex(
                (i) => i.id === lesson.id,
              ) + 1;
            router.replace(
              routePath("study", {
                dynamicPaths: {
                  course: course.id,
                },
                queryParams: {
                  lesson: nextLessonIndex
                    ? courseLevels.lessons[
                        nextLessonIndex
                      ].id
                    : null,
                },
              }),
            );
            if (
              courseLevels.finished_count + 1 <
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
      const id =
        lessonId || course.current_lesson;
      if (id && courseLevels.lessons.length > 0) {
        setIsExam(false);
        setLesson(
          courseLevels.lessons.find(
            (i) => i.id.toString() === id,
          ),
        );
        setVideoId(
          getYouTubeVideoId(
            courseLevels.lessons[0].video,
          ),
        );
      } else {
        setIsExam(true);
        setLesson(undefined);
        setVideoId(undefined);
      }
    }
  }, [course, courseLevels, lessonId]);

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
                  lessonId={
                    lesson
                      ? lesson.id.toString()
                      : null
                  }
                  onSelectLesson={(lesson) => {
                    if (
                      lesson.is_finished ||
                      lesson.id.toString() ===
                        lessonId
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
