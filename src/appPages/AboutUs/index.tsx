"use client";

import { useTranslations } from "next-intl";
import {
  Fragment,
  useEffect,
  useState,
} from "react";

import { Box } from "@mui/material";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { OurTeachers } from "@/widgets/OurTeachers";

import { PageHeading } from "@/entities/PageHeading";
import { SectionHeader } from "@/entities/SectionHeader";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import {
  ITeacherListItem,
  ITeammateListItem,
} from "@/shared/types";

import OurTeam from "./ui/OurTeam";

export function AboutUsPage() {
  const t = useTranslations("AboutUsPage");
  const [teammateList, setTeammateList] =
    useState<ITeammateListItem[]>([]);
  const [teacherList, setTeacherList] = useState<
    ITeacherListItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axiosInstance
        .get<{
          results: ITeammateListItem[];
        }>("academy/our_team_list/")
        .then((res) => {
          if (Array.isArray(res?.data.results)) {
            setTeammateList(res.data.results);
          }
        }),
      axiosInstance
        .get<{
          results: ITeacherListItem[];
        }>("academy/teacher_list/")
        .then((res) => {
          if (Array.isArray(res?.data.results)) {
            setTeacherList(res.data.results);
          }
        }),
    ]).finally(() => setLoading(false));
  }, []);
  return (
    <Fragment>
      <Header
        background="transparent"
        elevation={0}
        position="absolute"
      />
      <PageHeading
        title={t("o-nas")}
        subtitles={[
          t(
            "nasha-akademiya-predlagaet-kompleksnoe",
          ),
          t(
            "my-predlagaem-individualnyi-podkhod",
          ),
        ]}
      />
      <SectionHeader color="primary">
        {t("nasha-komanda")}
      </SectionHeader>
      {loading ? (
        <Box className="tube_spinner_wrapper">
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        <OurTeam teammates={teammateList} />
      )}
      <SectionHeader color="primary">
        {t("nashi-prepodavateli")}
      </SectionHeader>
      {loading ? (
        <Box className="tube_spinner_wrapper">
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : (
        <OurTeachers teachers={teacherList} />
      )}
      <Footer />
    </Fragment>
  );
}
