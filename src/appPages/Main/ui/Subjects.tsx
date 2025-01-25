"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { SubjectCard } from "@/features/SubjectCard";

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
  const [loading, setLoading] = useState(false);

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
      {upMd ? (
        <Box
          className={styles.subjects_wrapper}
          ref={sentryRef}
        >
          {courseList
            ? courseList.results.map(
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
              )
            : null}
        </Box>
      ) : (
        <Carousel options={{ align: "start" }}>
          {courseList
            ? courseList.results.map(
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
              )
            : null}
        </Carousel>
      )}
    </Box>
  );
}
