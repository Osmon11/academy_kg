"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

import {
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import { ELanguage } from "@/shared/config/enum";

import arrowDownBlackIcon from "@/icons/arrow-down-black.svg";
import arrowDownIcon from "@/icons/arrow-down.svg";
import globalBlackIcon from "@/icons/global-black.svg";
import globalIcon from "@/icons/global.svg";

interface ILanguageSelectProps {
  color: "white" | "black" | "primary";
}

const colors = {
  white: "white",
  black: "#202020",
  primary: "primary",
};

export default function LanguageSelect({
  color,
}: ILanguageSelectProps) {
  const [language, setLanguage] =
    useState<ELanguage>(ELanguage.RUS);
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    setAnchorEl(event.currentTarget);
  }
  function changeLanguage(
    value: typeof language,
  ) {
    setLanguage(value);
    setAnchorEl(null);
  }
  const languages = Object.values(ELanguage);
  return (
    <Fragment>
      <Button
        startIcon={
          <Image
            src={
              color === "black"
                ? globalBlackIcon
                : globalIcon
            }
            alt="global icon"
            width={24}
            height={24}
          />
        }
        endIcon={
          <Image
            src={
              color === "black"
                ? arrowDownBlackIcon
                : arrowDownIcon
            }
            alt="arrow down icon"
            width={12}
            height={12}
          />
        }
        sx={{
          width: "fit-content",
          typography: {
            color: colors[color],
            fontSize: "0.75rem",
            textTransform: "uppercase",
          },
        }}
        id="language-button"
        aria-controls={
          open ? "language-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        RUS
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => changeLanguage(language)}
        MenuListProps={{
          "aria-labelledby": "language-button",
          color: "primary",
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang}
            selected={language === lang}
            onClick={() =>
              changeLanguage(lang as ELanguage)
            }
          >
            {lang}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
