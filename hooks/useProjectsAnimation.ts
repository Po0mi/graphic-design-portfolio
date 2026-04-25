import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FROM_BRUSH = { clipPath: "inset(0 100% 0 0)" };
const TO_BRUSH   = { clipPath: "inset(0 0% 0 0)", ease: "power4.out" };

const FROM_INK = { autoAlpha: 0, scaleX: 0.94, transformOrigin: "left center" };
const TO_INK   = { autoAlpha: 1, scaleX: 1, ease: "expo.out" };

export function useProjectsAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Tiles: brush-stroke wipe, random stagger for a scattered ink-drop feel
      gsap.fromTo(
        ".tile",
        FROM_BRUSH,
        {
          ...TO_BRUSH,
          duration: 1.4,
          stagger: { amount: 1.0, from: "random" },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // JP text: ink-spread fade, follows after tiles
      gsap.fromTo(
        ".jp-text",
        FROM_INK,
        {
          ...TO_INK,
          duration: 1.2,
          stagger: { amount: 0.8, from: "random" },
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [ref]);
}
