import { cn } from "@/lib/utils";
import Link from "next/link";

interface EsisfactuIconProps {
  type?: "logo" | "icon";
  mode?: "light" | "dark";
  className?: string;
}

export const EsisfactuIcon = ({ className }: EsisfactuIconProps) => {
  return (
    <Link
      href='/'
      className={cn("flex items-center justify-center size-12", className)}
    >
      <span className='sr-only'>Esisfactu</span>
      <img
        src='/assets/esisfactu-icon.svg'
        alt='logo esisfactu'
        width={20}
        height={20}
        className='size-4/5'
      />
    </Link>
  );
};
