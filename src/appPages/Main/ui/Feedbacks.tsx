"use client";

import {
  Box,
  useMediaQuery,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { FeedbackCard } from "@/features/FeedbackCard";

const feedbacks = [
  {
    feedback:
      "Академия - это не просто обучение, это духовный путь, который открывает новые горизонты. Уроки дают не только знания, но и уверенность в правильности своего пути. Благодарю за такую возможность!",
    fullname: "Исмаил Алиев",
    profile_image: "/backgrounds/profile-1.png",
    location: "Бишкек, Кыргызстан",
  },
  {
    feedback:
      "Замечательная академия! Благодаря урокам я научился читать Коран правильно и с пониманием. Преподаватели всегда готовы помочь, атмосфера доброжелательная, а материал преподносится очень доступно. Спасибо за такую важную и нужную работу!",
    fullname: "Лейла Ханафиева",
    profile_image: "/backgrounds/profile-2.png",
    location: "Джалал-Абад, Кыргызстан",
  },
  {
    feedback:
      "Я давно искал место, где мог бы начать изучать Коран, и эта академия стала для меня настоящим открытием. Уроки насыщенные, практичные, с глубоким разбором. Чувствую, как мои знания и вера растут с каждым днем!",
    fullname: "Сулейман Кадыров",
    profile_image: "/backgrounds/profile-3.png",
    location: "Ош, Кыргызстан",
  },
  {
    feedback:
      "Академия - это не просто обучение, это духовный путь, который открывает новые горизонты. Уроки дают не только знания, но и уверенность в правильности своего пути. Благодарю за такую возможность!",
    fullname: "Исмаил Алиев",
    profile_image: "/backgrounds/profile-1.png",
    location: "Бишкек, Кыргызстан",
  },
  {
    feedback:
      "Замечательная академия! Благодаря урокам я научился читать Коран правильно и с пониманием. Преподаватели всегда готовы помочь, атмосфера доброжелательная, а материал преподносится очень доступно. Спасибо за такую важную и нужную работу!",
    fullname: "Лейла Ханафиева",
    profile_image: "/backgrounds/profile-2.png",
    location: "Джалал-Абад, Кыргызстан",
  },
  {
    feedback:
      "Я давно искал место, где мог бы начать изучать Коран, и эта академия стала для меня настоящим открытием. Уроки насыщенные, практичные, с глубоким разбором. Чувствую, как мои знания и вера растут с каждым днем!",
    fullname: "Сулейман Кадыров",
    profile_image: "/backgrounds/profile-3.png",
    location: "Ош, Кыргызстан",
  },
];

export default function Feedbacks() {
  const upMd = useMediaQuery((theme) =>
    theme.breakpoints.up("md"),
  );
  const upLg = useMediaQuery((theme) =>
    theme.breakpoints.up("lg"),
  );
  return (
    <Box
      sx={{
        marginTop: {
          xs: "25px",
          md: "50px",
          lg: "80px",
        },
        padding: {
          xs: "0px 15px",
          md: "0px",
          lg: "0px 70px",
        },
      }}
    >
      <Carousel
        navButtons={upLg}
        dotButtonType="line"
        options={{
          align: upMd ? "center" : "start",
        }}
      >
        {feedbacks.map(
          (feedback, feedbackIndex) => (
            <Box
              key={feedbackIndex}
              sx={{
                height: "auto",
                paddingRight: {
                  xs: "20px",
                  md: "50px",
                },
              }}
            >
              <FeedbackCard
                {...feedback}
                color={
                  feedbackIndex % 2 === 0
                    ? "secondary"
                    : "primary"
                }
              />
            </Box>
          ),
        )}
      </Carousel>
    </Box>
  );
}
