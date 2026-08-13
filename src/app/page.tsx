import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { Capabilities } from "@/components/sections/Capabilities";
import { Statistics } from "@/components/sections/Statistics";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-deep-ink text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-bio focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-deep-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Technology />
        <Capabilities />
        <Statistics />
        <FinalCta />
      </main>
    </div>
  );
}
