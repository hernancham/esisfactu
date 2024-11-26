"use server";

import { signIn, signOut } from "@/auth";
import { loginType, registerSchema, registerType } from "@/schemas/auth";
import { AuthError } from "next-auth";

import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { defaultRoute } from "./routes";

export const logInCredentialsAction = async (values: loginType) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: defaultRoute,
    });

    return { type: "success", message: "Inicio de sesión exitoso." };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        type: "error",
        message: error.cause?.err?.message as string,
      };
    }
    console.error("Error logging in:", error);
    return {
      type: "error",
      message: "Ocurrió un error inesperado.",
    };
  }
};

export async function logInOauthAction({ oauth }: { oauth: string }) {
  await signIn(oauth, { redirectTo: defaultRoute });
}

export const logOutAction = async () => {
  await signOut();
};

export const logUpAction = async (values: registerType) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success) {
      return {
        type: "error",
        message: "Datos inválidos",
      };
    }

    // verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return {
        type: "error",
        message:
          "El correo electrónico ya existe. Inicie sesión para continuar.",
      };
    }

    // hash de la contraseña
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    // crear el usuario
    await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return {
      type: "success",
      message: "Revisa tu correo electrónico para verificar tu cuenta.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        type: "info",
        message: error.cause?.err?.message as string,
      };
    }
    console.error("Error creating account:", error);
    return {
      type: "error",
      message: "Ocurrió un error inesperado.",
    };
  }
};
