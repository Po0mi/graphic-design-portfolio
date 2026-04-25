import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FROM_BRUSH = { clipPath: "inset(0 100% 0 0)" };
const TO_BRUSH   = { clipPath: "inset(0 0% 0 0)", ease: "power4.out" };

const FROM_INK = { autoAlpha: 0, scaleX: 0.94, transformOrigin: "left center" };
const TO_INK   = { autoAlpha: 1, scaleX: 1, ease: "expo.out" };

export function useGoalsAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const slots = gsap.utils.toArray<HTMLElement>(".goal-slot");
      const cards = gsap.utils.toArray<HTMLElement>(".goal-card");

      // Header: brush-stroke wipe
      gsap.fromTo(
        ".goals-heading",
        FROM_BRUSH,
        {
          ...TO_BRUSH,
          duration: 1.6,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Each card entrance: brush-stroke wipe as its slot enters
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          FROM_BRUSH,
          {
            ...TO_BRUSH,
            duration: 1.4,
            scrollTrigger: {
              trigger: slots[i],
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Push-back: scale + blur + fade as the next card scrolls in
      cards.forEach((card, i) => {
        if (i >= cards.length - 1) return;

        gsap.to(card, {
          scale: 0.93,
          filter: "blur(6px)",
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: slots[i + 1],
            start: "top 100%",
            end: "top 80%",
            scrub: true,
          },
        });
      });

      // Card inner content: ink-spread for title + description
      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slots[i],
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
            card.querySelector(".goal-title"),
            FROM_BRUSH,
            { ...TO_BRUSH, duration: 1.3 },
            0.2
          )
          .fromTo(
            card.querySelector(".goal-desc"),
            FROM_INK,
            { ...TO_INK, duration: 1.1 },
            0.5
          )
          .fromTo(
            card.querySelectorAll(".goal-tag"),
            FROM_INK,
            { ...TO_INK, duration: 0.8, stagger: 0.08 },
            0.65
          );
      });
    }, section);

    return () => ctx.revert();
  }, [ref]);
}
