import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import PopoverAnchored from "./PopoverAnchored";

const PAD = 4;

const experiences = [
  {
    role: "Undergraduate Teaching Assistant",
    company: "Queen’s University – School of Computing",
    period: "Jan 2023 – May 2025",
    summary: "Hosted labs/demos for 100+ students; built grading automations.",
    bullets: [
      "Reduced manual grading time by ~40% across 500+ submissions",
      "Created rubric-based plagiarism detection & review pipelines",
      "Helped students debug core CS concepts and structure code"
    ],
    tech: ["Python", "Java", "C", "Prolog"]
  },
  {
    role: "Software Developer Intern (ERP & Dashboards)",
    company: "Winteriors Decor LLC",
    period: "Summer 2024",
    summary: "Cloud dashboards + SQL KPIs with ERP automation and refactors.",
    bullets: [
      "Real-time tracking for 15+ projects via integrated dashboards",
      "ERP module refactors cut average load times by ~35%",
      "Reporting overhead reduced by ~20% with data aggregation & UX"
    ],
    tech: ["JavaScript", "SQL", "Python", "Process Design"]
  },
  {
    role: "Analyst Intern",
    company: "FireCompass",
    period: "Summer 2023",
    summary: "Multi-threaded Python automations for distributed scans; vuln classifier.",
    bullets: [
      "Decreased scan triage time by orchestrating distributed tasks",
      "ImageAI/OpenCV model prioritized vulnerabilities by severity",
      "Built logging and automated alerts for faster response"
    ],
    tech: ["Python", "OpenCV", "ImageAI", "Pipelines"]
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [hoverIdx, setHoverIdx] = useState(null);
  const [pinnedIdx, setPinnedIdx] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const [overOverlay, setOverOverlay] = useState(false);
  const [touchMode, setTouchMode] = useState(false);

  const activeIdx = pinnedIdx !== null ? pinnedIdx : hoverIdx;
  const open = activeIdx != null;
  const active = open ? experiences[activeIdx] : null;

  const withinRect = (rect, x, y) =>
    rect &&
    x >= rect.left - PAD &&
    x <= rect.right + PAD &&
    y >= rect.top - PAD &&
    y <= rect.bottom + PAD;

  // Hover-mode: close when leaving the saved card rect (unless over popover or pinned)
  useEffect(() => {
    if (!(open && !touchMode && pinnedIdx === null)) return;
    const onMove = (e) => {
      if (!cardRect) return;
      const inside = withinRect(cardRect, e.clientX, e.clientY);
      if (!inside && !overOverlay) setHoverIdx(null);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, touchMode, cardRect, overOverlay, pinnedIdx]);

  // Recalculate card rect on scroll/resize so bounds stay accurate
  useEffect(() => {
    if (!open) return;
    const recalc = () => {
      const el = gridRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
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
  }, [open, activeIdx]);

  const openOnHover = (idx, e) => {
    if (touchMode || pinnedIdx !== null) return;
    // Check if device is mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Disable hover on mobile
    
    const r = e.currentTarget.getBoundingClientRect();
    setCardRect(r);
    setHoverIdx(idx);
  };

  const onGridLeave = () => {
    if (!touchMode && !overOverlay && pinnedIdx === null) {
      setHoverIdx(null);
    }
  };

  const onCardClick = (idx, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isMobile = window.innerWidth < 768;
    const el = e.currentTarget;
    setCardRect(el.getBoundingClientRect());
    
    if (isMobile) {
      // Mobile: simple toggle
      setTouchMode(true);
      if (activeIdx === idx) {
        closeAll();
      } else {
        setHoverIdx(idx);
      }
    } else {
      // Desktop: pin/unpin
      if (pinnedIdx === idx) {
        setPinnedIdx(null);
      } else {
        setPinnedIdx(idx);
        setHoverIdx(null);
      }
    }
  };

  const closeAll = () => {
    setHoverIdx(null);
    setPinnedIdx(null);
    setTouchMode(false);
    setCardRect(null);
  };

  return (
    <section ref={sectionRef} id="experience" className="section">
      <div className="container">
        <Reveal>
          <div className="text-center mb-8">
            <div className="text-accent-primary font-mono text-sm mb-2">
              <span className="text-text-secondary">~/experience</span>
              <span className="text-accent-primary"> $ </span>
              <span>ls -la</span>
            </div>
            <h2 className="text-3xl font-semibold text-text-primary">Experience</h2>
            <p className="text-text-secondary mt-2 max-w-2xl mx-auto">
              Professional journey through automation, systems, and problem-solving
            </p>
          </div>
        </Reveal>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onMouseLeave={onGridLeave}
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              data-idx={idx}
              className={`text-left card-hover p-6 cursor-pointer relative group ${
                activeIdx === idx ? 'ring-2 ring-accent-primary/50' : ''
              } ${pinnedIdx === idx ? 'ring-accent-secondary/70' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={(e) => openOnHover(idx, e)}
              onClick={(e) => onCardClick(idx, e)}
              whileHover={{ 
                scale: pinnedIdx === null ? 1.02 : 1,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-accent-tertiary/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-primary/60"></div>
                </div>
                <div className="text-text-tertiary font-mono text-xs">experience.job</div>
              </div>
              
              <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 text-sm text-text-secondary font-mono">
                <span className="text-accent-secondary">{exp.company}</span>
                <span className="text-accent-primary">•</span>
                <span>{exp.period}</span>
              </div>
              <p className="mt-3 text-text-secondary group-hover:text-text-primary transition-colors">
                {exp.summary}
              </p>
              
              {/* Tech stack preview */}
              <div className="flex flex-wrap gap-1 mt-3">
                {exp.tech.slice(0, 3).map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 rounded bg-accent-primary/10 text-accent-primary border border-accent-primary/20 font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {exp.tech.length > 3 && (
                  <span className="text-xs px-2 py-1 text-text-tertiary font-mono">
                    +{exp.tech.length - 3} more
                  </span>
                )}
              </div>

              {/* Hover/Pin indicator */}
              <div className="absolute top-4 right-4 transition-opacity">
                {pinnedIdx === idx ? (
                  <div className="flex items-center gap-1 text-accent-secondary">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                    </svg>
                    <span className="text-xs font-mono">pinned</span>
                  </div>
                ) : (
                  <div className="opacity-0 group-hover:opacity-100">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <PopoverAnchored
          open={open}
          mode="center"
          containerRef={sectionRef}     // center over this section
          onClose={closeAll}
          title=""
          backdrop={touchMode || pinnedIdx !== null}  // backdrop handled automatically for mobile
          capturePointer={true}          // interact with popover
          onOverlayEnter={() => setOverOverlay(true)}
          onOverlayLeave={() => setOverOverlay(false)}
        >
          {active && (
            <div className="min-w[(280px] max-w-[500px] w-full mobile-modal">
              {/* Terminal-style header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-accent-tertiary"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
                  </div>
                  <div className="text-text-tertiary font-mono text-xs">experience_details.json</div>
                </div>
                
                {/* Mobile close button */}
                {touchMode && (
                  <button 
                    onClick={closeAll}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 text-text-secondary"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* JSON-style content */}
              <div className="font-mono text-sm bg-bg-secondary/50 p-4 rounded-lg border border-white/10">
                <div className="text-text-secondary">{"{"}</div>
                <div className="ml-4">
                  <div className="text-accent-secondary">"role"</div>
                  <span className="text-text-tertiary">: </span>
                  <span className="text-accent-primary">"{active.role}"</span>
                  <span className="text-text-tertiary">,</span>
                </div>
                <div className="ml-4">
                  <div className="text-accent-secondary">"company"</div>
                  <span className="text-text-tertiary">: </span>
                  <span className="text-accent-primary">"{active.company}"</span>
                  <span className="text-text-tertiary">,</span>
                </div>
                <div className="ml-4">
                  <div className="text-accent-secondary">"period"</div>
                  <span className="text-text-tertiary">: </span>
                  <span className="text-accent-primary">"{active.period}"</span>
                </div>
                <div className="text-text-secondary">{"}"}</div>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-bold text-text-primary mb-2">Overview</h4>
                <p className="text-text-secondary mb-4">{active.summary}</p>
                
                <h4 className="text-lg font-bold text-text-primary mb-2">Key Achievements</h4>
                <ul className="space-y-2 mb-4">
                  {active.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary">
                      <span className="text-accent-primary font-mono text-sm mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-lg font-bold text-text-primary mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {active.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-1.5 rounded-lg bg-accent-primary/10 text-accent-primary border border-accent-primary/20 font-mono hover:bg-accent-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {touchMode && (
                <div className="text-xs text-text-tertiary mt-4 text-center font-mono">
                  // Tap outside or press ESC to close
                </div>
              )}
              {pinnedIdx !== null && !touchMode && (
                <div className="text-xs text-text-tertiary mt-4 text-center font-mono">
                  // Click card again to unpin, or press ESC to close
                </div>
              )}
            </div>
          )}
        </PopoverAnchored>
      </div>
    </section>
  );
}
