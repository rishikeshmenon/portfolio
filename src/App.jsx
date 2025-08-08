import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * We keep native scrolling.
 * - Each section takes full viewport height.
 * - As you scroll, we compute each section's proximity to the viewport center
 *   and set its opacity (1 at center → 0 near edges).
 * - After a short pause (debounced), we auto-snap to the nearest section.
 * - Footer stays fixed at the bottom.
 */
export default function App() {
  const sections = [
    { id: "hero", component: <Hero /> },
    { id: "about", component: <About /> },
    { id: "experience", component: <Experience /> },
    { id: "projects", component: <Projects /> },
    { id: "contact", component: <Contact /> },
  ];

  const sectionRefs = useRef([]);
  const [opacities, setOpacities] = useState(() => sections.map(() => 1));

  // rAF-managed scroll handler (smooth + efficient)
  useEffect(() => {
    let ticking = false;
    let snapTimer = null;

    const measure = () => {
      const vh = window.innerHeight;
      const mid = vh / 2;
      const fadeRadius = vh * 0.6; // how far from center before fully faded
      const nextOpacities = sections.map((_, i) => {
        const el = sectionRefs.current[i];
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - mid);
        const t = Math.max(0, Math.min(1, 1 - dist / fadeRadius)); // 1 at center → 0 at radius
        // ease-in-out for smoother fade curve
        return t * t * (3 - 2 * t);
      });
      setOpacities(nextOpacities);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
      // Debounced snap-to-nearest after user pauses
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        snapToNearest();
      }, 140); // adjust feel (100–220ms)
    };

    const snapToNearest = () => {
      const vh = window.innerHeight;
      const mid = vh / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      sections.forEach((_, i) => {
        const el = sectionRefs.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      const target = sectionRefs.current[bestIdx];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // initial measure (ensure correct opacities on load)
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (snapTimer) clearTimeout(snapTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main>
        {sections.map((s, idx) => (
          <section
            key={s.id}
            id={s.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className="section"
          >
            {/* We fade the whole section's content. Keep it centered. */}
            <motion.div
              className="flex items-center justify-center w-full h-full"
              style={{ opacity: opacities[idx] }}
            >
              {s.component}
            </motion.div>
          </section>
        ))}
      </main>
      <Footer /> {/* fixed, always visible */}
    </div>
  );
}
