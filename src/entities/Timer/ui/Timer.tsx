"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import timerCoalGrayIcon from "@/icons/timer-coal-gray.svg";
import timerRedIcon from "@/icons/timer-red.svg";

// Convert seconds to hours:minutes:seconds format
const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600),
    mins = Math.floor((seconds % 3600) / 60),
    secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  } else {
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
};

interface ITimerProps {
  seconds: number;
  onEnd: () => void;
}

export function Timer({
  seconds,
  onEnd,
}: ITimerProps) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        else {
          onEnd();
          clearInterval(interval);
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
        color={time ? "textTertiary" : "#FF4D4D"}
      >
        {time ? formatTime(time) : "-"}
      </Typography>
      {time ? (
        <Image
          src={timerCoalGrayIcon}
          alt="timer coal gray icon"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={timerRedIcon}
          alt="timer red icon"
          width={24}
          height={24}
        />
      )}
    </Box>
  );
}
