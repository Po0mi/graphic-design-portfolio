"use client";
import { useRef } from "react";
import "./About.scss";
import { useAboutAnimation } from "@/hooks/useAboutAnimation";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useAboutAnimation(sectionRef);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <p className="about-description">
            A first-year <span>BSDMIA</span> student at CPU Iloilo. I create
            digital and graphic designs, publishing materials, and posters. Work
            that's deliberate, layered, and made to linger.
          </p>
        </div>
        <div className="bottom-text">
          <span className="about-subtitle">Silence is structure</span>
          <span className="bottom-japanese">沈黙は構造</span>
        </div>
      </div>
    </section>
  );
};

export default About;
