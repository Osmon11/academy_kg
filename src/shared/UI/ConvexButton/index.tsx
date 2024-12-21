import classNames from "classnames";

import {
  Button,
  ButtonOwnProps,
} from "@mui/material";

import styles from "./index.module.scss";

interface IConvexButtonProps
  extends Omit<ButtonOwnProps, "color"> {
  color?: "primary" | "secondary";
}

export function ConvexButton({
  color = "primary",
  ...props
}: IConvexButtonProps) {
  return (
    <Button
      variant="contained"
      {...props}
      color={color}
      className={classNames(
        styles.convex_button,
        styles[color],
      )}
      startIcon={
        props.startIcon ? (
          <div
            className={styles.circle_icon_wrapper}
          >
            {props.startIcon}
          </div>
        ) : undefined
      }
      endIcon={
        props.endIcon ? (
          <div
            className={styles.circle_icon_wrapper}
          >
            {props.endIcon}
          </div>
        ) : undefined
      }
    >
      {props.children}
    </Button>
  );
}
