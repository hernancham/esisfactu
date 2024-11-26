import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className='relative'>
      <Input
        type='search'
        placeholder='Buscar productos...'
        className='w-full pl-10 pr-4 py-2 rounded-full bg-lime-50 border-lime-200 focus:border-lime-300 focus:ring focus:ring-lime-200 focus:ring-opacity-50'
      />
      <Search className='absolute left-3 top-2.5 h-5 w-5 text-lime-600' />
    </div>
  );
}
