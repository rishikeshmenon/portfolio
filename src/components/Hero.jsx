import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "Automation & systems tinkerer";
  const subtitle = "I love using technology to shave time off repetitive tasks and make processes hum.";

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

  // Typing effect
  useEffect(() => {
    let index = 0;
    let timeoutId;
    
    const typeText = () => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeText, 100);
      } else {
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    };

    const startTyping = setTimeout(typeText, 1000);
    
    return () => {
      clearTimeout(startTyping);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="container py-24 md:py-32 text-center relative"
      style={{ x, opacity, filter: blur, scale, willChange: "transform, opacity, filter" }}
    >
      {/* Floating code elements - hidden on mobile for better readability */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div 
          className="absolute top-20 left-10 text-accent-primary/20 font-mono text-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {"{ code: 'life' }"}
        </motion.div>
        <motion.div 
          className="absolute top-32 right-16 text-accent-secondary/20 font-mono text-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          {"</html>"}
        </motion.div>
        <motion.div 
          className="absolute bottom-32 left-20 text-accent-primary/20 font-mono text-sm"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          {"git push origin main"}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-accent-primary font-mono text-sm mb-4">
          <span className="text-text-secondary">~/portfolio</span>
          <span className="text-accent-primary"> $ </span>
          <span>whoami</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
          <span className="text-text-primary">Hi, I'm </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
            Rishikesh Menon
          </span>
          <span className="text-accent-primary">.</span>
        </h1>
        
        <div className="text-lg md:text-xl text-accent-primary font-mono mb-2 min-h-[2rem] flex items-center justify-center">
          {typedText}
          {showCursor && (
            <span className="inline-block w-0.5 h-6 bg-accent-primary ml-1 animate-blink-caret"></span>
          )}
        </div>
        
        <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      <motion.div 
        className="mt-8 flex items-center justify-center gap-4 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <a href="#projects" className="btn-primary">
          <span>View Projects</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a href="#contact" className="btn btn-ghost">
          <span>Contact Me</span>
        </a>
      </motion.div>

      <motion.div 
        className="mt-8 flex items-center justify-center gap-4 text-text-secondary flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a className="link-underline font-mono text-sm" href="https://linkedin.com/in/rishikesh-menon" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <span className="text-accent-primary">•</span>
        <a className="link-underline font-mono text-sm" href="https://github.com/rishikeshmenon" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span className="text-accent-primary">•</span>
        <a className="link-underline font-mono text-sm" href="mailto:rishikesh.menon@queensu.ca">
          Email
        </a>
      </motion.div>

      {/* Terminal prompt at bottom */}
      <motion.div 
        className="mt-12 text-accent-primary font-mono text-sm opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-text-secondary">~/portfolio</span>
        <span className="text-accent-primary"> $ </span>
        <span className="animate-blink-caret">_</span>
      </motion.div>
    </motion.div>
  );
}
