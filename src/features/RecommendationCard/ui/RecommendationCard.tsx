import Image from "next/image";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { IRecommendationListItem } from "@/shared/types";

import styles from "./RecommendationCard.module.scss";

interface IRecommendationCardProps {
  recommendation: IRecommendationListItem;
}
export function RecommendationCard({
  recommendation,
}: IRecommendationCardProps) {
  return (
    <Card className={styles.recommendation_card}>
      <CardMedia
        image={recommendation.image}
        title={recommendation.title}
        className={styles.media}
      />
      <CardContent className={styles.content}>
        <Image
          src={recommendation.logo}
          alt={recommendation.title}
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
            {recommendation.title}
          </Typography>
          <Typography
            className={styles.description}
            variant="body1"
            fontWeight={900}
            textAlign="right"
            textTransform="uppercase"
          >
            {recommendation.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
