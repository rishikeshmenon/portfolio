import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function About() {
  const codeSnippets = [
    "while (problems.exist()) { automate(solution); }",
    "const passion = ['automation', 'systems', 'efficiency'];",
    "if (manual_task) { write_script_instead(); }",
    "// Building solutions that work while I sleep"
  ];

  return (
    <div className="container relative">
      {/* Floating code snippets - hidden on mobile for better readability */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            className="absolute text-accent-primary/10 font-mono text-xs md:text-sm"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + (i % 2) * 70}%`,
              right: i % 2 === 0 ? '10%' : 'auto',
            }}
            animate={{ y: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      <Reveal>
        <div className="text-center mb-8">
          <div className="text-accent-primary font-mono text-sm mb-2">
            <span className="text-text-secondary">~/about</span>
            <span className="text-accent-primary"> $ </span>
            <span>cat profile.md</span>
          </div>
          <h2 className="text-3xl font-semibold text-text-primary">About Me</h2>
        </div>
      </Reveal>

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="card-hover p-8 text-center relative"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent-tertiary"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
            </div>
            <div className="text-text-tertiary font-mono text-xs">about_me.md</div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: 0.3 }} transition={{ delay: 0.2 }}>
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center justify-center gap-2">
                <span className="text-accent-primary font-mono">#</span>
                The Philosophy
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed">
                I’m a builder who hates repetition. If something can be faster, smarter, or more reliable, I automate it —
                then refine until it feels effortless.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: 0.3 }} transition={{ delay: 0.4 }}>
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center justify-center gap-2">
                <span className="text-accent-secondary font-mono">#</span>
                What I Build
              </h3>
              <p className="text-text-secondary leading-relaxed">
                I bridge non‑technical teams and engineering, wire up data pipelines and UIs, and ship systems that keep
                running when I’m offline.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.3 }} transition={{ delay: 0.6 }} className="pt-4 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-3">
                {['Automation', 'Systems Design', 'Data Pipelines', 'Security', 'DevOps'].map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 bg-accent-primary/10 text-accent-primary border border-accent-primary/20 rounded-lg font-mono text-sm hover:bg-accent-primary/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
