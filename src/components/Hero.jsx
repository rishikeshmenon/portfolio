import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);

  // 0 when the top of hero hits top of viewport; 1 when bottom hits top (i.e., you've scrolled past it)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Sweep left + fade as we leave
  const x = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.55, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "6px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  return (
      <motion.div
        className="container py-24 md:py-32 text-center"
        style={{ x, opacity, filter: blur, scale, willChange: "transform, opacity, filter" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Hi, I'm Rishikesh Menon.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Automation & systems tinkerer. I love using technology to shave time off
          repetitive tasks and make processes hum.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#projects" className="btn">View Projects</a>
          <a href="#contact" className="btn btn-ghost">Contact Me</a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-white/70">
          <a className="link-underline" href="https://linkedin.com/in/rishikesh-menon" target="_blank" rel="noreferrer">LinkedIn</a>
          <span>•</span>
          <a className="link-underline" href="https://github.com/rishikeshmenon" target="_blank" rel="noreferrer">GitHub</a>
          <span>•</span>
          <a className="link-underline" href="mailto:rishikesh.menon@queensu.ca">Email</a>
        </div>
      </motion.div>
  );
}
