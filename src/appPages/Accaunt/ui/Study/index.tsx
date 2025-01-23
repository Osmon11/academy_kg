"use client";

import { Fragment, useEffect } from "react";

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

import LessonDetails from "./LessonDetails";
import Recommendations from "./Recommendations";

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
          }
        }),
      axiosInstance
        .get<ICourseLevelDetail>(
          `/academy/course_level_detail/${courseId}`,
        )
        .then((res) => {
          if (res?.data) {
            dispatch(setCourseLevels(res.data));
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
    <Fragment>
      <GoBackHeader
        title={course ? course.title : ""}
      />
      <LessonDetails />
      <Recommendations />
      <Footer />
    </Fragment>
  );
}
