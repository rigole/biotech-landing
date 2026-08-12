"use client";

import { gsap } from "gsap";
import { useScopedGsap } from "@/lib/hooks/useGsap";

const stats = [
  { value: 2400, suffix: "+", label: "Candidate structures generated" },
  { value: 94, suffix: "%", label: "Prediction-to-assay correlation" },
  { value: 18, suffix: "x", label: "Faster than manual screening" },
  { value: 6, suffix: "", label: "Programs in active validation" },
];

export function Statistics() {
  const containerRef = useScopedGsap(({ container }) => {
    const heading = container.querySelectorAll("[data-reveal='heading']");
    const items = container.querySelectorAll("[data-stat-item]");
    const numbers = container.querySelectorAll<HTMLElement>("[data-stat-value]");

    gsap.set(heading, { opacity: 0, y: 28 });
    gsap.set(items, { opacity: 0, y: 28 });

    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 75%" },
    });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: items[0] ?? container, start: "top 85%" },
    });

    numbers.forEach((el) => {
      const target = Number(el.dataset.statValue);
      const suffix = el.dataset.statSuffix ?? "";
      const counter = { value: 0 };

      gsap.to(counter, {
        value: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value).toLocaleString("en-US")}${suffix}`;
        },
      });
    });
  });

  return (
    <section className="relative bg-panel/40 py-28 lg:py-36">
      <div ref={containerRef} className="mx-auto max-w-7xl px-6 lg:px-12">
        <div data-reveal="heading" className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-bio">
            Impact
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Numbers from the pipeline, not projections.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} data-stat-item className="flex flex-col gap-3">
              <span
  data-stat-value={stat.value}
  data-stat-suffix={stat.suffix}
  className="font-display text-4xl font-semibold tabular-nums text-bio sm:text-5xl"
>
  0{stat.suffix}
</span>
              <p className="text-sm leading-relaxed text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}