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
  setCourse,
  setLoading,
} from "@/shared/model";
import { ICourseDetail } from "@/shared/types";

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
    axiosInstance
      .get<ICourseDetail>(
        `/academy/course_detail/${courseId}`,
      )
      .then((res) => {
        if (res?.data) {
          dispatch(setCourse(res.data));
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, courseId]);
  return (
    <Fragment>
      <GoBackHeader
        title={course ? course.title : ""}
      />
      <main className="full_height">
        <LessonDetails courseId={courseId} />
        <Recommendations />
      </main>
      <Footer />
    </Fragment>
  );
}
