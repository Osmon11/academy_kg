import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { routing } from "@/shared/i18n/routing";
import "@/shared/styles/globals.scss";

import { Providers } from "./Providers";
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
    url: process.env.NEXTAUTH_URL,
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION,
    siteName: process.env.APP_SITE_NAME,
    images: process.env.APP_IMAGE,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  // @ts-expect-error Argument of type 'string' is not assignable to parameter of type '"ru-RU" | "ky-KG"'.
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <link
          rel="alternate"
          hrefLang="ru-RU"
          href="/ru-RU"
        />
        <link
          rel="alternate"
          hrefLang="ky-KG"
          href="/ky-KG"
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
        <NextIntlClientProvider
          messages={messages}
        >
          <AppRouterCacheProvider
            options={{ enableCssLayer: true }}
          >
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <Providers>{children}</Providers>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
