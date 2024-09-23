"use server";

import { signIn, signOut } from "@/auth";
import { loginType, registerSchema, registerType } from "@/schemas/auth";
import { AuthError } from "next-auth";

import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { defaultRoute } from "@/auth/routes";

export const logInCredentialsAction = async (values: loginType) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: defaultRoute,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Credenciales inválidas",
          };
        default:
          return {
            message: "Algo salió mal.",
          };
      }
    }
    throw error;
  }
};

export async function logInOauthAction({ oauth }: { oauth: string }) {
  await signIn(oauth, { redirectTo: defaultRoute });
}

export const logOutAction = async () => {
  await signOut({
    redirectTo: defaultRoute,
  });
};

export const logUpAction = async (values: registerType) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success) {
      return {
        success: false,
        message:
          "Datos inválidos. Por favor, revise la información proporcionada.",
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
        success: false,
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

    return {
      success: true,
      message: "Cuenta creada exitosamente.",
    };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.",
    };
  }
};
