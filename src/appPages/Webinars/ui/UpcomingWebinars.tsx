import classNames from "classnames";
import Image from "next/image";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { SECTION_PADDING } from "@/shared/config/const";

import styles from "./styles.module.scss";

const webinars = [
  {
    title:
      "Практическое занятие по чтению Корана",
    date: "18:00 - 19.12.2004",
    duration: "≈ 90 минут",
    for_students: "3 уровня и выше",
    seats_total: "15",
    free_seats: "5",
    occupied_seats: "10",
  },
  {
    title:
      'Тема эфира: "Сподвижники и искренность"',
    date: "18:00 - 20.12.2004",
    duration: "≈ 120 минут",
    for_students: "3 уровня и выше",
    seats_total: "15",
    free_seats: "0",
    occupied_seats: "15",
  },
  {
    title: "Практическое занятие по Таджвиду",
    date: "18:00 - 21.12.2004",
    duration: "≈ 60 минут",
    for_students: "3 уровня и выше",
    seats_total: "15",
    free_seats: "5",
    occupied_seats: "10",
  },
];

export default function UpcomingWebinars() {
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
          Number(webinar.free_seats) > 0;
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
                src="/backgrounds/subject-card-1.png"
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
                  {webinar.date}
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
                  {webinar.duration}
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
                  {webinar.for_students}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                fontWeight={600}
                color="error"
                sx={{ marginTop: "12px" }}
              >
                {haveFreeSeats
                  ? `Места ограничены: записано ${webinar.occupied_seats} из ${webinar.seats_total} (осталось ${webinar.free_seats} мест!)`
                  : "Мест не осталось."}
              </Typography>
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
        <Button variant="convex">
          смотреть все
        </Button>
      </Box>
    </Box>
  );
}
