"use client";

import { gsap } from "gsap";
import { useScopedGsap } from "@/lib/hooks/useGsap";

const capabilities = [
  {
    title: "De Novo Protein Design",
    description:
      "Generate entirely new protein sequences and folds optimized for a target function, not limited to known scaffolds.",
  },
  {
    title: "Binding Affinity Prediction",
    description:
      "Score candidate molecules for target affinity before a single reagent is ordered.",
  },
  {
    title: "Structure Validation",
    description:
      "Cryo-EM and X-ray crystallography confirm predicted folds against physical structure.",
  },
  {
    title: "High-Throughput Assays",
    description:
      "Automated wet-lab pipelines test hundreds of candidates per week under consistent conditions.",
  },
  {
    title: "Manufacturability Scoring",
    description:
      "Every candidate is ranked on expression yield and stability, not just theoretical potency.",
  },
  {
    title: "Regulatory-Ready Data Packages",
    description:
      "Structured documentation of the full design-to-validation trail, built for downstream regulatory review.",
  },
];

export function Capabilities() {
  const containerRef = useScopedGsap(({ container }) => {
    const heading = container.querySelectorAll("[data-reveal='heading']");
    const cards = container.querySelectorAll("[data-capability-card]");

    gsap.set([...heading, ...cards], { opacity: 0, y: 28 });

    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 75%" },
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger: cards[0] ?? container, start: "top 85%" },
    });
  });

  return (
    <section id="capabilities" className="relative py-28 lg:py-36">
      <div ref={containerRef} className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          data-reveal="heading"
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bio">
              Capabilities
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Everything between hypothesis and candidate.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            A full-stack platform spanning computational design, physical
            validation, and the documentation needed to move forward.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              data-capability-card
              className="group relative overflow-hidden rounded-2xl border border-panel-border bg-panel p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bio/50"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(79,227,193,0.12),transparent_70%)]" />
              <h3 className="relative font-display text-lg font-semibold text-foreground">
                {capability.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}