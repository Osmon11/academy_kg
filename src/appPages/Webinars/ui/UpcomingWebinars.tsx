"use client";

import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import appAxios from "@/shared/config/axios";
import { SECTION_PADDING } from "@/shared/config/const";
import { useAppSelector } from "@/shared/config/store";
import { IUpcomingWebinarListItem } from "@/shared/types";

import styles from "./styles.module.scss";

export default function UpcomingWebinars({
  webinars,
}: {
  webinars: IUpcomingWebinarListItem[];
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
            <div
              className={classNames(
                styles.image_wrapper,
                styles.secondary,
              )}
            >
              <Image
                src={webinar.image}
                alt={webinar.title}
                width={400}
                height={260}
              />
              <div className={styles.content}>
                {haveFreeSeats && (
                  <Button
                    className={styles.button}
                    variant="convex"
                    color="secondary"
                    onClick={() =>
                      leaveARequest(webinar)
                    }
                  >
                    Оставить заявку
                  </Button>
                )}
              </div>
              <div className={styles.overlay} />
            </div>
            <Paper
              className={styles.content_wrapper}
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
            </Paper>
          </Box>
        );
      })}
      {/* <Box
        sx={{
          marginTop: "60px",
          ...propertyBoxStyles,
          justifyContent: "center",
        }}
      >
        <Button variant="convex">
          смотреть все
        </Button>
      </Box> */}
    </Box>
  );
}
