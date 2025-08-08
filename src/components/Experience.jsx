import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import PopoverAnchored from "./PopoverAnchored";

const PAD = 4;

const experiences = [
  {
    role: "Network Security Automation Intern",
    company: "FireCompass",
    period: "2024",
    summary: "Automated reconnaissance pipelines and built an AI classifier to rank vulnerabilities.",
    bullets: [
      "Cut manual triage by prioritizing vuln classes automatically.",
      "Built multi-stage pipelines to gather/normalize scan outputs.",
      "Improved response speed by reducing analyst touch time."
    ],
    tech: ["Python", "OpenCV", "LLMs", "Pandas"]
  },
  {
    role: "Software Intern (ERP & Dashboards)",
    company: "Winteriors Decor LLC",
    period: "2023",
    summary: "Designed ERP dashboards and project tracking with stakeholder feedback loops.",
    bullets: [
      "Gathered requirements from non-technical teams and shipped fixes.",
      "Streamlined reporting with clearer, actionable metrics.",
      "Reduced back-and-forth by documenting flows and SLAs."
    ],
    tech: ["Python", "SQL", "Dashboards", "Process Design"]
  },
  {
    role: "Teaching Assistant",
    company: "Queen’s University",
    period: "2023–2024",
    summary: "Supported programming courses and helped students debug core CS concepts.",
    bullets: [
      "Mentored students on problem-solving and code structure.",
      "Clarified tricky concepts with hands-on examples.",
      "Kept labs running smoothly under time pressure."
    ],
    tech: ["Python", "Java", "Debugging", "Mentorship"]
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [hoverIdx, setHoverIdx] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const [overOverlay, setOverOverlay] = useState(false);
  const [touchMode, setTouchMode] = useState(false);

  const open = hoverIdx != null;
  const active = open ? experiences[hoverIdx] : null;

  const withinRect = (rect, x, y) =>
    rect &&
    x >= rect.left - PAD &&
    x <= rect.right + PAD &&
    y >= rect.top - PAD &&
    y <= rect.bottom + PAD;

  // Hover-mode: close when leaving the saved card rect (unless over popover)
  useEffect(() => {
    if (!(open && !touchMode)) return;
    const onMove = (e) => {
      if (!cardRect) return;
      const inside = withinRect(cardRect, e.clientX, e.clientY);
      if (!inside && !overOverlay) closeAll();
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, touchMode, cardRect, overOverlay]);

  // Recalculate card rect on scroll/resize so bounds stay accurate
  useEffect(() => {
    if (!open) return;
    const recalc = () => {
      const el = gridRef.current?.querySelector(`[data-idx="${hoverIdx}"]`);
      if (!el) return;
      setCardRect(el.getBoundingClientRect());
    };
    recalc();
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, true);
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc, true);
    };
  }, [open, hoverIdx]);

  const openOnHover = (idx, e) => {
    if (touchMode) return;
    const r = e.currentTarget.getBoundingClientRect();
    setCardRect(r);
    setHoverIdx(idx);
  };

  const onGridLeave = () => {
    if (!touchMode && !overOverlay) closeAll();
  };

  const onCardTouchStart = (idx, e) => {
    const el = e.currentTarget;
    setTouchMode(true);
    setCardRect(el.getBoundingClientRect());
    setHoverIdx(idx);
  };

  const closeAll = () => {
    setHoverIdx(null);
    setTouchMode(false);
    setCardRect(null);
  };

  return (
    <section ref={sectionRef} id="experience" className="section">
      <div className="container">
        <Reveal><h2 className="text-3xl font-semibold mb-8 text-center">Experience</h2></Reveal>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onMouseLeave={onGridLeave}
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              data-idx={idx}
              className="text-left card p-6 hover:-translate-y-0.5 transition-transform cursor-pointer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              onMouseEnter={(e) => openOnHover(idx, e)}
              onTouchStart={(e) => onCardTouchStart(idx, e)}
            >
              <h3 className="text-xl font-bold">{exp.role}</h3>
              <span className="text-sm text-white/60">{exp.company} • {exp.period}</span>
              <p className="mt-3 text-white/85">{exp.summary}</p>
            </motion.div>
          ))}
        </div>

        <PopoverAnchored
          open={open}
          mode="center"
          containerRef={sectionRef}     // center over this section
          onClose={closeAll}
          title={active ? `${active.role} — ${active.company}` : ""}
          backdrop={touchMode}           // tap-away in touch mode
          capturePointer={true}          // interact with popover
          onOverlayEnter={() => setOverOverlay(true)}
          onOverlayLeave={() => setOverOverlay(false)}
        >
          {active && (
            <>
              <p className="text-white/85 mb-3">{active.summary}</p>
              <ul className="list-disc list-inside space-y-1 text-white/90">
                {active.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {active.tech.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">
                    {t}
                  </span>
                ))}
              </div>
              {touchMode && <div className="text-xs text-white/50 mt-2">Tap outside or press Esc to close</div>}
            </>
          )}
        </PopoverAnchored>
      </div>
    </section>
  );
}
