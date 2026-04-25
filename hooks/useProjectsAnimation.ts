import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useProjectsAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tile",
        { autoAlpha: 0, scale: 0.88, y: 40 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: { amount: 0.7, from: "random" },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".jp-text",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 0.3,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: { amount: 0.5, from: "random" },
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
