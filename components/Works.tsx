"use client";
import { useRef, useState } from "react";
import "./Works.scss";
import { useWorksAnimation } from "../hooks/useWorksAnimation";

const SRCS = [
  "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1515266591878-f93e32bc5937?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1520121401995-928cd50d4e27?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1520338258525-606b90f95b04?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1521127474489-d524412fd439?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=70",
];

const WORKS = [
  {
    id: 1,
    title: "Graphic Identity",
    titleJp: "グラフィックアイデンティティ",
    description: "A sophisticated visual identity system built around geometric forms and editorial typography.",
    imgLeft: SRCS[0], imgRight: SRCS[1], imgHero: SRCS[2],
  },
  {
    id: 2,
    title: "Print Campaign",
    titleJp: "プリントキャンペーン",
    description: "A bold print campaign bridging traditional Japanese aesthetics with contemporary design.",
    imgLeft: SRCS[3], imgRight: SRCS[4], imgHero: SRCS[5],
  },
  {
    id: 3,
    title: "Editorial Layout",
    titleJp: "エディトリアルレイアウト",
    description: "A minimalist editorial layout designed to let imagery breathe and typography lead.",
    imgLeft: SRCS[6], imgRight: SRCS[7], imgHero: SRCS[8],
  },
  {
    id: 4,
    title: "Brand System",
    titleJp: "ブランドシステム",
    description: "A complete brand system built for quiet luxury — refined, restrained, intentional.",
    imgLeft: SRCS[1], imgRight: SRCS[5], imgHero: SRCS[0],
  },
  {
    id: 5,
    title: "Poster Series",
    titleJp: "ポスターシリーズ",
    description: "A series of exhibition posters exploring the tension between ink, space, and silence.",
    imgLeft: SRCS[4], imgRight: SRCS[8], imgHero: SRCS[6],
  },
];

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useWorksAnimation(sectionRef);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="works" className="works" ref={sectionRef}>

      <div className="projects-label">
        <h2 className="projects-title">Selected Work</h2>
      </div>

      {/* ── List view ───────────────────────────────── */}
      <div className={`works-inner ${active !== null ? "hidden" : ""}`}>

        <div className="works-col works-col--left">
          {WORKS.map((work, i) => (
            <div key={work.id} className={`works-img-wrap ${hovered === i ? "visible" : ""} left`}>
              <img src={work.imgLeft} alt="" draggable={false} />
            </div>
          ))}
        </div>

        <ul className="works-list">
          {WORKS.map((work, i) => (
            <li
              key={work.id}
              className={`works-item ${hovered !== null && hovered !== i ? "dim" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(i)}
            >
              <span className="works-num">0{work.id}</span>
              <h2 className="works-title">{work.title}</h2>
              <span className="works-title-jp">{work.titleJp}</span>
            </li>
          ))}
        </ul>

        <div className="works-col works-col--right">
          {WORKS.map((work, i) => (
            <div key={work.id} className={`works-img-wrap ${hovered === i ? "visible" : ""} right`}>
              <img src={work.imgRight} alt="" draggable={false} />
            </div>
          ))}
        </div>

      </div>

      {/* ── Overlay view ────────────────────────────── */}
      {active !== null && (
        <div className="works-overlay" onClick={() => setActive(null)}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button className="works-close" onClick={() => setActive(null)}>
            <span>← Back</span>
          </button>

          <div className="overlay-body">
            <h2 className="overlay-title">{WORKS[active].title}</h2>
            <span className="overlay-title-jp">{WORKS[active].titleJp}</span>

            <div className="overlay-hero">
              <img src={WORKS[active].imgHero} alt="" draggable={false} />
            </div>

            <div className="overlay-row">
              <div className="overlay-col-left">
                <img src={WORKS[active].imgLeft} alt="" draggable={false} />
              </div>
              <div className="overlay-col-right">
                <img src={WORKS[active].imgRight} alt="" draggable={false} />
                <p className="overlay-desc">{WORKS[active].description}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

    </section>
  );
};

export default Works;
