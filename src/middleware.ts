import NextAuth from "next-auth";
import { authConfig } from "@/auth";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
