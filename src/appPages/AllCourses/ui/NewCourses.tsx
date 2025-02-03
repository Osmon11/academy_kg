import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { CourseCard } from "@/features/CourseCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  ICourseListItem,
  IPaginatedList,
} from "@/shared/types";

export default function NewCourses() {
  const [courses, setCourses] = useState<
    ICourseListItem[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<IPaginatedList<ICourseListItem>>(
        "/academy/course_list/?course_type=1",
      )
      .then((res) => {
        if (Array.isArray(res.data?.results)) {
          setCourses(res.data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Box className={"courses_wrapper"}>
      {loading ? (
        <Box className={"tube_spinner_wrapper"}>
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))
      ) : (
        <Typography
          width="100%"
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
          sx={{ margin: "12px 0px" }}
        >
          Нет новинок
        </Typography>
      )}
    </Box>
  );
}
