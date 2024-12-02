"use client";

import { ColMesas } from "./Table/Columns";
import { DataTable } from "./Table/DataTable";
import { useMesas } from "@/hooks/api/use-mesas";

export const TablaMesas = () => {
  const { data: Mesas, isError, error } = useMesas();

  return (
    <DataTable
      searchKey='codigoMesa'
      columns={ColMesas}
      data={Mesas ?? []}
    />
  );
};
