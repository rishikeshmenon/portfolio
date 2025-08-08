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
    <nav className="sticky top-0 z-20 bg-[#0b0b0b]/70 backdrop-blur border-b border-white/10">
      <div className="container h-16 flex items-center justify-between">
        <a href="#hero" className="font-semibold">RM</a>

        <div className="hidden md:flex items-center gap-2">
          {links.map(link => (
            <ScrollLink
              key={link.to}
              to={link.to}
              smooth={true}
              duration={300}
              offset={-96}  // match header height
              spy={true}
              className="cursor-pointer px-3 py-2 rounded-lg hover:bg-white/10"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>

        <button
          className="md:hidden px-3 py-2 rounded-lg hover:bg-white/10"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>

        {open && (
          <div id="mobile-menu" className="absolute left-0 right-0 top-16 md:hidden">
            <div className="container card p-3 flex flex-col gap-2">
              {links.map(link => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={300}
                  offset={-96}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  {link.label}
                </ScrollLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
