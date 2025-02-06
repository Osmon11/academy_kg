import Image from "next/image";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useAppRouter } from "@/shared/hooks/useAppRouter";
import { ICourseListItem } from "@/shared/types";

import logoIcon from "@/icons/logo.svg";

import styles from "./RecommendationCard.module.scss";

interface IRecommendationCardProps {
  recommendation: ICourseListItem;
}
export function RecommendationCard({
  recommendation,
}: IRecommendationCardProps) {
  const router = useAppRouter();
  return (
    <Card
      className={styles.recommendation_card}
      onClick={() =>
        router.push("[course]", {
          dynamicPaths: {
            course: recommendation.id,
          },
        })
      }
    >
      {recommendation.image ? (
        <CardMedia
          image={recommendation.image}
          title={recommendation.title}
          className={styles.media}
        />
      ) : null}
      <CardContent className={styles.content}>
        <Image
          src={logoIcon}
          alt="islamic online-academy logo"
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
