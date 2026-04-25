"use client";
import { useRef } from "react";
import "./Goals.scss";
import { useGoalsAnimation } from "../hooks/useGoalsAnimation";

const GOALS = [
  {
    num: "01",
    jp: "短期",
    period: "NOW",
    title: "Develop my visual voice",
    desc: "Strengthen my craft in graphic design and illustration. Build a consistent aesthetic rooted in the eldritch and the strange. Complete a body of work that truly reflects who I am.",
    tags: ["Craft", "Identity"],
    bg: "var(--bg-color)",
  },
  {
    num: "02",
    jp: "中期",
    period: "NEXT",
    title: "Establish a distinct niche",
    desc: "Become a recognized creative voice in cosmic horror-inflected visual art. Expand into publication design and poster work that unsettles and stays with people.",
    tags: ["Niche", "Publications"],
    bg: "var(--red-color)",
  },
  {
    num: "03",
    jp: "長期",
    period: "SOMEDAY",
    title: "Work that outlasts me",
    desc: "Create visual experiences — in games, film, print, and beyond — that leave people permanently unsettled in the best possible way. Work that feels vast, alive, and impossible to ignore.",
    tags: ["Legacy", "Import."],
    bg: "var(--text-color)",
  },
  {
    num: "04",
    jp: "哲学",
    period: "PHILOSOPHY",
    title: "The eldritch as a design language",
    desc: "Horror is not shock. It is the feeling that something is fundamentally wrong — a wrongness that lingers. That wrongness is what I want to build into every mark, every grid, every silence between elements.",
    tags: ["Aesthetic", "Horror"],
    bg: "var(--gold-color)",
  },
  {
    num: "05",
    jp: "影響",
    period: "INFLUENCES",
    title: "Where the work comes from",
    desc: "Lovecraft's dread. Junji Ito's geometry. The quiet unease of brutalist print. These aren't references — they are the water I swim in. The goal is to synthesize them into something entirely my own.",
    tags: ["Junji Ito", "Lovecraft", "Brutalism"],
    bg: "var(--bg-color)",
  },
];

const Goals = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGoalsAnimation(sectionRef);

  return (
    <section id="goals" className="goals" ref={sectionRef}>
      <div className="goals-header">
        <h2 className="goals-heading">Goals as an Artist</h2>
      </div>

      <div className="goals-stack">
        {GOALS.map((goal, i) => (
          <div key={i} className="goal-slot">
            <div
              className="goal-card"
              style={
                {
                  "--index": i,
                  "--bg": goal.bg,
                } as React.CSSProperties
              }
            >
              <div className="goal-card-inner">
                <div className="goal-card-left">
                  <div className="goal-card-top">
                    <span className="goal-period-jp">{goal.jp}</span>
                    <span className="goal-period">{goal.period}</span>
                  </div>
                  <h3 className="goal-title">{goal.title}</h3>
                  <div className="goal-tags">
                    {goal.tags.map((tag) => (
                      <span key={tag} className="goal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="goal-card-right">
                  <p className="goal-desc">{goal.desc}</p>
                </div>
              </div>

              <span className="goal-watermark">{goal.num}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Goals;
