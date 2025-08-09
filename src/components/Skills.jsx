import { motion } from "framer-motion";
import Reveal from "./Reveal";

const groups = [
  {
    title: "Languages",
    items: ["Python", "Java", "JavaScript/TypeScript", "C", "C++", "SQL", "R"],
  },
  {
    title: "Data & ML",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "OpenCV", "TensorFlow", "PyTorch"],
  },
  {
    title: "Infra & DevOps",
    items: ["Proxmox", "Docker", "Traefik", "n8n", "VPN", "Git"],
  },
  {
    title: "Analytics & BI",
    items: ["Power BI", "Tableau", "MATLAB"],
  },
  {
    title: "Frontend & Backend",
    items: ["React", "Node.js"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <div className="text-center mb-8">
            <div className="text-accent-primary font-mono text-sm mb-2">
              <span className="text-text-secondary">~/skills</span>
              <span className="text-accent-primary"> $ </span>
              <span>cat stack.json</span>
            </div>
            <h2 className="text-3xl font-semibold text-text-primary">Skills</h2>
            <p className="text-text-secondary mt-2 max-w-2xl mx-auto">
              Tools I use to automate workflows, build data pipelines, and ship systems.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((g, idx) => (
            <motion.div
              key={g.title}
              className="card-hover p-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-accent-tertiary"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
                </div>
                <div className="text-text-tertiary font-mono text-xs">{g.title.toLowerCase()}.cfg</div>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-3">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-text-secondary hover:bg-white/10 hover:text-text-primary transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
