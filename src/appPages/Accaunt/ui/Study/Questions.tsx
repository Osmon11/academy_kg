"use client";

import Image from "next/image";

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

import { useAppSelector } from "@/shared/config/store";

import avatarGrayIcon from "@/icons/avatar-gray.svg";
import logoPrimary from "@/icons/logo-primary.svg";
import sendGrayIcon from "@/icons/send-gray.svg";

import styles from "../styles.module.scss";

export default function Questions() {
  const profile = useAppSelector(
    (state) => state.user.profile,
  );
  const captionProps = {
    variant:
      "caption" as TypographyProps["variant"],
    component: "p",
    color: "textSecondary",
  };
  return (
    <Box className={styles.questions}>
      <Box
        className={styles.input_wrapper}
        component="form"
      >
        <Image
          src={profile?.avatar ?? avatarGrayIcon}
          alt="user profile avatar"
          width={30}
          height={30}
        />
        <TextField
          variant="standard"
          fullWidth
          placeholder="Введите ваш вопрос"
        />
        <IconButton
          sx={{ padding: "0px" }}
          type="submit"
        >
          <Image
            src={sendGrayIcon}
            alt="send gray icon"
            width={30}
            height={30}
          />
        </IconButton>
      </Box>
      <Box
        className={styles.accordeons}
        sx={{
          margin: "10px",
        }}
      >
        <Accordion>
          <AccordionSummary>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Image
                src={avatarGrayIcon}
                alt="user avatar gray"
                width={30}
                height={30}
              />
              <Box>
                <Typography
                  {...captionProps}
                  fontWeight={600}
                >
                  Нурулло
                </Typography>
                <Typography {...captionProps}>
                  Ассаламу алайкум ва рахматуЛлах!
                  Прощает ли Аллах малые и большие
                  грехи в ночь Лейлят-аль-Кадр или
                  здесь имеется в виду только
                  малые грехи?
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
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
                <Typography {...captionProps}>
                  Ва алейкум ассалям ва
                  рахматуЛлахи ва баракатуху!
                  Прощаются только малые грехи.
                  Для прощения больших грехов
                  необходимо сделать покаяние.
                  Если Вы совместите стояние в
                  молитве и покаяние за большие
                  грехи, ин ша Аллах, простит Вам
                  все грехи.
                </Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
