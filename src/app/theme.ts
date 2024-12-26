"use client";

import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  // interface Palette {
  //   white: PaletteOptions["primary"];
  // }
  // interface PaletteOptions {
  //   white: PaletteOptions["primary"];
  // }
  interface TypeText {
    thirtiary?: string;
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
      light: "#37dccd",
      dark: "#115f58",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F4882D",
      light: "#f8b47b",
      dark: "#c5600a",
      contrastText: "#fff",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#202020",
      thirtiary: "#595959",
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
        root: {
          borderRadius: "10px",
        },
      },
      variants: [
        {
          props: {
            variant: "contained",
            color: "primary",
          },
          style: ({ theme }) => ({
            minHeight: "50px",
            textTransform: "none",
            boxShadow:
              "-1px 1px 2px 0px #CCCCCC33, 1px -1px 2px 0px #CCCCCC33, -1px -1px 2px 0px #FFFFFFE5, 1px 1px 3px 0px #CCCCCCE5",
            ":disabled": {
              color: theme.palette.common.white,
              background: "#A7D2C6",
            },
          }),
        },
        {
          props: {
            variant: "shadow",
            color: "white",
          },
          style: ({ theme }) => ({
            minHeight: "50px",
            background:
              theme.palette.common.white,
            color: theme.palette.text.thirtiary,
            fontWeight: 500,
            textTransform: "none",
            boxShadow:
              "-1px -1px 2px 0px #ffffffe5, 1px -1px 2px 0px #cccccc33, -1px 1px 2px 0px #cccccc33, 1px 1px 3px 0px #cccccce5",
            ":hover": {
              background: "#d6d6d6",
              boxShadow:
                "-1px -1px 2px 0px #ffffffe5, 1px -1px 2px 0px #cccccc33, -1px 1px 2px 0px #cccccc33, 1px 1px 3px 0px #cccccce5",
            },
          }),
        },
        {
          props: { variant: "convex" },
          style: ({ theme }) => ({
            minWidth: "240px",
            minHeight: "50px",
            padding: "10px 4px",
            display: "flex",
            borderRadius: "20px",
            color: theme.palette.common.white,
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
      variants: [
        {
          props: {
            variant: "outlined",
          },
          style: ({ theme }) => ({
            ".MuiOutlinedInput-root": {
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "24px",
              color: theme.palette.text.secondary,
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
  },
});
theme = responsiveFontSizes(theme);

export default theme;
