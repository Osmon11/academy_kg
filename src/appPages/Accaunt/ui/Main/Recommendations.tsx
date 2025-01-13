import { Carousel } from "@/widgets/Carousel";

import { RecommendationCard } from "@/features/RecommendationCard";

import { IRecommendationListItem } from "@/shared/types";

export default function Recommendations({
  recommendations,
}: {
  recommendations: IRecommendationListItem[];
}) {
  return (
    <Carousel options={{ align: "start" }}>
      {recommendations.map((item) => (
        <RecommendationCard
          key={item.id}
          recommendation={item}
        />
      ))}
    </Carousel>
  );
}
