"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";

import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Footer } from "@/widgets/Footer";

import { CourseCard } from "@/features/CourseCard";

import { GoBackHeader } from "@/entities/GoBackHeader";

import {
  SearchTextField,
  TubeSpinner,
} from "@/shared/UI";
import { usePaginatedData } from "@/shared/hooks";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { ICourseListItem } from "@/shared/types";

export function SearchCoursesPage() {
  const t = useTranslations("SearchCoursesPage");
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const search = searchParams.get("search");
  const setId = searchParams.get("setId");
  const courseType =
    searchParams.get("courseType");
  const [searchInput, setSearchInput] =
    useState("");

  const {
    sentryRef,
    data,
    loading,
    hasNextPage,
  } = usePaginatedData<ICourseListItem>({
    endpoint: "/academy/course_list/",
    searchParams: {
      search,
      course_set: setId,
      course_type: courseType,
    },
  });

  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  const SearchField = (
    <SearchTextField
      value={searchInput}
      onChange={(event) =>
        setSearchInput(event.target.value)
      }
      onKeyDown={(event) => {
        if (
          event.key === "Enter" &&
          searchInput
        ) {
          router.push("searchCourses", {
            queryParams: {
              search: searchInput,
            },
          });
        }
      }}
      color="white"
    />
  );
  return (
    <Fragment>
      <GoBackHeader
        title={
          search ?? title ?? t("poisk-kursov")
        }
      />
      <main className="page full_height">
        {!upSm && SearchField}
        <Box
          sx={{
            width: "100%",
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            color="textSecondary"
            fontWeight={600}
          >
            {t("found-courses", {
              amount: loading
                ? "..."
                : data
                  ? data.count
                  : 0,
            })}
          </Typography>
          {upSm && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {SearchField}
            </Box>
          )}
        </Box>
        <Box className="courses_wrapper">
          {data &&
            data.results.length > 0 &&
            data.results.map((item) => (
              <CourseCard
                key={item.id}
                course={item}
              />
            ))}
          {loading || hasNextPage ? (
            <Box
              ref={sentryRef}
              className="tube_spinner_wrapper"
              sx={{ marginTop: "20px" }}
            >
              <TubeSpinner
                width={50}
                height={50}
              />
            </Box>
          ) : (
            Boolean(
              !data || data.results.length === 0,
            ) && (
              <Typography
                variant="h6"
                color="textSecondary"
                textAlign="center"
                sx={{
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                {t(
                  "po-vashemu-zaprosu-nichego-ne-naideno",
                )}
              </Typography>
            )
          )}
        </Box>
      </main>
      <Footer />
    </Fragment>
  );
}
