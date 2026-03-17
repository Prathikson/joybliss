"use client";
import { useState } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Showcase } from "@/components/sections/Showcase";
import { Process } from "@/components/sections/Process";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <GrainOverlay />
      <Cursor />
      <Providers>
        <Header visible={loaded} />
        <main>
          <Hero />
          <WhatWeDo />
          <Showcase />
          <Process />
          <TrustedBy />
          <Testimonials />
          <FAQ />
          <CTABanner />
        </main>
        <Footer />
      </Providers>
    </>
  );
}
