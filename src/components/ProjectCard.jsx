import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.a
      href={project.link}
      target={project.link?.startsWith('#') ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="block card p-6 hover:-translate-y-1 hover:shadow-lg transition-transform duration-200"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-white/80 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="text-sm px-2 py-1 rounded-full border border-white/10 bg-white/5"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
