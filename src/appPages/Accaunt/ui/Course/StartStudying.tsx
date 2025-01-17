"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@mui/material";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppSelector } from "@/shared/config/store";
import { routePath } from "@/shared/functions";

export default function StartStudying() {
  const { course } = useAppSelector(
    (store) => store.course,
  );
  const [loading, setLoading] = useState(false);
  function startStudying() {
    if (course && !loading) {
      setLoading(true);
      axiosInstance
        .post("/academy/start_learning/", {
          course: course.id,
        })
        .finally(() => setLoading(false));
    }
  }
  return course ? (
    <Link
      href={routePath("study", {
        id: Number(course.id),
      })}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={
          course.is_learning
            ? undefined
            : startStudying
        }
        sx={{ width: "300px" }}
        disabled={loading}
      >
        {course.is_learning
          ? "Продолжить обучение"
          : "Начать учиться"}
      </Button>
    </Link>
  ) : (
    "No course in store"
  );
}
