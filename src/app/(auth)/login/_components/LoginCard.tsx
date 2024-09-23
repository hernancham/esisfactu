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
import { loginRoute, registerRoute } from "@/auth/routes";
import { LoginForm } from "./LoginForm";
import { EsisfactuLogo } from "@/components/custom/EsisfactuLogo";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertMessage } from "@/components/custom/AlertMessage";

export const LoginCard = () => {
  const params = useSearchParams();
  const error = params.get("error");
  const router = useRouter();

  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      switch (error) {
        case "OAuthAccountNotLinked":
          setGlobalError(
            "Por favor, usa tu correo electrónico y contraseña para iniciar sesión."
          );
          break;
        default:
          setGlobalError(
            "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
          );
      }
    }
    router.replace(loginRoute);
  }, [error, router]);

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
        {globalError && (
          <AlertMessage
            title='Error'
            message={globalError}
            type='error'
          />
        )}
        <LoginForm setError={setGlobalError} />
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
