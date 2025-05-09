"use client";

import Image from "next/image";

import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import arrowDownGrayIcon from "@/icons/arrow-down-gray.svg";
import checkboxGrayIcon from "@/icons/checkbox-gray-icon.svg";
import checkedSquarePrimaryIcon from "@/icons/checked-square-primary.svg";

declare module "@mui/material/styles" {
  // interface Palette {
  //   white: PaletteOptions["primary"];
  // }
  // interface PaletteOptions {
  //   white: PaletteOptions["primary"];
  // }
  interface TypeText {
    tertiary?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
  interface ButtonPropsVariantOverrides {
    shadow: true;
    convex: true;
  }
}

let theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#1DA599",
      light: "#A6D5C9",
      dark: "#178279",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F4882D",
      light: "#F8CBA3",
      dark: "#c5600a",
      contrastText: "#fff",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#202020",
      tertiary: "#595959",
    },
    action: {
      disabled: "rgb(255 255 255 / 66%)",
    },
  },
  typography: {
    fontFamily: "var(--font-montserrat)",
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: `${theme.spacing(
            1.5,
          )} ${theme.spacing(4)}`,
        }),
      },
    },
    MuiTypography: {
      defaultProps: {
        color: "textPrimary",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "10px",
          "&.Mui-disabled": {
            color: theme.palette.grey[400],
            background: theme.palette.grey[100],
          },
        }),
      },
      variants: [
        {
          props: {
            variant: "contained",
            color: "primary",
          },
          style: ({}) => ({
            minHeight: "60px",
            textTransform: "none",
            boxShadow:
              "-1px 1px 2px 0px #CCCCCC33, 1px -1px 2px 0px #CCCCCC33, -1px -1px 2px 0px #FFFFFFE5, 1px 1px 3px 0px #CCCCCCE5",
          }),
        },
        {
          props: {
            variant: "shadow",
            color: "white",
          },
          style: ({ theme }) => ({
            minHeight: "60px",
            background:
              theme.palette.common.white,
            color: theme.palette.text.tertiary,
            fontWeight: 500,
            textTransform: "none",
            "&, :hover, &.Mui-disabled": {
              boxShadow:
                "-1px -1px 2px 0px #ffffffe5, 1px -1px 2px 0px #cccccc33, -1px 1px 2px 0px #cccccc33, 1px 1px 3px 0px #cccccce5",
            },
            ":hover": {
              background: theme.palette.grey[100],
            },
          }),
        },
        {
          props: { variant: "convex" },
          style: ({ theme }) => ({
            display: "flex",
            color: theme.palette.common.white,
          }),
        },
        {
          props: {
            variant: "convex",
            size: "medium",
          },
          style: ({}) => ({
            minWidth: "240px",
            minHeight: "60px",
            padding: "10px 4px",
            borderRadius: "20px",
          }),
        },
        {
          props: {
            variant: "convex",
            size: "small",
          },
          style: ({}) => ({
            minWidth: "240px",
            minHeight: "30px",
            padding: "7px 4px",
            borderRadius: "8px",
            textTransform: "none",
          }),
        },
        {
          props: {
            variant: "convex",
            color: "primary",
          },
          style: ({ theme }) => ({
            background:
              theme.palette.primary.main,
            boxShadow:
              "1px 1px 2px 0px #2cf8e64d inset, -1px -1px 2px 0px #0f534d80 inset, -1px 1px 2px 0px #0f534d33, 1px -1px 2px 0px #0f534d33, -1px -1px 2px 0px #2cf8e6e5, 1px 1px 3px 0px #0f534de5",
            ":hover": {
              background:
                theme.palette.primary.dark,
            },
          }),
        },
        {
          props: {
            variant: "convex",
            color: "secondary",
          },
          style: ({ theme }) => ({
            background:
              theme.palette.secondary.main,
            boxShadow:
              "1px 1px 2px 0px #ffcc444d inset, -1px -1px 2px 0px #7a441780 inset, -1px 1px 2px 0px #7a441733, 1px -1px 2px 0px #7a441733, -1px -1px 2px 0px #ffcc44e5, 1px 1px 3px 0px #7a4417e5",
            ":hover": {
              background:
                theme.palette.secondary.dark,
            },
          }),
        },
        {
          props: {
            variant: "convex",
            color: "white",
          },
          style: ({ theme }) => ({
            minHeight: "50px",
            color: theme.palette.text.tertiary,
            background:
              theme.palette.common.white,
            textTransform: "none",
            "&, :hover, &.Mui-disabled": {
              boxShadow:
                "1px 1px 2px 0px #FFFFFF4D inset, -1px -1px 2px 0px #AEAEAE80 inset, -1px 1px 2px 0px #AEAEAE33, 1px -1px 2px 0px #AEAEAE33, -1px -1px 2px 0px #FFFFFFE5, 1px 1px 3px 0px #AEAEAEE5",
            },
            ":hover": {
              background: theme.palette.grey[100],
            },
          }),
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          ".MuiInputBase-root": {
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.secondary,
            ":hover:not(.Mui-disabled, .Mui-error):before":
              {
                borderBottom: `2px solid ${theme.palette.text.secondary}`,
              },
          },
        }),
      },
      variants: [
        {
          props: {
            variant: "outlined",
          },
          style: ({ theme }) => ({
            ".MuiOutlinedInput-root": {
              borderRadius: "10px",
              background: "#F6F6F6",
              boxShadow:
                "-1px -1px 2px 0px #FFFFFFE5 inset, 1px -1px 2px 0px #C5C5C533 inset, -1px 1px 2px 0px #C5C5C533 inset, 1px 1px 3px 0px #C5C5C5E5 inset",
              fieldset: {
                border: "1px solid #D1D1D1",
              },
              ":hover": {
                fieldset: {
                  border: "1px solid #505050",
                },
              },
              "&.MuiInputBase-adornedStart": {
                paddingLeft: "18px",
              },
              "&.MuiInputBase-adornedEnd": {
                paddingRight: "18px",
              },
              ".MuiOutlinedInput-input": {
                height: "24px",
                padding: "18px",
                "::placeholder": {
                  color: "#A3A3A3",
                },
                "&:-webkit-autofill": {
                  WebkitBoxShadow:
                    "0 0 0 100px #F6F6F6 inset",
                  WebkitTextFillColor:
                    theme.palette.text.secondary,
                },
                "&.MuiInputBase-inputAdornedStart":
                  {
                    paddingLeft: "0px",
                  },
                "&.MuiInputBase-inputAdornedEnd":
                  {
                    paddingRight: "0px",
                  },
              },
            },
          }),
        },
      ],
    },
    MuiFormControlLabel: {
      defaultProps: {
        slotProps: {
          typography: {
            variant: "h6",
            color: "textTertiary",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 500,
          textTransform: "none",
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({}) => ({
          background: "transparent",
          "&.Mui-expanded": {
            margin: "0px",
            "&::before": {
              opacity: 1,
            },
          },
          "&.Mui-disabled": {
            background: "transparent",
          },
        }),
      },
    },
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: (
          <Image
            src={arrowDownGrayIcon}
            alt="arrow up black icon"
            width={30}
            height={30}
          />
        ),
      },
      styleOverrides: {
        root: {
          padding: "0px",
          "&.Mui-disabled": {
            opacity: 1,
            ".MuiAccordionSummary-expandIconWrapper":
              {
                display: "none",
              },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          borderTop: "2px solid #e5e5e5",
          borderBottom: "2px solid #e5e5e5",
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: {
            variant: "outlined",
            color: "default",
          },
          style: ({ theme }) => ({
            color: theme.palette.text.tertiary,
            border: `1px solid ${theme.palette.text.tertiary}`,
          }),
        },
      ],
    },
    MuiLinearProgress: {
      variants: [
        {
          props: {
            variant: "determinate",
            color: "primary",
          },
          style: () => ({
            height: "10px",
            backgroundColor: "#FFC28A",
            ".MuiLinearProgress-bar": {
              borderTopRightRadius: "30px",
              borderBottomRightRadius: "30px",
            },
          }),
        },
      ],
    },
    MuiCheckbox: {
      defaultProps: {
        icon: (
          <Image
            src={checkboxGrayIcon}
            alt="checkbox gray icon"
            width={24}
            height={24}
          />
        ),
        checkedIcon: (
          <Image
            src={checkedSquarePrimaryIcon}
            alt="checked square green icon"
            width={24}
            height={24}
          />
        ),
      },
      styleOverrides: {
        root: {
          width: "30px",
          height: "30px",
          ".MuiTouchRipple-root": {},
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
