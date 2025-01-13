"use client";

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
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/config/store";
import { setComments } from "@/shared/model";
import { IComment } from "@/shared/types";

import avatarGrayIcon from "@/icons/avatar-gray.svg";
import logoPrimary from "@/icons/logo-primary.svg";
import sendGrayIcon from "@/icons/send-gray.svg";

import styles from "../styles.module.scss";

interface IFormValues {
  comment: string;
}

export default function Questions() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(
    (state) => state.user.profile,
  );
  const { course, comments } = useAppSelector(
    (state) => state.course,
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      comment: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] =
    useState(false);

  function onSubmit({ comment }: IFormValues) {
    if (course) {
      setLoading(true);
      axiosInstance
        .post("/academy/comment_create/", {
          course: course.id,
          comment,
        })
        .then((res) => {
          if (res?.data?.comment) {
            setCommentsLoading(true);
            axiosInstance
              .get<{
                results: IComment[];
              }>(
                `/academy/comment_list/${course.id}`,
              )
              .then((res) => {
                if (
                  res?.data &&
                  Array.isArray(res.data.results)
                ) {
                  dispatch(
                    setComments(res.data.results),
                  );
                }
              })
              .finally(() =>
                setCommentsLoading(false),
              );
          }
        })
        .finally(() => setLoading(false));
    }
  }

  const captionProps = {
    variant:
      "body1" as TypographyProps["variant"],
    component: "p",
    color: "textSecondary",
  };
  return (
    <Box className={styles.questions}>
      <Box
        className={styles.input_wrapper}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
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
              placeholder="Введите ваш вопрос"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message
              }
              disabled={loading}
            />
          )}
        />
        <IconButton
          sx={{ padding: "0px" }}
          type="submit"
          disabled={
            loading || Boolean(errors.comment)
          }
        >
          {loading ? (
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
      {commentsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TubeSpinner
            width={50}
            height={50}
          />
        </Box>
      ) : comments.length > 0 ? (
        <Box
          className={styles.accordeons}
          sx={{
            margin: "10px",
          }}
        >
          {comments.map((comment) => (
            <Accordion
              key={comment.id}
              disabled={comment.answer === null}
            >
              <AccordionSummary>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Image
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
              {comment.answer === "string" && (
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
                        Академия
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
        </Box>
      ) : (
        <Typography
          textAlign="center"
          color="textSecondary"
          fontWeight={600}
          sx={{ marginTop: "16px" }}
        >
          Нет вопросов
        </Typography>
      )}
    </Box>
  );
}
