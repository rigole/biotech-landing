"use client";

import { gsap } from "gsap";
import { useScopedGsap } from "@/lib/hooks/useGsap";

const stages = [
  {
    label: "01",
    title: "Target Discovery",
    description: "Disease-relevant targets are identified from proteomic and genomic datasets.",
  },
  {
    label: "02",
    title: "Structure Generation",
    description: "Generative models propose candidate protein folds and binding geometries.",
  },
  {
    label: "03",
    title: "In-Silico Screening",
    description: "Candidates are ranked by predicted stability, affinity, and manufacturability.",
  },
  {
    label: "04",
    title: "Wet-Lab Synthesis",
    description: "Top candidates are synthesized and assayed in Veyra's own laboratory.",
  },
  {
    label: "05",
    title: "Model Feedback",
    description: "Assay results are fed back into the model, sharpening the next generation.",
  },
];

export function Technology() {
  const containerRef = useScopedGsap(({ container }) => {
    const heading = container.querySelectorAll("[data-reveal='heading']");
    const track = container.querySelector("[data-track]");
    const line = container.querySelector("[data-line]");
    const nodes = container.querySelectorAll("[data-node]");
    const cards = container.querySelectorAll("[data-stage-card]");

    gsap.set(heading, { opacity: 0, y: 32 });
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 75%" },
    });

    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: track,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );
    }

    nodes.forEach((node, i) => {
      gsap.fromTo(
        node,
        { backgroundColor: "#1E2830", scale: 0.85 },
        {
          backgroundColor: "#4FE3C1",
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 75%",
            end: "top 55%",
            scrub: 0.4,
          },
        }
      );
      const card = cards[i];
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      }
    });
  });

  return (
    <section id="technology" className="relative bg-panel/40 py-28 lg:py-36">
      <div ref={containerRef} className="mx-auto max-w-7xl px-6 lg:px-12">
        <div data-reveal="heading" className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-bio">
            Technology &amp; Research
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            One pipeline, from sequence to clinic.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Five stages, one continuous feedback loop. Every candidate that
            enters the pipeline makes the next generation of the model
            sharper.
          </p>
        </div>

        <div data-track className="relative mt-24 hidden lg:block">
          <div className="absolute left-0 right-0 top-5 h-px bg-panel-border" />
          <div
            data-line
            className="absolute left-0 top-5 h-px w-full bg-bio"
            style={{ transform: "scaleX(0)" }}
          />

          <div className="relative grid grid-cols-5 gap-6">
            {stages.map((stage) => (
              <div key={stage.label} className="flex flex-col items-start">
                <div
                  data-node
                  className="h-2.5 w-2.5 rounded-full ring-4 ring-deep-ink"
                />
                <div data-stage-card className="mt-6 pr-4">
                  <span className="font-mono text-xs text-signal">{stage.label}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-16 space-y-10 lg:hidden">
          <div className="absolute bottom-0 left-[5px] top-0 w-px bg-panel-border" />
          {stages.map((stage) => (
            <div key={stage.label} className="relative flex gap-6 pl-0">
              <div className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-bio ring-4 ring-deep-ink" />
              <div>
                <span className="font-mono text-xs text-signal">{stage.label}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}