"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { DataReadout } from "@/components/three/DataReadout";

const ProteinRibbon = dynamic(
  () =>
    import("@/components/three/ProteinRibbon").then((mod) => mod.ProteinRibbon),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Loading model…
        </span>
      </div>
    ),
  },
);

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12">
        <div className="flex flex-col items-start gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-bio">
            AI-Native Drug Discovery
          </span>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Designing biology with the precision of code.
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Veyra Bio combines generative protein modeling with wet-lab
            validation to move therapeutic candidates from hypothesis to clinic
            in a fraction of the time.
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Button href="#technology" variant="primary">
              See the platform
            </Button>
            <Button href="#research" variant="secondary">
              Read the research
            </Button>
          </div>
        </div>

        <div className="relative aspect-square w-full rounded-3xl border border-panel-border bg-panel">
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <ProteinRibbon />
          </div>
          <DataReadout />
        </div>
      </div>
    </section>
  );
}
