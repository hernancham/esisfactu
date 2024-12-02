import { api } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Empleado, RolEmpleado, EstadoEmpleado } from "@prisma/client";

export interface CrearEmpleado {
  nombre: string;
  correo: string;
  direccion?: string;
  telefono?: string;
  fechaIngreso?: Date;
  rolEmpleado: RolEmpleado;
  codigoEmpleado: string;
  estado: EstadoEmpleado;
}

export interface ActualizarEmpleado {
  nombre?: string;
  correo?: string;
  direccion?: string;
  telefono?: string;
  fechaIngreso?: Date;
  rolEmpleado?: RolEmpleado;
  codigoEmpleado?: string;
  estado?: EstadoEmpleado;
}

// Hook para obtener todas los empleados
export const useEmpleados = () =>
  useQuery({
    queryKey: ["empleados"],
    queryFn: async () => {
      const respuesta = await api.get<Empleado[]>("/empleados");
      return respuesta.data;
    },
  });

// Hook para obtener un empleado por ID
export const useEmpleado = (id: number) =>
  useQuery({
    queryKey: ["empleado", id],
    queryFn: async () => {
      const respuesta = await api.get<Empleado>(`/empleados/${id}`);
      return respuesta.data;
    },
    enabled: !!id, // Solo se ejecuta si el ID está disponible
  });

// Hook para obtener un empleado por codigoEmpleado
export const useEmpleadoPorCodigo = (codigoEmpleado: number) =>
  useQuery({
    queryKey: ["empleado", codigoEmpleado],
    queryFn: async () => {
      const respuesta = await api.get<Empleado>(
        `/empleados/buscar/${codigoEmpleado}`
      );
      return respuesta.data;
    },
    enabled: !!codigoEmpleado, // Solo se ejecuta si el ID está disponible
  });

// Hook para crear un nuevo empleado
export const useCrearEmpleado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ datos }: { datos: CrearEmpleado }) => {
      return api.post<Empleado>("/empleados", datos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] }); // Refresca los empleados
    },
  });
};

// Hook para actualizar un empleado
export const useActualizarEmpleado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, datos }: { id: number; datos: ActualizarEmpleado }) => {
      return api.put<Empleado>(`/empleados/${id}`, datos);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["Empleados"] }); // Refresca los empleados
      queryClient.invalidateQueries({ queryKey: ["empleado", variables.id] }); // Refresca un empleado específico
    },
  });
};

// Hook para eliminar una mesa
export const useEliminarEmpleado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return api.delete<Empleado>(`/empleados/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] }); // Refresca los empleados
    },
  });
};
