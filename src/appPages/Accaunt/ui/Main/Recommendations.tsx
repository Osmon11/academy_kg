import Image from "next/image";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { Carousel } from "@/widgets/Carousel";

import { IRecommendationListItem } from "@/shared/types";

import styles from "../styles.module.scss";

export default function Recommendations({
  recommendations,
}: {
  recommendations: IRecommendationListItem[];
}) {
  return (
    <Carousel options={{ align: "start" }}>
      {recommendations.map((item) => (
        <Card
          key={item.id}
          className={styles.recommendation_card}
        >
          <CardMedia
            image={item.image}
            title={item.title}
            className={styles.media}
          />
          <CardContent className={styles.content}>
            <Image
              src={item.logo}
              alt={item.title}
              width={60}
              height={60}
            />
            <Box>
              <Typography
                className={styles.title}
                variant="h6"
                fontWeight={900}
                textAlign="right"
                textTransform="uppercase"
              >
                {item.title}
              </Typography>
              <Typography
                className={styles.description}
                variant="body1"
                fontWeight={900}
                textAlign="right"
                textTransform="uppercase"
              >
                {item.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
}
