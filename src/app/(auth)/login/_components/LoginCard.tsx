"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SocialButton } from "./SocialButton";
import { GoogleLogo } from "@/components/logos";
import { registerRoute } from "@/auth/routes";
import { LoginForm } from "./LoginForm";
import { EsisfactuLogo } from "@/components/custom/EsisfactuLogo";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertMessage } from "@/components/custom/AlertMessage";

type AlertType = {
  type: "error" | "warning" | "info" | "help" | "success" | "default";
  message: string;
};

export const LoginCard = () => {
  const router = useRouter();
  const params = useSearchParams();
  const isVerified = params.get("verified");
  const error = params.get("error");

  const [alert, setAlert] = useState<AlertType | null>(null);

  useEffect(() => {
    if (error) {
      switch (error) {
        case "OAuthAccountNotLinked":
          setAlert({
            type: "error",
            message: "This account is already linked to another user.",
          });
          break;
        default:
          setAlert({
            type: "error",
            message: "An error occurred. Please try again.",
          });
          break;
      }
    }
    if (isVerified === "true") {
      setAlert({
        type: "success",
        message: "Tu cuenta ha sido verificada. Ahora puedes iniciar sesión.",
      });
    }
    router.replace("/login");
  }, [isVerified, error, router]);

  return (
    <Card className='relative max-w-md shadow-md pt-12'>
      <CardHeader>
        <div className='absolute inset-x-0 -top-14 flex justify-center'>
          <EsisfactuLogo className='bg-sky-50 shadow-md size-28 rounded-full' />
        </div>
        <CardTitle className='text-3xl font-semibold text-center'>
          Iniciar sesión
        </CardTitle>
        <CardDescription className='text-center text-balance'>
          Bienvenido de nuevo, entra y empieza a disfrutar
        </CardDescription>
      </CardHeader>
      <CardContent>
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
          />
        )}
        <LoginForm setAlert={setAlert} />
        <span className='text-sm text-gray-500 text-center block my-2'>or</span>
        <div className='my-4'>
          <SocialButton provider='google'>
            <GoogleLogo className='mr-2 size-4' />
            <span>Inicia sesión con Google</span>
          </SocialButton>
        </div>
      </CardContent>
      <CardFooter>
        <div className=' w-full text-sm text-center'>
          ¿Aún no tienes cuenta?{" "}
          <Link
            href={registerRoute}
            className='underline'
          >
            Registrarse
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
