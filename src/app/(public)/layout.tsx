"use client";

import { ToasterProvider } from "@/components/providers/ToastProvider";
import { Header } from "./_components/Header";
import { Lines } from "./_components/Lines";
import { Footer } from "./_components/Footer";
import { ScrollToTop } from "./_components/ScrollToTop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-full'>
      <Lines />
      <Header />
      <ToasterProvider />
      {children}
      <Footer />
      <ScrollToTop />
    </section>
  );
}
