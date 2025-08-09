export default function Footer() {
  return (
    <footer className="pt-16 pb-8">
      <div className="container">
        <div className="card p-6 relative">
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-accent-tertiary"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
            </div>
            <div className="text-text-tertiary font-mono text-xs">footer.tsx</div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-mono text-sm text-text-secondary">
                <span className="text-accent-primary">const</span>{" "}
                <span className="text-accent-secondary">developer</span>{" "}
                <span className="text-text-tertiary">=</span>{" "}
                <span className="text-accent-primary">"Rishikesh Menon"</span>
              </div>
              <p className="text-text-tertiary text-sm mt-1">
                © {new Date().getFullYear()} All rights reserved. Built with ❤️ and lots of ☕
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="#hero" 
                className="link-underline font-mono flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Back to top
              </a>
              <span className="text-accent-primary">•</span>
              <a 
                href="#contact" 
                className="link-underline font-mono"
              >
                Let's connect
              </a>
            </div>
          </div>

          {/* Bottom terminal prompt */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <div className="font-mono text-xs text-text-tertiary">
              <span className="text-text-secondary">~/portfolio</span>
              <span className="text-accent-primary"> $ </span>
              <span>echo "Thanks for visiting!" && exit</span>
              <span className="animate-blink-caret ml-1">_</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
