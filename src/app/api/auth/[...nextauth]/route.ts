import NextAuth from "next-auth";
import GoogleProvider, {
  GoogleProfile,
} from "next-auth/providers/google";

import { routePath } from "@/shared/functions";

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
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routePath("signIn", {
      queryParams: { via: "google" },
    }),
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
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
