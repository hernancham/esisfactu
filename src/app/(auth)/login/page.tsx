import { Suspense } from "react";
import { LoginCard } from "./_components/LoginCard";

export default function LoginPage() {
  return (
    <div className='w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 py-4'>
      <div className='hidden bg-muted lg:block'>
        <img
          src='/assets/login-img.svg'
          alt='Image'
          width={1920}
          height={1080}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <Suspense fallback={<>...</>}>
          <LoginCard />
        </Suspense>
      </div>
    </div>
  );
}
