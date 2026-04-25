"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  useEffect(() => {
    // Section stagger: each section slides up as it enters the viewport.
    // Only y — no opacity — so internal section hooks never conflict.
    const sectionTriggers = ScrollTrigger.batch("section", {
      start: "top 92%",
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { y: 80 },
          {
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.1,
          }
        );
      },
    });

    // Generic [data-reveal] brush-stroke stagger for individual elements
    const revealTriggers = ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            autoAlpha: 1,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
          }
        );
      },
    });

    return () => {
      sectionTriggers.forEach((t) => t.kill());
      revealTriggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
