import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    rol: UserRole;
  }
  interface Session {
    user: {
      rol: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    rol: UserRole;
    id: string;
  }
}
