import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWorksAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-title",
        { autoAlpha: 0, y: 48, clipPath: "inset(100% 0 0 0)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".works-item",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
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
