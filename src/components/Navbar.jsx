// src/components/Navbar.jsx
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "hero", label: "Home" },
    { to: "about", label: "About" },
    { to: "experience", label: "Experience" },
    { to: "projects", label: "Projects" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-md border-b border-white/10">
      <div className="container h-16 flex items-center justify-between">
        <a href="#hero" className="font-mono text-lg font-bold text-accent-primary hover:text-accent-secondary transition-colors">
          <span className="text-text-secondary">{"<"}</span>
          RM
          <span className="text-text-secondary">{" />"}</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={300}
              offset={-96}  // match header height
              spy={true}
              className="cursor-pointer px-4 py-2 rounded-lg hover:bg-accent-primary/10 hover:text-accent-primary transition-all duration-200 font-mono text-sm text-text-secondary"
              activeClass="bg-accent-primary/20 text-accent-primary"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>

        <button
          className="md:hidden px-3 py-2 rounded-lg hover:bg-accent-primary/10 hover:text-accent-primary transition-colors font-mono text-sm text-text-secondary"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="text-accent-primary">[</span>
          {open ? 'close' : 'menu'}
          <span className="text-accent-primary">]</span>
        </button>

        {open && (
          <div id="mobile-menu" className="absolute left-0 right-0 top-16 md:hidden z-30">
            <div className="container">
              <div className="card p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-accent-tertiary"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
                  </div>
                  <div className="text-text-tertiary font-mono text-xs">navigation.menu</div>
                </div>
                {links.map(link => (
                  <ScrollLink
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={300}
                    offset={-96}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer px-3 py-2 rounded-lg hover:bg-accent-primary/10 hover:text-accent-primary transition-colors font-mono text-sm text-text-secondary"
                    activeClass="bg-accent-primary/20 text-accent-primary"
                  >
                    <span className="text-accent-primary mr-2">▸</span>
                    {link.label}
                  </ScrollLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
