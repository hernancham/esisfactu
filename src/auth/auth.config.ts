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
import { sendVerificationEmail } from "@/utils/send-verification-email";

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
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Credenciales inválidas");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user) {
          throw new Error("El usuario no esta registrado");
        }

        if (!user.password) {
          throw new Error(
            "El usuario no tiene contraseña. Probablemente se registró con un proveedor de oauth."
          );
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        if (!user.emailVerified) {
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
          await sendVerificationEmail({
            email: user.email,
            username: user.name as string,
            token,
          });

          throw new Error("Por favor, verifica tu Email");
        }

        return {
          id: user.id,
          rol: user.rol,
          email: user.email,
          name: user.name,
          image: user.image,
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
