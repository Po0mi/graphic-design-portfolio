import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useAboutAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-container",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
          ".about-description",
          { autoAlpha: 0, y: 48 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }
        )
        .fromTo(
          [".about-subtitle", ".bottom-japanese"],
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out", stagger: 0.15 },
          "-=0.5"
        );
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
