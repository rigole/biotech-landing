"use client";

import { gsap } from "gsap";
import { Button } from "@/components/ui/Button";
import { useScopedGsap } from "@/lib/hooks/useGsap";

export function FinalCta() {
  const containerRef = useScopedGsap(({ container }) => {
    const elements = container.querySelectorAll("[data-reveal]");

    gsap.set(elements, { opacity: 0, y: 32 });
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: container, start: "top 75%" },
    });
  });

  return (
    <section id="cta" className="relative py-28 lg:py-40">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-panel-border bg-panel px-8 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,227,193,0.14),transparent_65%)]" />

        <span
          data-reveal
          className="relative font-mono text-xs uppercase tracking-[0.2em] text-bio"
        >
          Start a Program
        </span>

        <h2
          data-reveal
          className="relative mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          Let&apos;s take your target from sequence to candidate.
        </h2>

        <p data-reveal className="relative mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
          Tell us about your program and we&apos;ll walk you through how
          Veyra&apos;s pipeline could apply to it — no commitment required.
        </p>

        <div data-reveal className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="mailto:hello@veyra.bio" variant="primary">
            Talk to our team
          </Button>
          <Button href="#technology" variant="secondary">
            Explore the platform
          </Button>
        </div>
      </div>
    </section>
  );
}