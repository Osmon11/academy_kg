"use client";

import classNames from "classnames";
import moment from "moment";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import appAxios from "@/shared/config/axios";
import { SECTION_PADDING } from "@/shared/config/const";
import { useAppSelector } from "@/shared/config/store";
import { IUpcomingWebinarListItem } from "@/shared/types";

import styles from "./styles.module.scss";

function ImageWrapper({
  webinar,
  haveFreeSeats,
}: {
  webinar: IUpcomingWebinarListItem;
  haveFreeSeats: boolean;
}) {
  const profile = useAppSelector(
    (store) => store.user.profile,
  );
  const router = useRouter();
  function leaveARequest(
    webinar: IUpcomingWebinarListItem,
  ) {
    if (profile) {
      if (profile.level >= webinar.level) {
        appAxios
          .post("/academy/request_webinar/", {
            webinar: webinar.id,
          })
          .then((res) => {
            if (res?.data.webinar) {
              toast.success(
                "Вы успешно оставили заявку!",
              );
              toast.info(
                "За несколько минут до начала вы получите индивидуальную ссылку на мероприятие на почту, чтобы перейти прямо в вебинарную комнату.",
                { autoClose: false },
              );
            }
          });
      } else {
        toast.warning(
          "Ваш уровень подготовки пока недостаточен для этого вебинара",
        );
      }
    } else {
      router.push(
        "/authorization/login?return_pathname=/webinars",
      );
    }
  }
  return (
    <div
      className={classNames(
        styles.image_wrapper,
        styles.secondary,
      )}
    >
      <Image
        src={webinar.image}
        alt={webinar.title}
        quality={100}
        fill
      />
      <div className={styles.content}>
        {haveFreeSeats && (
          <Button
            className={styles.button}
            variant="convex"
            color="secondary"
            onClick={() => leaveARequest(webinar)}
          >
            Оставить заявку
          </Button>
        )}
      </div>
      <div className={styles.overlay} />
    </div>
  );
}

export default function UpcomingWebinars({
  webinars,
}: {
  webinars: IUpcomingWebinarListItem[];
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
        const haveFreeSeats =
          webinar.place_count -
            webinar.busy_count >
          0;
        const durationTime = moment(
          webinar.duration,
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
            {upMd && (
              <ImageWrapper
                webinar={webinar}
                haveFreeSeats={haveFreeSeats}
              />
            )}
            <Paper
              className={styles.content_wrapper}
            >
              {!upMd && (
                <ImageWrapper
                  webinar={webinar}
                  haveFreeSeats={haveFreeSeats}
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
                  color="secondary"
                >
                  {webinar.title}
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
                    color="textThirtiary"
                  >
                    Продолжительность вебинара:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="textThirtiary"
                    textAlign="end"
                  >
                    {`≈ ${totalMinutes} минут`}
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
                    textAlign="end"
                  >
                    {`${webinar.level} уровня и выше`}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="error"
                  sx={{ marginTop: "12px" }}
                >
                  {haveFreeSeats
                    ? webinar.busy_count > 0
                      ? `Места ограничены: записано ${webinar.busy_count} из ${webinar.place_count} (осталось ${webinar.place_count - webinar.busy_count} мест!)`
                      : `Места ограничены: ${webinar.place_count} мест`
                    : "Мест не осталось."}
                </Typography>
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}
