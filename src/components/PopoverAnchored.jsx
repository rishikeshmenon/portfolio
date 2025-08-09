import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Popover that can position:
 * - mode="anchor": near a given {x,y}
 * - mode="center": centered over a containerRef (section)
 */
export default function PopoverAnchored({
  open,
  mode = "anchor",                 // "anchor" | "center"
  anchor = null,                   // { x, y } for mode="anchor"
  containerRef = null,             // ref to section node for mode="center"
  onClose,
  title,
  children,
  offset = 14,                     // used in anchor mode
  backdrop = false,
  capturePointer = true,
  onOverlayEnter,
  onOverlayLeave,
}) {
  const panelRef = useRef(null);
  const [placement, setPlacement] = useState("bottom"); // anchor mode only
  const [pos, setPos] = useState(anchor);               // anchor mode only
  const [centerPos, setCenterPos] = useState(null);     // center mode

  // Lock initial anchor when opening (anchor mode)
  useEffect(() => {
    if (open && mode === "anchor" && anchor) setPos(anchor);
  }, [open, anchor, mode]);

  // Compute center when open (center mode)
  useEffect(() => {
    const recalc = () => {
      if (!open || mode !== "center") return;
      const el = containerRef?.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCenterPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };
    recalc();
    if (open && mode === "center") {
      window.addEventListener("resize", recalc);
      window.addEventListener("scroll", recalc, true);
      return () => {
        window.removeEventListener("resize", recalc);
        window.removeEventListener("scroll", recalc, true);
      };
    }
  }, [open, mode, containerRef]);

  // Flip logic for anchor mode
  useEffect(() => {
    if (!(open && mode === "anchor")) return;
    const recalc = () => {
      if (!panelRef.current || !pos) return;
      const h = panelRef.current.offsetHeight;
      const viewportH = window.innerHeight;
      const roomBelow = viewportH - pos.y;
      setPlacement(roomBelow > h + offset + 16 ? "bottom" : "top");
    };
    recalc();
    const id = setTimeout(recalc, 0);
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, true);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc, true);
    };
  }, [open, mode, pos, offset]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined" || !open) return null;

  // If mode requires computed coords but we don't have them yet, don't render
  if (mode === "anchor" && !pos) return null;
  if (mode === "center" && !centerPos) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = vw < 768;
  
  // Mobile-first responsive sizing
  const maxW = isMobile ? vw - 16 : Math.min(560, vw - 32);
  const padding = isMobile ? 8 : 16;

  // Position math with mobile optimization
  let left, top, transform, showArrow = false, arrowStyle = {};
  
  if (mode === "anchor") {
    if (isMobile) {
      // On mobile, always center horizontally and position vertically
      left = vw / 2;
      transform = "translate(-50%, 0)";
      
      // Better vertical positioning for mobile
      const safeTop = Math.max(padding, pos.y + offset);
      const safeBottom = vh - padding;
      
      if (safeTop + 300 > safeBottom) { // Estimate popup height
        // Show above if not enough space below
        top = Math.max(padding, pos.y - offset - 300);
        showArrow = true;
        arrowStyle = { bottom: -6 };
      } else {
        top = safeTop;
        showArrow = true;
        arrowStyle = { top: -6 };
      }
    } else {
      // Desktop positioning (original logic but improved)
      const half = maxW / 2;
      const clampedX = Math.max(padding + half, Math.min(vw - padding - half, pos.x));
      left = clampedX;
      
      if (placement === "bottom") {
        top = pos.y + offset;
        transform = "translate(-50%, 0)";
        showArrow = true;
        arrowStyle = { top: -6 };
      } else {
        top = pos.y - offset;
        transform = "translate(-50%, -100%)";
        showArrow = true;
        arrowStyle = { bottom: -6 };
      }
    }
  } else {
    // mode === "center" - improved for mobile
    if (isMobile) {
      // On mobile, use fixed positioning for better control
      left = vw / 2;
      top = vh / 2;
      transform = "translate(-50%, -50%)";
    } else {
      left = centerPos.x;
      top = centerPos.y;
      transform = "translate(-50%, -50%)";
    }
    showArrow = false; // no arrow for centered popover
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {backdrop && (
            <motion.div
              aria-hidden
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={onClose}
              onTouchStart={onClose}
            />
          )}
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={panelRef}
              className={`card relative ${capturePointer ? "pointer-events-auto" : "pointer-events-none"} ${
                isMobile ? "p-4 mx-2" : "p-5"
              }`}
              initial={{ opacity: 0, y: isMobile ? 10 : 6, scale: isMobile ? 0.95 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? 10 : 6, scale: isMobile ? 0.95 : 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              style={{
                position: "absolute",
                maxWidth: maxW,
                width: isMobile ? "calc(100vw - 32px)" : "auto",
                maxHeight: isMobile ? "calc(100vh - 100px)" : "auto",
                overflowY: isMobile ? "auto" : "visible",
                left,
                top,
                transform,
              }}
              onPointerEnter={onOverlayEnter}
              onPointerLeave={onOverlayLeave}
            >
              {showArrow && (
                <div
                  className="absolute w-3 h-3 rotate-45 border border-white/10 bg-white/5"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    ...arrowStyle,
                  }}
                />
              )}
              {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
