import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
/* import { sendEmailVerification } from "@/lib/mail"; */

import Google from "next-auth/providers/google";
/* import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github"; */

import {
  logoutRoute,
  registerRoute,
  loginRoute,
  publicRoutes,
  authRoutes,
} from "./routes";

export const authConfig = {
  pages: {
    signIn: loginRoute,
    signOut: logoutRoute,
    newUser: registerRoute,
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    /* Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }), */
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        let user = null;

        const { data, success, error } = loginSchema.safeParse(credentials);

        if (!success) {
          console.error("Credenciales Invalidas", error.errors);
          return null;
        }

        user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user) {
          console.log("Credenciales Invalidas");
          return null;
        }

        if (!user.password) {
          console.log(
            "El usuario no tiene contraseña. Probablemente se registró con un proveedor de oauth."
          );
          return null;
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          console.log("Contraseña incorrecta");
          return null;
        }

        if (!user.emailVerified && false) {
          const verifyTokenExits = await prisma.verificationToken.findFirst({
            where: {
              identifier: user.email,
            },
          });

          // si existe un token, lo eliminamos
          if (verifyTokenExits?.identifier) {
            await prisma.verificationToken.delete({
              where: {
                identifier: user.email,
              },
            });
          }

          const token = nanoid();

          await prisma.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          });

          // enviar email de verificación
          /* await sendEmailVerification(user.email, token); */

          throw new Error("Por favor, verifica tu Email");
        }

        return {
          id: user.id,
          rol: user.rol,
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ request: { nextUrl }, auth }) => {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (publicRoutes.includes(pathname)) {
        return true;
      }

      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user && user.id) {
        token.id = user.id;
        token.rol = user.rol;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.rol = token.rol;
      return session;
    },
  },
} satisfies NextAuthConfig;
