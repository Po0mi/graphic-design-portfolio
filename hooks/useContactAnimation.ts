import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FROM_BRUSH = { clipPath: "inset(0 100% 0 0)" };
const TO_BRUSH   = { clipPath: "inset(0 0% 0 0)", ease: "power4.out" };

const FROM_INK = { autoAlpha: 0, scaleX: 0.94, transformOrigin: "left center" };
const TO_INK   = { autoAlpha: 1, scaleX: 1, ease: "expo.out" };

export function useContactAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Columns: ink-spread stagger
      tl.fromTo(
          ".contact-col",
          FROM_INK,
          { ...TO_INK, duration: 1.0, stagger: 0.1 },
          0
        )
        // Rule: brush-stroke wipe across
        .fromTo(
          ".contact-rule",
          FROM_BRUSH,
          { ...TO_BRUSH, duration: 1.2 },
          0.5
        )
        // Big CONTACT text: dramatic brush-stroke wipe, last
        .fromTo(
          ".contact-name span",
          FROM_BRUSH,
          { ...TO_BRUSH, duration: 1.8 },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, [ref]);
}
