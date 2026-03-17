"use client";
import { Header } from "./Header";
import { Footer } from "@/components/sections/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Providers } from "./Providers";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GrainOverlay />
      <Cursor />
      <Providers>
        <Header visible={true} />
        <main className="pt-20">{children}</main>
        <Footer />
      </Providers>
    </>
  );
}
