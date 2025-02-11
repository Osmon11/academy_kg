"use client";

import classNames from "classnames";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { SECTION_PADDING } from "@/shared/config/const";
import { useAppSelector } from "@/shared/config/store";
import { getAllMinutes } from "@/shared/functions";
import { usePaginatedData } from "@/shared/hooks";
import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { IUpcomingWebinarListItem } from "@/shared/types";

import styles from "../styles.module.scss";

function ImageWrapper({
  webinar: webinarProp,
  haveFreeSeats,
}: {
  webinar: IUpcomingWebinarListItem;
  haveFreeSeats: boolean;
}) {
  const t = useTranslations("UpcomingWebinars");
  const [webinar, setWebinar] =
    useState(webinarProp);
  const profile = useAppSelector(
    (store) => store.user.profile,
  );

  const router = useAppRouter();
  const [loading, setLoading] = useState(false);

  function leaveARequest(
    webinar: IUpcomingWebinarListItem,
  ) {
    if (profile) {
      if (profile.level >= webinar.level) {
        setLoading(true);
        axiosInstance
          .post("/academy/request_webinar/", {
            webinar: webinar.id,
          })
          .then((res) => {
            if (res?.data.webinar) {
              toast.success(
                t("vy-uspeshno-ostavili-zayavku"),
              );
              toast.info(
                t("za-neskolko-minut-do"),
                { autoClose: 30000 },
              );
              setWebinar((state) => ({
                ...state,
                is_requested: true,
              }));
            }
          })
          .finally(() => setLoading(false));
      } else {
        toast.warning(
          t("vash-uroven-podgotovki-poka"),
        );
      }
    } else {
      router.push("signIn", {
        queryParams: {
          return_pathname: "/webinars",
        },
      });
    }
  }
  return (
    <Box
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
      <Box className={styles.content}>
        {haveFreeSeats && (
          <Button
            className={styles.button}
            variant="convex"
            color="secondary"
            onClick={() => leaveARequest(webinar)}
            disabled={
              loading || webinar.is_requested
            }
          >
            {loading
              ? t("ozhidanie")
              : webinar.is_requested
                ? t("zayavka-otpravlena")
                : t("ostavit-zayavku")}
          </Button>
        )}
      </Box>
      <Box className={styles.overlay} />
    </Box>
  );
}

export default function UpcomingWebinars() {
  const t = useTranslations("UpcomingWebinars");
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
    usePaginatedData<IUpcomingWebinarListItem>({
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
            const haveFreeSeats =
              webinar.place_count -
                webinar.busy_count >
              0;
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
                  className={
                    styles.content_wrapper
                  }
                >
                  {!upMd && (
                    <ImageWrapper
                      webinar={webinar}
                      haveFreeSeats={
                        haveFreeSeats
                      }
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
                          amount: getAllMinutes(
                            webinar.duration,
                          ),
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
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="error"
                      sx={{ marginTop: "12px" }}
                    >
                      {haveFreeSeats
                        ? webinar.busy_count > 0
                          ? t(
                              "mesta-ogranicheny-zapisano",
                              {
                                amount:
                                  webinar.busy_count,
                                total:
                                  webinar.place_count,
                                left:
                                  webinar.place_count -
                                  webinar.busy_count,
                              },
                            )
                          : t(
                              "mesta-ogranicheny",
                              {
                                amount:
                                  webinar.place_count,
                              },
                            )
                        : t("mest-ne-ostalos")}
                    </Typography>
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
            {t("net-predstoyashikh-vebinarov")}
          </Typography>
        )
      )}
    </Box>
  );
}
