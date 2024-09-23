import { cn } from "@/lib/utils";
import Link from "next/link";

interface EsisfactuLogoProps {
  type?: "logo" | "icon";
  mode?: "light" | "dark";
  className?: string;
}

export const EsisfactuLogo = ({ className }: EsisfactuLogoProps) => {
  return (
    <Link
      href='/'
      className={cn("flex items-center justify-center size-12", className)}
    >
      <span className='sr-only'>Esisfactu</span>
      <img
        src='/assets/esisfactu-logo.svg'
        alt='logo esisfactu'
        width={20}
        height={20}
        className='size-4/5'
      />
    </Link>
  );
};
