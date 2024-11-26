"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerSchema, registerType } from "@/schemas/auth";
import { logUpAction } from "@/auth/actions";

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
import { useRouter } from "next/navigation";
import { defaultRoute } from "@/auth/routes";
import { Dispatch, SetStateAction } from "react";

type AlertType = {
  type: "error" | "warning" | "info" | "help" | "success" | "default";
  message: string;
};

interface RegisterFormProps {
  setAlert: Dispatch<SetStateAction<AlertType | null>>;
}

export const RegisterForm = ({ setAlert }: RegisterFormProps) => {
  const router = useRouter();

  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: registerType) {
    setAlert(null);
    const result = await logUpAction(values);
    if (result.type === "error" || result.type === "info") {
      setAlert({
        type: result.type,
        message: result.message,
      });
    } else if (result.type === "success") {
      router.push(defaultRoute);
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='text'
                  placeholder='Ingresa tus nombres'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='Ingresa tu correo electrónico'
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
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Ingresa tu contraseña'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Repite tu contraseña'
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
          Registrar
        </Button>
      </form>
    </Form>
  );
};
