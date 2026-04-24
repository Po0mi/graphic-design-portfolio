import { useEffect, RefObject } from "react";
import gsap from "gsap";

const FROM_WIPE = { clipPath: "inset(100% 0 0 0)", y: 24 };
const TO_WIPE   = { clipPath: "inset(0% 0 0 0)",   y: 0, ease: "power4.out" };
const FROM_FADE = { autoAlpha: 0, y: 12 };
const TO_FADE   = { autoAlpha: 1, y: 0,  ease: "power2.out" };

export function useHeroAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(".hero-title",          FROM_WIPE, { ...TO_WIPE, duration: 1.0 }, 0)
        .fromTo(".hero-title-2",        FROM_WIPE, { ...TO_WIPE, duration: 1.0 }, 0.25)
        .fromTo(".hero-title-sub",      FROM_WIPE, { ...TO_WIPE, duration: 0.9 }, 0.5)
        .fromTo(".hero-japanese",       FROM_FADE, { ...TO_FADE, duration: 0.8 }, 0.7)
        .fromTo(".hero-title-japanese", FROM_FADE, { ...TO_FADE, duration: 0.7 }, 1.05)
        .fromTo(".bottom-text",         FROM_FADE, { ...TO_FADE, duration: 0.8 }, 1.15);
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
