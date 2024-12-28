import Image from "next/image";
import { Fragment } from "react";
import {
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";

import {
  FormControlLabel,
  FormHelperText,
  FormHelperTextProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";

import radioUncheckedIcon from "@/icons/radio-unchecked.svg";

interface IControllerRadioGroupProps<
  T extends FieldValues,
> extends Omit<ControllerProps<T>, "render"> {
  radioGroup: Omit<
    RadioGroupProps,
    | "variant"
    | "error"
    | "helperText"
    | "slotProps"
  >;
  errorText?: Omit<FormHelperTextProps, "error">;
  options: { value: string; label: string }[];
}

export function ControllerRadioGroup<
  T extends FieldValues,
>({
  radioGroup,
  errorText,
  options,
  ...props
}: IControllerRadioGroupProps<T>) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => (
        <Fragment>
          <RadioGroup
            row
            {...field}
            {...radioGroup}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value + option.label}
                {...option}
                control={
                  <Radio
                    icon={
                      <Image
                        src={radioUncheckedIcon}
                        alt="radio unchecked icon"
                        width={24}
                        height={24}
                      />
                    }
                  />
                }
              />
            ))}
          </RadioGroup>
          {fieldState.error?.message && (
            <FormHelperText
              {...errorText}
              error
            >
              {fieldState.error.message}
            </FormHelperText>
          )}
        </Fragment>
      )}
    />
  );
}
