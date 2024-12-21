import classNames from "classnames";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import styles from "./RequisiteCard.module.scss";

interface IRequisiteCardProps {
  requisite_name: string;
  requisite_img: string;
  phone_number?: string;
  card_number?: string;
  fullname: string;
}

export function RequisiteCard({
  requisite_name,
  requisite_img,
  phone_number,
  card_number,
  fullname,
}: IRequisiteCardProps) {
  return (
    <Card
      elevation={0}
      className={classNames(styles.card)}
    >
      <CardContent className={styles.content}>
        <Typography
          variant="body1"
          color="textSecondary"
          fontWeight={600}
        >
          {requisite_name}
        </Typography>
        <CardMedia
          component="img"
          src={requisite_img}
          className={styles.requisite_img}
        />
        {Boolean(phone_number) && (
          <Typography
            variant="body1"
            color="textSecondary"
          >
            {phone_number}
          </Typography>
        )}
        {Boolean(card_number) && (
          <Typography
            variant="body1"
            color="textSecondary"
          >
            {card_number}
          </Typography>
        )}
        {Boolean(fullname) && (
          <Typography
            variant="body1"
            color="textSecondary"
            fontWeight={600}
          >
            {fullname}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
