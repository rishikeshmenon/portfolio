import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import PopoverAnchored from "./PopoverAnchored";

const PAD = 4;

const projects = [
  {
    title: "Roof App",
    description: "Student rental platform with scraping + SQL filtering.",
    bullets: [
      "Aggregated listings; deduped and normalized data.",
      "Implemented filters to speed up discovery.",
      "Designed a clean, simple UX for search."
    ],
    tech: ["Python", "PostgreSQL", "React"],
    link: "#"
  },
  {
    title: "Home Lab & Automation",
    description: "Proxmox + Docker with VPN, segmentation, monitoring; n8n automations.",
    bullets: [
      "Automated backups, health checks, and alerts.",
      "Central reverse proxy and TLS for services.",
      "n8n flows to auto-handle routine tasks."
    ],
    tech: ["Proxmox", "Docker", "n8n", "Traefik"],
    link: "#"
  },
  {
    title: "AI Event Center Classifier",
    description: "Collected screenshots + classified pages via ImageAI/OpenCV.",
    bullets: [
      "Multi-threaded pipeline for ingest & labeling.",
      "Trained model and tuned thresholds.",
      "Cut manual review time significantly."
    ],
    tech: ["Python", "OpenCV", "ImageAI"],
    link: "#"
  },
  {
    title: "Job Board Scraper + AI Filter",
    description: "n8n workflow that emails matched new-grad roles.",
    bullets: [
      "Parsed sites and normalized job fields.",
      "Lightweight prompting/embeddings to score fit.",
      "Automated daily digest to inbox."
    ],
    tech: ["n8n", "Python", "LLMs"],
    link: "#"
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [hoverIdx, setHoverIdx] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const [overOverlay, setOverOverlay] = useState(false);
  const [touchMode, setTouchMode] = useState(false);

  const open = hoverIdx != null;
  const active = open ? projects[hoverIdx] : null;

  const withinRect = (rect, x, y) =>
    rect &&
    x >= rect.left - PAD &&
    x <= rect.right + PAD &&
    y >= rect.top - PAD &&
    y <= rect.bottom + PAD;

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
    setCardRect(e.currentTarget.getBoundingClientRect());
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
    <section ref={sectionRef} id="projects" className="section">
      <div className="container">
        <Reveal><h2 className="text-3xl font-semibold mb-8 text-center">Projects</h2></Reveal>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          onMouseLeave={onGridLeave}
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              data-idx={idx}
              className="text-left card p-6 hover:-translate-y-0.5 transition-transform cursor-pointer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              onMouseEnter={(e) => openOnHover(idx, e)}
              onTouchStart={(e) => onCardTouchStart(idx, e)}
            >
              <h3 className="text-xl font-bold mb-1">{proj.title}</h3>
              <p className="text-white/80">{proj.description}</p>
            </motion.div>
          ))}
        </div>

        <PopoverAnchored
          open={open}
          mode="center"
          containerRef={sectionRef}     // center over Projects section
          onClose={closeAll}
          title={active ? active.title : ""}
          backdrop={touchMode}
          capturePointer={true}
          onOverlayEnter={() => setOverOverlay(true)}
          onOverlayLeave={() => setOverOverlay(false)}
        >
          {active && (
            <>
              <p className="text-white/85 mb-3">{active.description}</p>
              <ul className="list-disc list-inside space-y-1 text-white/90">
                {active.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {active.tech.map((t, i) => (
                  <span key={i} className="text-sm px-2 py-1 rounded-full border border-white/10 bg-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </PopoverAnchored>
      </div>
    </section>
  );
}
