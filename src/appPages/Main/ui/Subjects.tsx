"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SubjectCard } from "@/features/SubjectCard";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { SECTION_PADDING } from "@/shared/config/const";
import {
  IPaginatedList,
  ISubjectListItem,
} from "@/shared/types";

import styles from "../styles.module.scss";

export default function Subjects() {
  const [courseList, setCourseList] =
    useState<IPaginatedList<ISubjectListItem> | null>(
      null,
    );
  const [loading, setLoading] = useState(true);

  const loadMore = useCallback(() => {
    if (courseList === null || courseList.next) {
      setLoading(true);
      axiosInstance
        .get<IPaginatedList<ISubjectListItem>>(
          `academy/course_list/?page=${courseList ? courseList.next : 1}`,
        )
        .then((res) => {
          if (res?.data) {
            setCourseList(res.data);
          }
        })
        .catch(() => setCourseList(null))
        .finally(() => setLoading(false));
    }
  }, [courseList]);

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: Boolean(courseList?.next),
    onLoadMore: loadMore,
    disabled: !courseList,
  });

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {loading ? (
        <Box className="tube_spinner_wrapper">
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : courseList &&
        courseList.results.length > 0 ? (
        upMd ? (
          <Box
            className={styles.subjects_wrapper}
            ref={sentryRef}
          >
            {courseList.results.map(
              (course, cardIndex) => (
                <SubjectCard
                  key={course.id}
                  color={
                    cardIndex % 2 === 0
                      ? "primary"
                      : "secondary"
                  }
                  {...course}
                />
              ),
            )}
          </Box>
        ) : (
          <Carousel options={{ align: "start" }}>
            {courseList.results.map(
              (card, cardIndex) => (
                <Box
                  key={card.id}
                  sx={{
                    width: "auto",
                    height: "auto",
                    paddingRight: "20px",
                  }}
                >
                  <SubjectCard
                    color={
                      cardIndex % 2 === 0
                        ? "primary"
                        : "secondary"
                    }
                    {...card}
                  />
                </Box>
              ),
            )}
          </Carousel>
        )
      ) : (
        <Typography
          width="100%"
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
        >
          Нет данных
        </Typography>
      )}
    </Box>
  );
}
