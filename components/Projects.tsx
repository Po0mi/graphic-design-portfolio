"use client";
import { useRef, useEffect, useCallback } from "react";
import "./Projects.scss";
import { useProjectsAnimation } from "../hooks/useProjectsAnimation";

const JP_TEXT = [
  { text: "作品",    top: "8%",  left: "28%" },
  { text: "デザイン", top: "22%", left: "62%" },
  { text: "創造",    top: "38%", left: "30%" },
  { text: "美",      top: "52%", left: "78%" },
  { text: "静寂",    top: "63%", left: "18%" },
  { text: "光と影",  top: "76%", left: "44%" },
  { text: "空間",    top: "14%", left: "88%" },
  { text: "表現",    top: "88%", left: "66%" },
  { text: "感覚",    top: "46%", left: "6%"  },
  { text: "色彩",    top: "32%", left: "96%" },
];

const TILES = [
  { id: 1, src: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=70" },
  { id: 2, src: "https://images.unsplash.com/photo-1515266591878-f93e32bc5937?auto=format&fit=crop&w=800&q=70" },
  { id: 3, src: "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?auto=format&fit=crop&w=800&q=70" },
  { id: 4, src: "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?auto=format&fit=crop&w=800&q=70" },
  { id: 5, src: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=800&q=70" },
  { id: 6, src: "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=70" },
  { id: 7, src: "https://images.unsplash.com/photo-1520338258525-606b90f95b04?auto=format&fit=crop&w=800&q=70" },
  { id: 8, src: "https://images.unsplash.com/photo-1521127474489-d524412fd439?auto=format&fit=crop&w=800&q=70" },
  { id: 9, src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=70" },
];

const DEPTHS = [0.018, 0.032, 0.024, 0.042, 0.015, 0.038, 0.028, 0.045, 0.02, 0.035];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useProjectsAnimation(sectionRef);
  const galleryRef = useRef<HTMLDivElement>(null);
  const jpRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Touch drag state
  const touchMode = useRef(false);
  const touchLast = useRef({ x: 0, y: 0 });
  const velocityX = useRef(0);
  const inertiaRef = useRef<number>(0);

  const animate = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * 0.06;
    current.current.y += (target.current.y - current.current.y) * 0.06;

    if (galleryRef.current) {
      galleryRef.current.style.transform =
        `translate(${current.current.x}px, ${current.current.y}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(inertiaRef.current);
    };
  }, [animate]);

  const clampX = useCallback((x: number) => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return x;
    const maxX = gallery.offsetWidth - section.offsetWidth;
    return Math.min(0, Math.max(-maxX, x));
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    touchMode.current = true;
    cancelAnimationFrame(inertiaRef.current);
    const t = e.touches[0];
    touchLast.current = { x: t.clientX, y: t.clientY };
    velocityX.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    const dx = t.clientX - touchLast.current.x;
    velocityX.current = dx;
    target.current.x = clampX(target.current.x + dx);
    touchLast.current = { x: t.clientX, y: t.clientY };
  }, [clampX]);

  const onTouchEnd = useCallback(() => {
    const decay = () => {
      velocityX.current *= 0.9;
      if (Math.abs(velocityX.current) < 0.3) return;
      target.current.x = clampX(target.current.x + velocityX.current);
      inertiaRef.current = requestAnimationFrame(decay);
    };
    inertiaRef.current = requestAnimationFrame(decay);
  }, [clampX]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (touchMode.current) return;
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const rect = section.getBoundingClientRect();
    const xDecimal = (e.clientX - rect.left) / rect.width;
    const yDecimal = (e.clientY - rect.top) / rect.height;

    const maxX = gallery.offsetWidth - rect.width;
    const maxY = gallery.offsetHeight - rect.height;

    target.current.x = maxX * xDecimal * -1;
    target.current.y = maxY * yDecimal * -1;

    // JP text parallax
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    jpRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = DEPTHS[i] ?? 0.02;
      el.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
    });
  }, []);

  return (
    <section
      id="projects"
      className="projects"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="gallery-container">
        <div className="gallery" ref={galleryRef}>
          {TILES.map((tile) => (
            <div key={tile.id} className={`tile tile-${tile.id}`}>
              <img src={tile.src} alt="" draggable={false} />
            </div>
          ))}
          {JP_TEXT.map((item, i) => (
            <span
              key={i}
              ref={(el) => { jpRefs.current[i] = el; }}
              className="jp-text"
              style={{ top: item.top, left: item.left }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
