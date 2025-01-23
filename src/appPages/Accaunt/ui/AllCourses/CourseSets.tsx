"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SetOfCoursesCard } from "@/features/SetOfCoursesCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  IPaginatedList,
  ISetOfCourses,
} from "@/shared/types";

import styles from "../styles.module.scss";

export default function CourseSets() {
  const [courseSets, setCourseSets] = useState<
    ISetOfCourses[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<IPaginatedList<ISetOfCourses>>(
        "/academy/course_sets/list/",
      )
      .then((res) => {
        if (Array.isArray(res.data?.results)) {
          setCourseSets(res.data.results);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Box sx={{ marginTop: "20px" }}>
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
        <Carousel options={{ align: "start" }}>
          {courseSets.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: "auto",
                height: "auto",
                paddingRight: "20px",
              }}
            >
              <SetOfCoursesCard
                setOfCourses={item}
              />
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
}
