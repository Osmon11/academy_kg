"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import timerCoalGrayIcon from "@/icons/timer-coal-gray.svg";

// Convert seconds to minutes:seconds format
const formatTime = (time: number) => {
  return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`;
};

interface ITimerProps {
  minutes: number;
  onEnd: () => void;
}

export default function Timer({
  minutes,
  onEnd,
}: ITimerProps) {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        else {
          onEnd();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onEnd]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color="textThirtiary"
      >
        {formatTime(time)}
      </Typography>
      <Image
        src={timerCoalGrayIcon}
        alt="timer coal gray icon"
        width={24}
        height={24}
      />
    </Box>
  );
}
