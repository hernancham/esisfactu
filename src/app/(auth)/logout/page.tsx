"use client";

import { LogoutCard } from "./_components/LogoutCard";

export default function LogoutPage() {
  return (
    <div className='w-full min-h-screen grid grid-cols-1 py-4'>
      <div className='flex flex-col items-center justify-center'>
        <LogoutCard />
      </div>
    </div>
  );
}
