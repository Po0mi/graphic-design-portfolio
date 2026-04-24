"use client";
import { useRef } from "react";
import "./Hero.scss";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroAnimation(sectionRef);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero-container">
        <h1 className="hero-title">Graphic</h1>
        <h1 className="hero-title-2">Designer</h1>
        <span className="hero-japanese">グラフィック デザイナー</span>
        <div className="vertical-text">
          <span className="hero-title-sub">Portfolio</span>
          <span className="hero-title-japanese">ポートフォリオ</span>
        </div>
        <div className="bottom-text">
          <span className="hero-subtitle">Quiet design ◦ Loud presence.</span>
          <span className="bottom-japanese">
            静かなデザイン ◦ 力強い存在感。
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
