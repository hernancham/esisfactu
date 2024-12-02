"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EstadoMesa } from "@prisma/client";
import { useActualizarMesa, useMesa } from "@/hooks/api/use-mesas";
import { useEffect } from "react";

const arrayEstado = Object.values(EstadoMesa) as [string, ...string[]];

const formSchema = z.object({
  codigoMesa: z.string().min(1).max(12),
  estado: z.enum(arrayEstado),
});

export const FormUpdate = ({ id }: { id: number }) => {
  const { data: mesa, isLoading } = useMesa(id);
  const { mutate: actualizarMesa } = useActualizarMesa();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigoMesa: "",
      estado: "",
    },
  });

  useEffect(() => {
    if (mesa) {
      form.reset({
        codigoMesa: mesa.codigoMesa,
        estado: mesa.estado,
      });
    }
  }, [mesa, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      actualizarMesa({
        id: id,
        datos: {
          codigoMesa: values.codigoMesa,
          estado: values.estado as EstadoMesa,
        },
      });
      toast(
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-3xl mx-auto py-10'
      >
        <FormField
          control={form.control}
          name='codigoMesa'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo de Mesa</FormLabel>
              <FormControl>
                <Input
                  placeholder='Ingrese su Codigo'
                  type='text'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Identificador personalizado para la mesa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='estado'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona un Estado' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {arrayEstado.map((estado) => (
                    <SelectItem
                      key={estado}
                      value={estado}
                    >
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Configura el estado de la mesa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
};
