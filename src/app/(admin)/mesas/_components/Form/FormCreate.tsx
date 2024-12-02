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
import { useCrearMesa } from "@/hooks/api/use-mesas";

const arrayEstado = Object.values(EstadoMesa) as [string, ...string[]];

const formSchema = z.object({
  codigoMesa: z.string().min(1).max(12),
  estado: z.enum(arrayEstado),
});

export default function FormCreate() {
  const { mutate: crearMesa } = useCrearMesa();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigoMesa: "",
      estado: arrayEstado[0],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      crearMesa({
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
                onValueChange={field.onChange}
                defaultValue={field.value}
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
        <Button type='submit'>Crear</Button>
      </form>
    </Form>
  );
}
