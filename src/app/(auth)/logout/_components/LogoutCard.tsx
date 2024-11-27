"use client";

import { defaultRoute, loginRoute } from "@/auth/routes";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { EsisfactuLogo } from "@/components/custom/EsisfactuLogo";
import { Button } from "@/components/ui/button";
import { logOutAction } from "@/auth/actions";
import { signOut } from "next-auth/react";

const handleClick = async () => {
  await signOut({
    callbackUrl: defaultRoute,
  });
};

export const LogoutCard = () => {
  return (
    <Card className='relative max-w-md shadow-md pt-12'>
      <div className='absolute inset-x-0 -top-14 flex justify-center'>
        <EsisfactuLogo className='bg-sky-50 shadow-md size-28 rounded-full' />
      </div>
      <CardHeader>
        <CardTitle className='text-3xl font-semibold text-center'>
          Cerrar sesión
        </CardTitle>
        <CardDescription className='text-center text-balance'>
          ¿Estás seguro que deseas cerrar sesión?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src='/assets/logout-img.svg'
          alt='Image'
          width={1920}
          height={1080}
          className='h-full w-full object-cover'
        />
        <Button
          onClick={handleClick}
          className='w-full'
        >
          Salir
        </Button>
      </CardContent>
      <CardFooter>
        <div className='w-full text-sm text-center'>
          ¿Tienes otra cuenta?{" "}
          <Link
            href={loginRoute}
            className='underline'
          >
            Cambiar de cuenta
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
