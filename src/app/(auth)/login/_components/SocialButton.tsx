"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { defaultRoute } from "@/auth/routes";

interface SocialButtonProps {
  children: React.ReactNode;
  provider: string;
}

export const SocialButton = ({ children, provider }: SocialButtonProps) => {
  const handleClick = async () => {
    await signIn(provider, {
      callbackUrl: defaultRoute,
    });
  };

  return (
    <Button
      onClick={handleClick}
      className='w-full'
    >
      {children}
    </Button>
  );
};
