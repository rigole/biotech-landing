"use client";

import { useEffect, useState } from "react";

const AMINO_ACIDS = "ACDEFGHIKLMNPQRSTVWY";
const SEQUENCE_LENGTH = 46;
const INITIAL_SEQUENCE = "MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGT";

function randomSequence(length: number) {
  let seq = "";
  for (let i = 0; i < length; i++) {
    seq += AMINO_ACIDS[Math.floor(Math.random() * AMINO_ACIDS.length)];
  }
  return seq;
}

export function DataReadout() {
  const [sequence, setSequence] = useState(INITIAL_SEQUENCE);
  const [confidence, setConfidence] = useState(94.2);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const interval = setInterval(() => {
      setSequence(randomSequence(SEQUENCE_LENGTH));
      setConfidence(90 + Math.random() * 9);
    }, 2200);

    return () => clearInterval(interval);
  }, [mounted, reducedMotion]);

  return (
    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-panel-border bg-deep-ink/70 p-4 font-mono text-xs text-muted backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span>SEQUENCE</span>
        <span className="text-bio">CONFIDENCE {confidence.toFixed(1)}%</span>
      </div>
      <p
        className="mt-2 truncate text-foreground/80"
        aria-live={reducedMotion ? "off" : "polite"}
      >
        {sequence}
      </p>
    </div>
  );
}
