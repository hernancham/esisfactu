import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export default async function Page() {
  const session = await auth();

  // console.log(session);

  if (session?.user?.rol !== UserRole.Admin) {
    return <div>No tienes el rol de Admin</div>;
  }

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
