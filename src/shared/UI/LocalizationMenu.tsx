import { useLocale } from "next-intl";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";

import {
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import arrowDownBlackIcon from "@/icons/arrow-down-black.svg";
import arrowDownIcon from "@/icons/arrow-down.svg";
import globalBlackIcon from "@/icons/global-black.svg";
import globalIcon from "@/icons/global.svg";

import {
  getPathname,
  routing,
  usePathname,
} from "../i18n/routing";

interface ILocalizationMenuProps {
  color: "white" | "black" | "primary";
}

const colors = {
  white: "white",
  black: "#202020",
  primary: "primary",
};

export function LocalizationMenu({
  color,
}: ILocalizationMenuProps) {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(
    searchParams.entries(),
  );
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    setAnchorEl(event.currentTarget);
  }
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
        {locale.split("-")[1]}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "language-button",
          color: "primary",
        }}
      >
        {routing.locales.map((item) => (
          <MenuItem
            key={item}
            selected={locale === item}
            onClick={() => {
              router.replace(
                getPathname({
                  locale: item,
                  href: {
                    pathname,
                    query: searchParamsObject,
                  },
                }),
              );
              setAnchorEl(null);
            }}
          >
            {item.split("-")[1]}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
