import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { Capabilities } from "@/components/sections/Capabilities";

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-ink text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Technology />
      <Capabilities />
    </main>
  );
}
