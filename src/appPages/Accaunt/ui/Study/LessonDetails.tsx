"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";

import bookSquareIconPrimary from "@/icons/book-square-primary.svg";
import settingIconPrimary from "@/icons/settng-primary.svg";
import shareIconPrimary from "@/icons/share-primary.svg";

import styles from "../styles.module.scss";
import LessonsList from "./LessonsList";
import Questions from "./Questions";
import TextOfTheLesson from "./TextOfTheLesson";

function a11yProps(index: number) {
  return {
    id: `study-tab-${index}`,
    "aria-controls": `study-tabpanel-${index}`,
  };
}

export default function LessonDetails() {
  const upSm = useMediaQuery((theme) =>
    theme.breakpoints.up("sm"),
  );

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [tab, setTab] = useState(0);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    if (tabs[newValue]) {
      setTab(newValue);
    }
  };
  const tabs = [
    <LessonsList
      key="LessonsList"
      lessons={[
        {
          id: 1,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 2,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 3,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 4,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 5,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 6,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 7,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 8,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 9,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
        {
          id: 10,
          tittle: "Этические нормы молитвы",
          duration: "00:25:48",
          video:
            "https://www.youtube.com/watch?v=XXXepJIKX7o&pp=ygUs0K3RgtC40YfQtdGB0LrQuNC1INC90L7RgNC80Ysg0LzQvtC70LjRgtCy0Ys%3D",
          text_lesson: `Самая яркая составляющая в жизни мусульманина
Самое лучшее дело - вовремя совершенная молитва
Посредством намаза мы усиливаем связь с Аллахом
Очищает грехи
Бережет от нечестий и упущений
Ближе всего к Аллаху в суджуде
Искупление грехов
Только намаз был предписан на небесах
Граница между верой и неверием
Ночная молитва - половина ночи, утренняя - вся ночь
"Фаджр" и "Иша" - тяжелые для лицемеров намазы
Ихсан в намазе`,
        },
      ]}
    />,
    <Questions key="Questions" />,
    <TextOfTheLesson
      key="TextOfTheLesson"
      lesson={{
        id: 1,
        tittle: "Этические нормы молитвы",
        duration: "00:25:48",
        video: "",
        text_lesson: `Ассаляму алейкум ва рахматуЛлахи ва баракятуху, уважаемые учащиеся нашей академии!
Мы продолжаем уроки на тему «Исламская этика». Темой сегодняшнего урока будет пост. Это один из пяти обязательных столпов ислама, которые должен соблюдать каждый мусульманин. На всякий случай повторим все эти столпы:
1) свидетельство о том, что нет божества кроме Аллаха и Мухаммад - Его раб и посланник;
2) пятикратная молитва;
3) выплата закята;
4) соблюдение поста;
5) совершение хаджа.
Сегодня мы говорим о посте. И как всегда, делаем акцент на этической составляющей темы: в каком моральном и душевном состоянии должен находиться человек, мусульманин, верующий, в каком состоянии должно находиться его сердце, когда он выполняет предписания Аллаха.
Пост - это один из самых великих, ярких и явных проявлений жизни мусульманина. Если любого человека нашей планеты спросить, что отличает мусульман от немусульман, они все скажут, что мусульмане молятся, постятся, совершают хадж. Не все знают о закяте, о котором мы говорили на прошлом уроке. О нем знает более узкий круг людей. А для всех остальных религий, конфессий, неверующих людей, мусульманин – это тот, кто молится, постится и совершает хадж, паломничество.
Сегодня мы говорим о посте. Аллах предписал нам пост. В Коране Аллах говорит: «О те, которые уверовали! Вам предписан пост, подобно тому, как он был предписан вашим предшественникам, - быть может, вы устрашитесь» (Коран, 2:183). Причина этого поста, предписания в том, чтобы мы стали богобоязненными. Пост усмиряет человека, укрощает его, охлаждает его страсти и разум. Человек, который в течение светового дня не ест и не пьет, намного смиреннее и спокойнее, разум его чистый. Организм его высвобожден из-под ежедневного и ежечасного переваривания пищи. На это обычно очень много энергии уходит. Да, конечно же, во время поста человеку сложнее передвигаться и работать, но тот, кто постится, знает, какое это великолепное состояние. Каждый мусульманин чувствует, насколько близок он к Аллаху в этот период, он начинает осознавать сколько времени у него есть для поклонения, чтения Корана, общения со своим Господом, для молитвы и мольбы.`,
      }}
    />,
  ];
  const menuItemStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };
  return (
    <Box className={styles.lesson_wrapper}>
      <video />
      <Box
        sx={{
          width: {
            sx: "100%",
            md: "calc(40% - 25px)",
          },
        }}
      >
        <Box
          className={styles.flex_box}
          sx={{
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="study tabs example"
            variant={
              upSm ? "standard" : "scrollable"
            }
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
            <Tab
              label="Текст урока"
              {...a11yProps(2)}
            />
            <Tab
              label="Текст урока"
              {...a11yProps(2)}
            />
          </Tabs>
          <IconButton
            aria-controls={
              open ? "profile-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              open ? "true" : undefined
            }
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <Image
              src={settingIconPrimary}
              alt="setting green icon"
              width={24}
              height={24}
            />
          </IconButton>
        </Box>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "profile-button",
            color: "primary",
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
            }}
            sx={menuItemStyles}
          >
            <Image
              src={bookSquareIconPrimary}
              alt="book square green icon"
              width={24}
              height={24}
            />
            О курсе
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
            }}
            sx={menuItemStyles}
          >
            <Image
              src={shareIconPrimary}
              alt="share green icon"
              width={24}
              height={24}
            />
            Поделиться курсом
          </MenuItem>
        </Menu>
        <Box className={styles.list}>
          {tabs[tab] ?? "No content"}
        </Box>
      </Box>
    </Box>
  );
}
