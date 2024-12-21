"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    thirtiary?: string;
  }
}

const theme = createTheme({
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
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#202020",
        },
      },
    },
  },
});

export default theme;
