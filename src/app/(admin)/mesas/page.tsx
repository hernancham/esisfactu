/* import { HeaderProductos } from "./_components/HeaderProductos"; */
import FormCreate from "./_components/Form/FormCreate";
import { TablaMesas } from "./_components/TablaMesas";

export default function Page() {
  return (
    <div className='container mx-auto py-6'>
      {/* <HeaderProductos /> */}

      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3'>
          <TablaMesas />
        </div>
        <div className=''>
          <FormCreate />
        </div>
      </div>
    </div>
  );
}
