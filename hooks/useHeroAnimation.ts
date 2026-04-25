import { useEffect, RefObject } from "react";
import gsap from "gsap";

// Horizontal brush-stroke wipe: reveals left → right, like a fude stroke
const FROM_BRUSH = { clipPath: "inset(0 100% 0 0)" };
const TO_BRUSH   = { clipPath: "inset(0 0% 0 0)", ease: "power4.out" };

// Ink-spread reveal for Japanese text: fades in while slightly expanding
const FROM_INK = { autoAlpha: 0, scaleX: 0.94, transformOrigin: "left center" };
const TO_INK   = { autoAlpha: 1, scaleX: 1, ease: "expo.out" };

export function useHeroAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 間 — a deliberate breath before anything begins
      const tl = gsap.timeline({ delay: 0.7 });

      tl.fromTo(".hero-title",          FROM_BRUSH, { ...TO_BRUSH, duration: 1.6 }, 0)
        .fromTo(".hero-title-2",        FROM_BRUSH, { ...TO_BRUSH, duration: 1.6 }, 0.3)
        .fromTo(".hero-title-sub",      FROM_BRUSH, { ...TO_BRUSH, duration: 1.4 }, 0.65)
        .fromTo(".hero-japanese",       FROM_INK,   { ...TO_INK,   duration: 1.3 }, 0.95)
        .fromTo(".hero-title-japanese", FROM_INK,   { ...TO_INK,   duration: 1.1 }, 1.25)
        .fromTo(".bottom-text",         FROM_INK,   { ...TO_INK,   duration: 1.0 }, 1.65);
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
