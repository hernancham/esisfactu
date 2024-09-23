"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, loginType } from "@/schemas/auth";
import { logInCredentialsAction } from "@/auth/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  setError: (error: string | null) => void;
}

export const LoginForm = ({ setError }: LoginFormProps) => {
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginType) {
    try {
      const result = await logInCredentialsAction(values);
      if (result?.message) {
        setError(result.message);
      }
    } catch (error) {
      console.log(
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='Ingresa tu email'
                  autoComplete='off'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel>Contraseña</FormLabel>
                <Link
                  href='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Ingresa tu contraseña'
                  autoComplete='off'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='w-full'
        >
          Ingresar
        </Button>
      </form>
    </Form>
  );
};
