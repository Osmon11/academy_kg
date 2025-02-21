import axios from "axios";
import {
  getCookie,
  setCookie,
} from "cookies-next";
import NextAuth, {
  DefaultSession,
} from "next-auth";
import { DefaultUser } from "next-auth";
import GoogleProvider, {
  GoogleProfile,
} from "next-auth/providers/google";
import { cookies } from "next/headers";

import { defaultConfig } from "@/shared/config/axios";
import {
  routePath,
  sessionExpiration,
} from "@/shared/functions";
import { routing } from "@/shared/i18n/routing";

declare module "next-auth/jwt" {
  interface JWT {
    isAuthorized?: boolean;
  }
}
declare module "next-auth" {
  interface User extends DefaultUser {
    isAuthorized?: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routePath("signIn"),
  },
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId:
        process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (
        profile &&
        account &&
        account.access_token
      ) {
        try {
          const locale = await getCookie(
            "NEXT_LOCALE",
          );
          const axiosInstance = axios.create({
            ...defaultConfig,
            headers: {
              "Accept-Language":
                locale ?? routing.defaultLocale,
            },
          });
          const data = await axiosInstance
            .post("/auth/google_sign_in/", {
              token: account.access_token,
              email: profile.email,
              name: profile.name,
            })
            .then((res) => res.data);
          if (data?.access) {
            setCookie(
              process.env
                .NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
              data.access,
              {
                cookies,
                path: "/",
                expires: sessionExpiration(),
              },
            );
            token.isAuthorized = true;
          } else {
            token.isAuthorized = false;
          }
        } catch (error) {
          console.error(
            "Error fetching backend token:",
            error,
          );
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAuthorized =
        token.isAuthorized || false;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
