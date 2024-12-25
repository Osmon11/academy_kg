import classNames from "classnames";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { IRequisiteListItem } from "@/shared/types";

import styles from "./RequisiteCard.module.scss";

export function RequisiteCard({
  qr_code,
  bank,
  phone,
  bank_account,
  name,
}: IRequisiteListItem) {
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
          {bank}
        </Typography>
        <CardMedia
          component="img"
          src={qr_code}
          className={styles.requisite_img}
        />
        {Boolean(phone) && (
          <Typography
            variant="body1"
            color="textSecondary"
          >
            {phone}
          </Typography>
        )}
        {Boolean(bank_account) && (
          <Typography
            variant="body1"
            color="textSecondary"
          >
            {bank_account}
          </Typography>
        )}
        {Boolean(name) && (
          <Typography
            variant="body1"
            color="textSecondary"
            fontWeight={600}
          >
            {name}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
