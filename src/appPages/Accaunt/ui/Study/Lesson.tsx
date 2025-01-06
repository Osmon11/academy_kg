"use client";

import { useState } from "react";

import { Box, Tab, Tabs } from "@mui/material";

import styles from "../styles.module.scss";

function a11yProps(index: number) {
  return {
    id: `study-tab-${index}`,
    "aria-controls": `study-tabpanel-${index}`,
  };
}

export default function Lesson() {
  const [tab, setTab] = useState(0);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setTab(newValue);
  };
  return (
    <Box className={styles.lesson_wrapper}>
      <video />
      <Box>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="study tabs example"
        >
          <Tab
            label="Уроки"
            {...a11yProps(0)}
          />
          <Tab
            label="Вопросы"
            {...a11yProps(1)}
          />
          <Tab
            label="Текст урока"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
