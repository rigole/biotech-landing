"use client";

import { gsap } from "gsap";
import { useScopedGsap } from "@/lib/hooks/useGsap";

const pillars = [
  {
    label: "01",
    title: "Generative Modeling",
    description:
      "Diffusion-based models propose novel protein structures and binding candidates, exploring conformational space far beyond manual design.",
  },
  {
    label: "02",
    title: "Wet-Lab Validation",
    description:
      "Every computational candidate is synthesized and tested in-house, closing the loop between prediction and physical reality within days, not months.",
  },
  {
    label: "03",
    title: "Closed-Loop Iteration",
    description:
      "Experimental results feed directly back into the model, continuously sharpening prediction accuracy across every design cycle.",
  },
];

export function About() {
  const containerRef = useScopedGsap(({ container }) => {
    const heading = container.querySelectorAll("[data-reveal='heading']");
    const cards = container.querySelectorAll("[data-reveal='card']");

    gsap.set([...heading, ...cards], { opacity: 0, y: 32 });

    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
      },
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
      },
    });
  });

  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div ref={containerRef} className="mx-auto max-w-7xl px-6 lg:px-12">
        <div data-reveal="heading" className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-bio">
            About Veyra Bio
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Where computation meets the bench.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Most drug discovery platforms stop at prediction. We built Veyra
            Bio around a simple conviction: a model is only as good as the
            experiments that correct it. Our pipeline treats generative
            design and laboratory validation as a single, continuous system.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              data-reveal="card"
              className="rounded-2xl border border-panel-border bg-panel p-8 transition-colors hover:border-bio/40"
            >
              <span className="font-mono text-xs text-signal">{pillar.label}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}