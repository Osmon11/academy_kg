import axios from "axios";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Providers } from "@/shared/config/Providers";

import "./globals.scss";
import theme from "./theme";

axios.defaults.baseURL = "http://80.64.24.132";
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] =
  "application/json";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Исламская академия",
  description:
    "Первая исламская онлайн-академия в Кыргызстане - доступное образование, глубокие знания, духовное развитие для всех!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(
    "access_token_ilimnuru_kg",
  );
  if (token) {
    axios.defaults.headers["Authorization"] =
      `Bearer ${token.value}`;
  }
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
      </head>
      <body className={`${montserrat.variable}`}>
        <AppRouterCacheProvider
          options={{ enableCssLayer: true }}
        >
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
