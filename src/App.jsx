// src/App.jsx
import { useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const sections = useMemo(() => ([
    { id: "hero",       el: <Hero /> },
    { id: "about",      el: <About /> },
    { id: "skills",     el: <Skills /> },
    { id: "experience", el: <Experience /> },
    { id: "projects",   el: <Projects /> },
    { id: "contact",    el: <Contact /> },
  ]), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {sections.map(s => (
          <section
            key={s.id}
            id={s.id}
            className="section"
          >
            {/* Keep animations local to components via whileInView, no global snapping */}
            {s.el}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
