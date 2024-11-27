import { Metadata } from "next";

import Hero from "./_components/Hero";
import Brands from "./_components/Brands";
import Feature from "./_components/Features";
import About from "./_components/About";
import FeaturesTab from "./_components/FeaturesTab";
import FunFact from "./_components/FunFact";
import Integration from "./_components/Integration";
import CTA from "./_components/CTA";
import FAQ from "./_components/FAQ";
import Testimonial from "./_components/Testimonial";
import Pricing from "./_components/Pricing";
import Contact from "./_components/Contact";
/* import Blog from "./_components/Blog";*/

export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",
  description: "This is Home for Solid Pro",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Feature />
      <About />
      <FeaturesTab />
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      <Pricing />
      <Contact />
      {/* <Blog /> */}
    </main>
  );
}
