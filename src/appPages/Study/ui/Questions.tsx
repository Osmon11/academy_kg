"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";

import { TubeSpinner } from "@/shared/UI";
import axiosInstance from "@/shared/config/axiosClientInstance";
import { useAppSelector } from "@/shared/config/store";
import { usePaginatedData } from "@/shared/hooks";
import { IComment } from "@/shared/types";

import avatarGrayIcon from "@/icons/avatar-gray.svg";
import logoPrimary from "@/icons/logo-primary.svg";
import sendGrayIcon from "@/icons/send-gray.svg";

import styles from "../styles.module.scss";

interface IFormValues {
  comment: string;
}

export default function Questions({
  courseId,
}: {
  courseId: string;
}) {
  const t = useTranslations("Questions");
  const profile = useAppSelector(
    (state) => state.user.profile,
  );
  const { course } = useAppSelector(
    (state) => state.course,
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormValues>({
    defaultValues: {
      comment: "",
    },
  });
  const {
    sentryRef,
    data,
    setData,
    loading,
    hasNextPage,
  } = usePaginatedData<IComment>({
    endpoint: `/academy/comment_list/${courseId}`,
  });
  const [processing, setProcessing] =
    useState(false);

  function onSubmit({ comment }: IFormValues) {
    if (course && profile) {
      setProcessing(true);
      axiosInstance
        .post("/academy/comment_create/", {
          course: course.id,
          comment,
        })
        .then((res) => {
          if (res?.data?.comment) {
            const newComment: IComment = {
              id: data
                ? data.results.length + 1
                : 1,
              comment,
              user: {
                id: profile.id,
                full_name: profile.full_name,
                avatar: profile.avatar,
              },
              created_at:
                new Date().toISOString(),
              answer: null,
            };
            setData(
              data
                ? {
                    ...data,
                    results: [
                      newComment,
                      ...data.results,
                    ],
                  }
                : {
                    count: 1,
                    previous: null,
                    next: null,
                    results: [newComment],
                  },
            );
            reset();
          }
        })
        .finally(() => setProcessing(false));
    }
  }

  const captionProps = {
    variant:
      "body1" as TypographyProps["variant"],
    component: "p",
    color: "textSecondary",
  };
  const [activeIndex, setActiveIndex] =
    useState(-1);
  return (
    <Box className={styles.questions}>
      <Box
        className={styles.input_wrapper}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
          className="avatar"
          src={profile?.avatar ?? avatarGrayIcon}
          alt="user profile avatar"
          width={30}
          height={30}
        />
        <Controller
          control={control}
          name="comment"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              variant="standard"
              placeholder={t(
                "vvedite-vash-vopros",
              )}
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message
              }
              disabled={processing}
              multiline
              maxRows={3}
            />
          )}
        />
        <IconButton
          type="submit"
          disabled={
            processing || Boolean(errors.comment)
          }
        >
          {processing ? (
            <TubeSpinner
              width={30}
              height={30}
            />
          ) : (
            <Image
              src={sendGrayIcon}
              alt="send gray icon"
              width={30}
              height={30}
            />
          )}
        </IconButton>
      </Box>
      <Box
        className={"accordeons"}
        sx={{
          margin: "10px",
        }}
      >
        {data &&
          data.results.length > 0 &&
          data.results.map((comment, index) => (
            <Accordion
              key={comment.id}
              disabled={comment.answer === null}
              onChange={(_, expanded) => {
                if (expanded) {
                  setActiveIndex(index);
                }
              }}
              expanded={index === activeIndex}
            >
              <AccordionSummary>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Image
                    className="avatar"
                    src={
                      comment.user.avatar ??
                      avatarGrayIcon
                    }
                    alt="user avatar gray"
                    width={30}
                    height={30}
                  />
                  <Box>
                    <Typography
                      {...captionProps}
                      fontWeight={600}
                    >
                      {comment.user.full_name}
                    </Typography>
                    <Typography {...captionProps}>
                      {comment.comment}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              {typeof comment.answer ===
                "string" && (
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Image
                      src={logoPrimary}
                      alt="academy logo primary"
                      width={30}
                      height={30}
                    />
                    <Box>
                      <Typography
                        {...captionProps}
                        fontWeight={600}
                      >
                        {t("akademiya")}
                      </Typography>
                      <Typography
                        {...captionProps}
                      >
                        {comment.answer}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              )}
            </Accordion>
          ))}
        {loading || hasNextPage ? (
          <Box
            ref={sentryRef}
            className="tube_spinner_wrapper"
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
              textAlign="center"
              color="textSecondary"
              fontWeight={600}
              sx={{ marginTop: "16px" }}
            >
              {t("net-voprosov")}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}
