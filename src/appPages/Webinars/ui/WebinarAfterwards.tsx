"use client";

import classNames from "classnames";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import YouTube from "react-youtube";

import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import { SECTION_PADDING } from "@/shared/config/const";
import {
  getAllMinutes,
  getYouTubeVideoId,
} from "@/shared/functions";
import { usePaginatedData } from "@/shared/hooks";
import { IWebinarAfterwardListItem } from "@/shared/types";

import videoPlayPrimaryIcon from "@/icons/video-play-primary.svg";
import closeBlackIcon from "@/icons/x-close-black.svg";

import styles from "../styles.module.scss";

function ImageWrapper({
  webinar,
  handleWhatch,
}: {
  webinar: IWebinarAfterwardListItem;
  handleWhatch: (url: string) => void;
}) {
  const t = useTranslations("WebinarAfterwards");
  return (
    <Box
      className={classNames(
        styles.image_wrapper,
        styles.primary,
      )}
    >
      <Image
        src={webinar.image}
        alt={webinar.title}
        quality={100}
        fill
      />
      <Box className={styles.content}>
        <Button
          variant="convex"
          className={styles.button}
          onClick={() =>
            handleWhatch(webinar.video)
          }
        >
          {t("smotret")}
        </Button>
      </Box>
      <Box className={styles.overlay} />
    </Box>
  );
}

export default function WebinarAfterwards() {
  const t = useTranslations("WebinarAfterwards");
  const [dialog, setDialog] = useState(false);
  const [videoUrl, setVideoUrl] =
    useState<string>();

  function onClickWatch(url: string) {
    setVideoUrl(url);
    setDialog(true);
  }

  const propertyBoxStyles = {
    display: "flex",
    alignItems: { xs: "start", sm: "center" },
    justifyContent: {
      xs: "start",
      sm: "space-between",
    },
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: "0px", sm: "20px" },
  };
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );

  const { sentryRef, data, loading } =
    usePaginatedData<IWebinarAfterwardListItem>({
      endpoint: "/academy/webinar_list/",
    });
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
      ref={sentryRef}
    >
      {data &&
        data.results.length > 0 &&
        data.results.map(
          (webinar, webinarIndex) => {
            const totalMinutes = getAllMinutes(
              webinar.duration_video,
            );
            return (
              <Box
                key={webinarIndex}
                sx={{
                  marginTop:
                    webinarIndex === 0
                      ? "0px"
                      : "60px",
                }}
                className={styles.card_item}
              >
                {upMd && (
                  <ImageWrapper
                    webinar={webinar}
                    handleWhatch={onClickWatch}
                  />
                )}
                <Paper
                  className={
                    styles.content_wrapper
                  }
                >
                  {!upMd && (
                    <ImageWrapper
                      webinar={webinar}
                      handleWhatch={onClickWatch}
                    />
                  )}
                  <Box
                    sx={{
                      padding: {
                        xs: "15px",
                        md: "0px",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="primary"
                    >
                      {t("title", {
                        title: webinar.title,
                      })}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: "12px",
                        ...propertyBoxStyles,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="textTertiary"
                      >
                        {t("data-provedeniya")}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={400}
                        color="textTertiary"
                        textAlign="end"
                      >
                        {moment(
                          webinar.start_time,
                        ).format(
                          "mm:HH - DD.MM.YYYY",
                        )}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        marginTop: "12px",
                        ...propertyBoxStyles,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="textTertiary"
                      >
                        {t(
                          "prodolzhitelnost-vebinara",
                        )}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={400}
                        color="textTertiary"
                        textAlign="end"
                      >
                        {t("minut", {
                          amount: totalMinutes,
                        })}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        marginTop: "12px",
                        ...propertyBoxStyles,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="textTertiary"
                      >
                        {t(
                          "vebinar-dlya-studentov",
                        )}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={400}
                        color="textTertiary"
                        textAlign="end"
                      >
                        {t("urovnya-i-vyshe", {
                          level: webinar.level,
                        })}
                      </Typography>
                    </Box>
                    <Box
                      className={
                        styles.broadcast_wrapper
                      }
                    >
                      <Image
                        src={videoPlayPrimaryIcon}
                        alt="video-play green icon"
                        width={24}
                        height={24}
                      />
                      <Typography
                        variant="h6"
                        color="primary"
                      >
                        {t("zapis-efira")}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            );
          },
        )}
      {loading ? (
        <Box className="tube_spinner_wrapper">
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
            textAlign="center"
            color="textSecondary"
            fontWeight={600}
          >
            {t("net-proshedshikh-vebinarov")}
          </Typography>
        )
      )}
      <Dialog
        fullScreen
        open={dialog}
        onClose={() => setDialog(false)}
        className="page"
        PaperProps={{
          sx: { paddingTop: "58px" },
        }}
      >
        <IconButton
          className="close_dialog_button"
          aria-label="close"
          onClick={() => setDialog(false)}
        >
          <Image
            src={closeBlackIcon}
            alt="x close black icon"
            width={24}
            height={24}
          />
        </IconButton>
        <YouTube
          className={"video"}
          videoId={
            videoUrl
              ? getYouTubeVideoId(videoUrl)
              : undefined
          }
        />
      </Dialog>
    </Box>
  );
}
