"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@mui/material";

import axiosInstance from "@/shared/config/axiosClientInstance";
import { routePath } from "@/shared/functions";

interface IStartStudyingProps {
  courseId: string;
}

export default function StartStudying({
  courseId,
}: IStartStudyingProps) {
  const [loading, setLoading] = useState(false);
  function startStudying() {
    if (!loading) {
      setLoading(true);
      axiosInstance
        .post("/academy/start_learning/", {
          course: courseId,
        })
        .finally(() => setLoading(false));
    }
  }
  return (
    <Link
      href={routePath("study", {
        id: Number(courseId),
      })}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={startStudying}
        sx={{ width: "300px" }}
        disabled={loading}
      >
        Начать учиться
      </Button>
    </Link>
  );
}
