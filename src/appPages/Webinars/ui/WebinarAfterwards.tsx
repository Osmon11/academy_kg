"use client";

import classNames from "classnames";
import moment from "moment";
import Image from "next/image";

import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  SECTION_PADDING,
  TIME_FORMAT,
} from "@/shared/config/const";
import { IWebinarAfterwardListItem } from "@/shared/types";

import videoPlayPrimaryIcon from "@/icons/video-play-primary.svg";

import styles from "../styles.module.scss";

function ImageWrapper({
  webinar,
}: {
  webinar: IWebinarAfterwardListItem;
}) {
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
          href={webinar.video}
          target="_blank"
          rel="noopener"
        >
          смотреть
        </Button>
      </Box>
      <Box className={styles.overlay} />
    </Box>
  );
}

export default function WebinarAfterwards({
  webinars,
}: {
  webinars: IWebinarAfterwardListItem[];
}) {
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

  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {webinars.map((webinar, webinarIndex) => {
        const durationTime = moment(
          webinar.duration_video,
          TIME_FORMAT,
        );
        const totalMinutes =
          durationTime.hours() * 60 +
          durationTime.minutes();
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
              <ImageWrapper webinar={webinar} />
            )}
            <Paper
              className={styles.content_wrapper}
            >
              {!upMd && (
                <ImageWrapper webinar={webinar} />
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
                  {`Эфир: ${webinar.title}`}
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
                    Дата проведения:
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
                    Продолжительность вебинара:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="textTertiary"
                    textAlign="end"
                  >
                    {`${totalMinutes} минут`}
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
                    Вебинар для студентов:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="textTertiary"
                    textAlign="end"
                  >
                    {`${webinar.level}-уровня и выше`}
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
                    Запись эфира
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}
