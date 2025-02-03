import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SetOfCoursesCard } from "@/features/SetOfCoursesCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  IPaginatedList,
  ISetOfCourses,
} from "@/shared/types";

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
        <Box className={"tube_spinner_wrapper"}>
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : courseSets.length > 0 ? (
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
      ) : (
        <Typography
          width="100%"
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
          sx={{ margin: "12px 0px" }}
        >
          Нет наборов
        </Typography>
      )}
    </Box>
  );
}
