import { setCookie } from "cookies-next/server";
import NextAuth from "next-auth";
import GoogleProvider, {
  GoogleProfile,
} from "next-auth/providers/google";
import { cookies } from "next/headers";

import { createAxiosInstanceForSSR } from "@/shared/config/axiosServerInstance";
import {
  routePath,
  sessionExpiration,
} from "@/shared/functions";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
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
          const axiosInstance =
            await createAxiosInstanceForSSR();
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
  },
});

export { handler as GET, handler as POST };
