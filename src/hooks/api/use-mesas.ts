import { api } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mesa, EstadoMesa } from "@prisma/client";

export interface CrearMesa {
  codigoMesa: string;
  estado: EstadoMesa;
}

export interface ActualizarMesa {
  codigoMesa?: string;
  estado?: EstadoMesa;
}

// Hook para obtener todas las mesas
export const useMesas = () =>
  useQuery({
    queryKey: ["mesas"],
    queryFn: async () => {
      const respuesta = await api.get<Mesa[]>("/mesas");
      return respuesta.data;
    },
  });

// Hook para obtener una mesa por ID
export const useMesa = (id: number) =>
  useQuery({
    queryKey: ["mesa", id],
    queryFn: async () => {
      const respuesta = await api.get<Mesa>(`/mesas/${id}`);
      return respuesta.data;
    },
    enabled: !!id, // Solo se ejecuta si el ID está disponible
  });

// Hook para crear una nueva mesa
export const useCrearMesa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ datos }: { datos: CrearMesa }) => {
      return api.post<Mesa>("/mesas", datos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mesas"] }); // Refresca las mesas
    },
  });
};

// Hook para actualizar una mesa
export const useActualizarMesa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, datos }: { id: number; datos: ActualizarMesa }) => {
      return api.put<Mesa>(`/mesas/${id}`, datos);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["mesas"] }); // Refresca las mesas
      queryClient.invalidateQueries({ queryKey: ["mesa", variables.id] }); // Refresca la mesa específica
    },
  });
};

// Hook para eliminar una mesa
export const useEliminarMesa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return api.delete<Mesa>(`/mesas/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["mesas"] }); // Refresca las mesas
    },
  });
};
