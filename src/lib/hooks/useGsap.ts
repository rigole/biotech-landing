"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScopedGsap(
  setup: (ctx: { container: HTMLElement }) => void,
  deps: unknown[] = []
): RefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      return;
    }

    const ctx = gsap.context(() => {
      setup({ container: containerRef.current! });
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return containerRef;
}