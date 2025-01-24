"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";

import {
  IconButton,
  TextField,
  TextFieldProps,
} from "@mui/material";

import eyeCoalGrayIcon from "@/icons/eye-coal-gray.svg";
import eyeSlashCoalGrayIcon from "@/icons/eye-slash-coal-gray.svg";

interface IControllerTextFieldProps<
  T extends FieldValues,
> extends Omit<ControllerProps<T>, "render"> {
  textField: Omit<
    TextFieldProps,
    "error" | "helperText" | "slotProps"
  >;
}

export function ControllerTextField<
  T extends FieldValues,
>({
  textField,
  ...props
}: IControllerTextFieldProps<T>) {
  const [visiblePassword, setPasswordVisibility] =
    useState(false);
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => (
        <TextField
          {...textField}
          {...field}
          type={
            textField.type === "password"
              ? visiblePassword
                ? "text"
                : "password"
              : textField.type
          }
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          slotProps={
            textField.type === "password"
              ? {
                  input: {
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setPasswordVisibility(
                            (boolean) => !boolean,
                          )
                        }
                      >
                        {visiblePassword ? (
                          <Image
                            src={eyeCoalGrayIcon}
                            alt="eye coal gray"
                            width={24}
                            height={24}
                          />
                        ) : (
                          <Image
                            src={
                              eyeSlashCoalGrayIcon
                            }
                            alt="eye slash coal gray"
                            width={24}
                            height={24}
                          />
                        )}
                      </IconButton>
                    ),
                  },
                }
              : undefined
          }
        />
      )}
    />
  );
}
