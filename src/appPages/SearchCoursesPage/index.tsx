"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";

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
import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import {
  ICourseListItem,
  IPaginatedList,
} from "@/shared/types";

export function SearchCoursesPage() {
  const t = useTranslations("SearchCoursesPage");
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const setId = searchParams.get("setId");
  const setTitle = searchParams.get("setTitle");
  const [searchInput, setSearchInput] =
    useState("");
  const [courses, setCourses] = useState<
    ICourseListItem[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (setId || search) {
      if (search) {
        setSearchInput(search);
      }
      setLoading(true);
      axiosInstance
        .get<IPaginatedList<ICourseListItem>>(
          `/academy/course_list/?${queryString.stringify({ search, course_set: setId }, { skipNull: true })}`,
        )
        .then((res) => {
          if (Array.isArray(res.data.results)) {
            setCourses(res.data.results);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [setId, search]);

  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );
  return (
    <Box className={"bg_gray"}>
      <GoBackHeader
        title={
          (upSm ? setTitle : search) ??
          t("poisk-kursov")
        }
      />
      <Box
        className={classNames(
          "page",
          "full_height",
        )}
      >
        <Box
          sx={{
            width: "100%",
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
                : courses.length,
            })}
          </Typography>
          {upSm && (
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
          )}
        </Box>
        {loading ? (
          <Box
            className={"tube_spinner_wrapper"}
            sx={{ height: "100%" }}
          >
            <TubeSpinner
              width={50}
              height={50}
            />
          </Box>
        ) : courses.length > 0 ? (
          <Box className={"courses_wrapper"}>
            {courses.map((item) => (
              <CourseCard
                key={item.id}
                course={item}
              />
            ))}
          </Box>
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            textAlign="center"
            sx={{ marginTop: "20px" }}
          >
            {t(
              "po-vashemu-zaprosu-nichego-ne-naideno",
            )}
          </Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
}
