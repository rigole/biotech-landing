"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { DataReadout } from "@/components/three/DataReadout";

const ProteinRibbon = dynamic(
  () => import("@/components/three/ProteinRibbon").then((mod) => mod.ProteinRibbon),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Loading model…
        </span>
      </div>
    ),
  }
);

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={item}
            className="font-mono text-xs uppercase tracking-[0.2em] text-bio"
          >
            AI-Native Drug Discovery
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Designing biology with the precision of code.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            Veyra Bio combines generative protein modeling with wet-lab
            validation to move therapeutic candidates from hypothesis to
            clinic in a fraction of the time.
          </motion.p>

          <motion.div variants={item} className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Button href="#technology" variant="primary">
              See the platform
            </Button>
            <Button href="#research" variant="secondary">
              Read the research
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          className="relative aspect-square w-full rounded-3xl border border-panel-border bg-panel"
        >
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <ProteinRibbon />
          </div>
          <DataReadout />
        </motion.div>
      </div>
    </section>
  );
}