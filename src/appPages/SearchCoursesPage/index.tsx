"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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
  const search = searchParams.get("search");
  const setId = searchParams.get("setId");
  const setTitle = searchParams.get("setTitle");
  const [searchInput, setSearchInput] =
    useState("");

  const { sentryRef, data, loading } =
    usePaginatedData<ICourseListItem>({
      endpoint: "/academy/course_list/",
      searchParams: {
        search,
        course_set: setId,
      },
    });

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
      <Box className="full_height">
        <Box
          className="page_paddings"
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
                  ? data.results.length
                  : 0,
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
        {data && data.results.length > 0 && (
          <Box
            className={"courses_wrapper"}
            ref={sentryRef}
          >
            {data?.results.map((item) => (
              <CourseCard
                key={item.id}
                course={item}
              />
            ))}
          </Box>
        )}
        {loading ? (
          <Box
            className={"tube_spinner_wrapper"}
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
              sx={{ marginTop: "20px" }}
            >
              {t(
                "po-vashemu-zaprosu-nichego-ne-naideno",
              )}
            </Typography>
          )
        )}
      </Box>
      <Footer />
    </Box>
  );
}
