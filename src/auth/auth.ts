import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { apiAuthRoute } from "./routes";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  basePath: apiAuthRoute,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60, //24 hours
  },
  ...authConfig,
});
