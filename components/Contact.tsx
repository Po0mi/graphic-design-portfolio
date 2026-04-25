"use client";
import { useRef } from "react";
import "./Contact.scss";
import { useContactAnimation } from "../hooks/useContactAnimation";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useContactAnimation(sectionRef);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-top">
        <div className="contact-col">
          <a href="mailto:tinambunanryanlee@gmail.com" className="contact-link">
            tinambunanryanlee@gmail.com
          </a>
          <span className="contact-meta">Iloilo, Philippines</span>
        </div>

        <div className="contact-col">
          <a href="#hero" className="contact-link">
            Home
          </a>
          <a href="#works" className="contact-link">
            Works
          </a>
          <a href="#projects" className="contact-link">
            Projects
          </a>
          <a href="#goals" className="contact-link">
            Goals
          </a>
          <a href="#contact" className="contact-link">
            Contact
          </a>
        </div>

        <div className="contact-col contact-col--center">
          <span className="contact-emblem">◉</span>
        </div>

        <div className="contact-col">
          <a
            href="https://instagram.com/PaleRain21"
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com/ZenDaYa21"
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className="contact-col contact-col--end">
          <span className="contact-meta">© 2026 All Rights Reserved</span>
          <span className="contact-meta">Lee Ryan Tinambunan</span>
        </div>
      </div>

      <div className="contact-rule" />

      <div className="contact-name" aria-hidden="true">
        <span>CONTACT</span>
      </div>
    </section>
  );
};

export default Contact;
