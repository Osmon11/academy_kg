import classNames from "classnames";
import Image from "next/image";

import {
  TextField,
  TextFieldProps,
} from "@mui/material";

import searchNormalGrayIcon from "@/icons/search-normal-gray.svg";

import styles from "./SearchTextField.module.scss";

interface ISearchTextFieldProps
  extends Omit<
    TextFieldProps,
    "color" | "className" | "slotProps"
  > {
  color?: "white" | "gray";
  border?: boolean;
}

export function SearchTextField({
  color = "gray",
  border,
  ...props
}: ISearchTextFieldProps) {
  return (
    <TextField
      {...props}
      className={styles.text_field}
      placeholder="Поиск"
      slotProps={{
        htmlInput: {
          className: styles.input,
        },
        input: {
          className: classNames(
            styles.input_wrapper,
            styles[color],
            { [styles.border]: border },
          ),
          startAdornment: (
            <Image
              src={searchNormalGrayIcon}
              alt="search normal gray icon"
              width={24}
              height={24}
            />
          ),
        },
      }}
    />
  );
}
