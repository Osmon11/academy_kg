import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Providers } from "@/shared/config/Providers";

import "./globals.scss";
import theme from "./theme";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.APP_TITLE,
  description: process.env.APP_DESCRIPTION,
  openGraph: {
    type: "website",
    url: process.env.APP_URL,
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION,
    siteName: process.env.APP_SITE_NAME,
    images: process.env.APP_IMAGE,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />
      </body>
    </html>
  );
}
