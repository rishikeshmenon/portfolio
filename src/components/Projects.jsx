import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import PopoverAnchored from "./PopoverAnchored";

const PAD = 4;

const projects = [
  {
    title: "Roof (QTMA 1st Place)",
    description: "Student rental platform aggregating & deduping listings with SQL-based filters.",
    bullets: [
      "Aggregated and normalized housing listings across multiple sources",
      "SQL-driven filtering to speed up discovery",
      "Recognized by QTMA for user-focused design"
    ],
    tech: ["Python", "SQL", "React"],
    link: "#"
  },
  {
    title: "Home Lab & Automation",
    description: "Proxmox + Docker stack with segmented networks, VPN, monitoring, and n8n flows.",
    bullets: [
      "Automated backups, health checks, and alerts",
      "Central reverse proxy and TLS for services",
      "Repeatable task automations using n8n"
    ],
    tech: ["Proxmox", "Docker", "Traefik", "n8n"],
    link: "#"
  },
  {
    title: "Grading Automation Toolkit",
    description: "Rubric-based code grading and plagiarism detection automations used in CS courses.",
    bullets: [
      "Cut manual evaluation time by ~40% across 500+ submissions",
      "Unified pipelines for code checks and rubric logging",
      "Consistent, auditable outputs for teaching teams"
    ],
    tech: ["Python", "Pandas", "CLI"],
    link: "#"
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [hoverIdx, setHoverIdx] = useState(null);
  const [pinnedIdx, setPinnedIdx] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const [overOverlay, setOverOverlay] = useState(false);
  const [touchMode, setTouchMode] = useState(false);

  const activeIdx = pinnedIdx !== null ? pinnedIdx : hoverIdx;
  const open = activeIdx != null;
  const active = open ? projects[activeIdx] : null;

  const withinRect = (rect, x, y) =>
    rect &&
    x >= rect.left - PAD &&
    x <= rect.right + PAD &&
    y >= rect.top - PAD &&
    y <= rect.bottom + PAD;

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
    
    setCardRect(e.currentTarget.getBoundingClientRect());
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
    <section ref={sectionRef} id="projects" className="section">
      <div className="container">
        <Reveal>
          <div className="text-center mb-8">
            <div className="text-accent-primary font-mono text-sm mb-2">
              <span className="text-text-secondary">~/projects</span>
              <span className="text-accent-primary"> $ </span>
              <span>find . -name "*.project" -type f</span>
            </div>
            <h2 className="text-3xl font-semibold text-text-primary">Projects</h2>
            <p className="text-text-secondary mt-2 max-w-2xl mx-auto">
              A collection of automation tools, systems, and creative solutions
            </p>
          </div>
        </Reveal>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          onMouseLeave={onGridLeave}
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              data-idx={idx}
              className={`text-left card-hover p-6 cursor-pointer relative group ${
                activeIdx === idx ? 'ring-2 ring-accent-primary/50' : ''
              } ${pinnedIdx === idx ? 'ring-accent-secondary/70' : ''}`}
              initial={{ opacity: 0, y: 12 }}
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
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-accent-tertiary/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-primary/60"></div>
                  </div>
                  <div className="text-text-tertiary font-mono text-xs">project.json</div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-accent-primary transition-colors">
                {proj.title}
              </h3>
              <p className="text-text-secondary group-hover:text-text-primary transition-colors mb-3">
                {proj.description}
              </p>
              
              {/* Tech stack preview */}
              <div className="flex flex-wrap gap-1">
                {proj.tech.slice(0, 3).map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 rounded bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20 font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {proj.tech.length > 3 && (
                  <span className="text-xs px-2 py-1 text-text-tertiary font-mono">
                    +{proj.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Pin/Status indicator */}
              <div className="absolute top-4 right-4 transition-opacity">
                {pinnedIdx === idx ? (
                  <div className="flex items-center gap-1 text-accent-secondary">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                    </svg>
                    <span className="text-xs font-mono">pinned</span>
                  </div>
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></div>
                    <span className="text-xs font-mono text-accent-primary">active</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <PopoverAnchored
          open={open}
          mode="center"
          containerRef={sectionRef}     // center over Projects section
          onClose={closeAll}
          title=""
          backdrop={touchMode || pinnedIdx !== null}  // backdrop handled automatically for mobile
          capturePointer={true}
          onOverlayEnter={() => setOverOverlay(true)}
          onOverlayLeave={() => setOverOverlay(false)}
        >
          {active && (
            <div className="min-w-[280px] max-w-[500px] w-full mobile-modal">
              {/* Terminal-style header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-accent-tertiary"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
                  </div>
                  <div className="text-text-tertiary font-mono text-xs">project_details.md</div>
                </div>
                
                {/* Status or close button */}
                {touchMode ? (
                  <button 
                    onClick={closeAll}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 text-text-secondary"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></div>
                    <span className="text-xs font-mono text-accent-primary">active</span>
                  </div>
                )}
              </div>
              
              {/* Project header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-text-primary mb-1">{active.title}</h3>
                <p className="text-text-secondary">{active.description}</p>
              </div>

              {/* Features/Highlights */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  <span className="text-accent-primary font-mono">#</span>
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {active.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary">
                      <span className="text-accent-secondary font-mono text-sm mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tech Stack */}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                  <span className="text-accent-secondary font-mono">#</span>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {active.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-sm px-3 py-1.5 rounded-lg bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20 font-mono hover:bg-accent-secondary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/10">
                {active.link && active.link !== "#" && (
                  <a 
                    href={active.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary text-sm flex items-center justify-center gap-2 flex-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Project
                  </a>
                )}
                <button className="btn btn-ghost text-sm flex items-center justify-center gap-2 flex-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
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
