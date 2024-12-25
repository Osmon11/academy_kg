import classNames from "classnames";
import moment from "moment";
import Image from "next/image";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { SECTION_PADDING } from "@/shared/config/const";
import { IWebinarAfterward } from "@/shared/types";

import videoPlayPrimaryIcon from "@/icons/video-play-primary.svg";

import styles from "./styles.module.scss";

export default function WebinarAfterwards({
  webinars,
}: {
  webinars: IWebinarAfterward[];
}) {
  const propertyBoxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  };
  return (
    <Box
      sx={{
        padding: SECTION_PADDING,
      }}
    >
      {webinars.map((webinar, webinarIndex) => {
        const durationTime = moment(
          webinar.duration_video,
          "HH:mm:ss",
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
            <div
              className={classNames(
                styles.image_wrapper,
                styles.primary,
              )}
            >
              {/* <Image
                src={webinar}
                alt={webinar.title}
                width={400}
                height={260}
              /> */}
              <div className={styles.content}>
                <Button
                  variant="convex"
                  className={styles.button}
                  href={webinar.video}
                  target="_blank"
                  rel="noopener"
                >
                  смотреть
                </Button>
              </div>
              <div className={styles.overlay} />
            </div>
            <Paper
              className={styles.content_wrapper}
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
                  color="textThirtiary"
                >
                  Дата проведения:
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={400}
                  color="textThirtiary"
                >
                  {moment(
                    webinar.start_time,
                  ).format("mm:HH - DD.MM.YYYY")}
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
                  color="textThirtiary"
                >
                  Продолжительность вебинара:
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={400}
                  color="textThirtiary"
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
                  color="textThirtiary"
                >
                  Вебинар для студентов:
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={400}
                  color="textThirtiary"
                >
                  {`${webinar.level} уровня и выше`}
                </Typography>
              </Box>
              <div
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
              </div>
            </Paper>
          </Box>
        );
      })}
      <Box
        sx={{
          marginTop: "60px",
          ...propertyBoxStyles,
          justifyContent: "center",
        }}
      >
        <Button
          variant="convex"
          color="secondary"
        >
          смотреть все
        </Button>
      </Box>
    </Box>
  );
}
