import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function About() {
  return (
    
      <div className="container">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-6 text-left md:text-center">About Me</h2>
        </Reveal>

        <motion.div
          className="max-w-3xl mx-auto text-left md:text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <p className="text-white/85 text-lg">
            I’m a builder who hates repetitive work. If a task can be done faster, smarter, or more reliably,
            I’ll automate it — then iterate until it’s delightful.
          </p>
          <p className="text-white/70 mt-4">
            I ship projects that crawl the web, clean data, wire up APIs, and stitch services together so they run while I sleep.
            I’m comfortable translating needs between technical and non-technical teams and turning them into shipped features.
          </p>
        </motion.div>
      </div>
  );
}
