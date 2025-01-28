"use client";

import { useEffect } from "react";

import { Box } from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { GoBackHeader } from "@/entities/GoBackHeader";

import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import {
  setComments,
  setCourse,
  setCourseLevels,
  setLoading,
} from "@/shared/model";
import {
  IComment,
  ICourseDetail,
  ICourseLevelDetail,
} from "@/shared/types";

import LessonDetails from "./ui/LessonDetails";
import Recommendations from "./ui/Recommendations";

interface IStudyPageProps {
  courseId: string;
}

export function StudyPage({
  courseId,
}: IStudyPageProps) {
  const dispatch = useAppDispatch();
  const course = useAppSelector(
    (store) => store.course.course,
  );
  useEffect(() => {
    dispatch(setLoading(true));
    Promise.all([
      axiosInstance
        .get<ICourseDetail>(
          `/academy/course_detail/${courseId}`,
        )
        .then((res) => {
          if (res?.data) {
            dispatch(setCourse(res.data));
            const currentLevel =
              res.data.levels.find(
                (i) =>
                  i.level ===
                  res.data.current_level,
              );
            if (currentLevel) {
              axiosInstance
                .get<ICourseLevelDetail>(
                  `/academy/course_level_detail/${currentLevel.id}`,
                )
                .then((res) => {
                  if (res?.data) {
                    dispatch(
                      setCourseLevels(res.data),
                    );
                  }
                });
            }
          }
        }),
      axiosInstance
        .get<{
          results: IComment[];
        }>(`/academy/comment_list/${courseId}`)
        .then((res) => {
          if (
            res?.data &&
            Array.isArray(res.data.results)
          ) {
            dispatch(
              setComments(res.data.results),
            );
          }
        }),
    ]).finally(() => {
      dispatch(setLoading(false));
    });
  }, [dispatch, courseId]);

  return (
    <Box className={"bg_gray"}>
      <GoBackHeader
        title={course ? course.title : ""}
      />
      <Box className={"full_height"}>
        <LessonDetails />
        <Recommendations />
      </Box>
      <Footer />
    </Box>
  );
}
