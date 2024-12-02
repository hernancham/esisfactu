"use client";

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

import { EstadoMesa } from "@prisma/client";
import { useEliminarMesa, useMesa } from "@/hooks/api/use-mesas";

const arrayEstado = Object.values(EstadoMesa) as [string, ...string[]];

const formSchema = z.object({
  codigoMesa: z.string().min(1).max(12),
  estado: z.enum(arrayEstado),
});

export const FormDelete = ({ id }: { id: number }) => {
  const { data: mesa } = useMesa(id);
  const { mutate: eliminarMesa } = useEliminarMesa();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigoMesa: mesa?.codigoMesa ?? "",
      estado: mesa?.estado ?? arrayEstado[0],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      eliminarMesa(id);
      toast(
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-3xl mx-auto py-10'
      >
        <FormDescription>Esta Accion no sera reversible</FormDescription>
        <Button
          size='lg'
          variant='outline'
          className='w-full hidden sm:block'
          type='submit'
        >
          Eliminar
        </Button>
      </form>
    </Form>
  );
};
