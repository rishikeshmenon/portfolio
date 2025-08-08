import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  amount = 0.25,      // how much of the element must be visible [0..1]
  className = "",
  children
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount, margin: "0px 0px -5% 0px" }); // slight bottom margin for smoother exit

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}
