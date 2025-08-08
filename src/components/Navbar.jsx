import { useState } from "react";
import { Link } from "react-scroll";

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
    <nav className="fixed top-0 w-full z-20">
      <div className="container">
        <div className="mt-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-glow">
          <div className="px-6 h-14 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-wide">Rishikesh Menon</div>
            <div className="hidden md:flex items-center gap-6">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer link-underline text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span>{open ? "✕" : "☰"}</span>
            </button>
          </div>
          {open && (
            <div className="md:hidden px-6 pb-4">
              <div className="flex flex-col gap-2">
                {links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer px-4 py-2 rounded-lg hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
