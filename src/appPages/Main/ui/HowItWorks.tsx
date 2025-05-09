"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { RefObject } from "react";
import YouTube from "react-youtube";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { IconBanner } from "@/entities/IconBanner";

import bookIcon from "@/icons/book.svg";
import login2Icon from "@/icons/login-2.svg";
import monitorRecorderIcon from "@/icons/monitor-recorder.svg";
import note2Icon from "@/icons/note-2.svg";

import laptopBaseBg from "@/backgrounds/base.svg";

import styles from "../styles.module.scss";

export default function HowItWorks({
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) {
  const t = useTranslations("HowItWorks");
  const xs = useMediaQuery((theme) =>
    theme.breakpoints.only("xs"),
  );
  const Laptop = (
    <Box
      className={styles.laptop}
      ref={ref}
    >
      <Box className={styles.screen}>
        <YouTube
          className={styles.video}
          videoId="MV_J9E1M_dc"
        />
      </Box>
      <Image
        className={styles.base}
        src={laptopBaseBg}
        alt="laptop base"
        unoptimized
        width={1128}
        height={19}
      />
    </Box>
  );
  return (
    <Box
      sx={{
        marginTop: {
          xs: "25px",
          sm: "40px",
          md: "80px",
        },
      }}
    >
      {xs && Laptop}
      <Box
        className={styles.icon_banners_wrapper}
        sx={{
          marginTop: { xs: "25px", sm: "0px" },
        }}
      >
        <IconBanner
          color="primary"
          title={t("zaregistriruites")}
          description={t(
            "s-pomoshyu-akkauntov-v",
          )}
          icon={login2Icon}
          icon_alt="login-2 icon"
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
        />
        <IconBanner
          color="secondary"
          title={t("sdavaite-ekzameny")}
          description={t(
            "zakreplyaite-poluchennye-znaniya-i",
          )}
          icon={note2Icon}
          icon_alt="note-2 icon"
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
        />
      </Box>
      {!xs && Laptop}
      <Box
        className={styles.icon_banners_wrapper}
        sx={{
          marginTop: {
            xs: "20px",
            sm: "34px",
            md: "50px",
          },
        }}
      >
        <IconBanner
          color="primary"
          title={t("obuchaites-onlain")}
          description={t(
            "smotrite-videouroki-zadavaite-voprosy",
          )}
          icon={monitorRecorderIcon}
          icon_alt="monitor recorder icon"
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
        />
        <IconBanner
          color="secondary"
          title={t("proverte-sebya")}
          description={t(
            "proidite-nachalnyi-test-chtoby",
          )}
          icon={bookIcon}
          icon_alt="book icon"
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
        />
      </Box>
    </Box>
  );
}
