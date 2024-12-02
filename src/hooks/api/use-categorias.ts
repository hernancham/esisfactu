import { api } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Categoria, Producto } from "@prisma/client";

export interface CrearCategoria {
  nombre: string;
  descripcion?: string;
}

export interface ActualizarCategoria {
  nombre?: string;
  descripcion?: string;
}

interface CategoriaConProducto extends Categoria {
  productos: Producto[];
}

// Hook para obtener todas las categorías
export const useCategorias = () =>
  useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const respuesta = await api.get<Categoria[]>("/categorias");
      return respuesta.data;
    },
  });

// Hook para obtener todas las categorías con productos
export const useCategoriasConProductos = () =>
  useQuery({
    queryKey: ["categorias/productos"],
    queryFn: async () => {
      const respuesta = await api.get<CategoriaConProducto[]>(
        "/categorias/productos"
      );
      return respuesta.data;
    },
  });

// Hook para obtener una categoría por ID
export const useCategoria = (id: number) =>
  useQuery({
    queryKey: ["categoria", id],
    queryFn: async () => {
      const respuesta = await api.get<Categoria>(`/categorias/${id}`);
      return respuesta.data;
    },
    enabled: !!id, // Solo se ejecuta si el ID está disponible
  });

// Hook para crear una nueva categoría
export const useCrearCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ datos }: { datos: CrearCategoria }) => {
      return api.post<Categoria>("/categorias", datos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] }); // Refresca las categorías
    },
  });
};

// Hook para actualizar una categoría
export const useActualizarCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, datos }: { id: number; datos: ActualizarCategoria }) => {
      return api.put<Categoria>(`/categorias/${id}`, datos);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] }); // Refresca las categorías
      queryClient.invalidateQueries({ queryKey: ["categoria", variables.id] }); // Refresca la categoría específica
    },
  });
};

// Hook para eliminar una categoría
export const useEliminarCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, datos }: { id: number; datos: ActualizarCategoria }) => {
      return api.delete<Categoria>(`/categorias/${id}`, { data: datos });
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] }); // Refresca las categorías
      queryClient.invalidateQueries({ queryKey: ["categoria", variables.id] });
    },
  });
};
