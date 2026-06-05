"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorMode = "default" | "hover" | "image" | "drag" | "click";

export default function CustomCursor() {
  const [mode, setMode]     = useState<CursorMode>("default");
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [label, setLabel]   = useState("");

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  /* Dot — near-instant */
  const dotX = useSpring(rawX, { stiffness: 2500, damping: 90, mass: 0.05 });
  const dotY = useSpring(rawY, { stiffness: 2500, damping: 90, mass: 0.05 });

  /* Ring — pleasant lag */
  const ringX = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.8 });
  const ringY = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.8 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    /* Hide native cursor globally */
    const style = document.createElement("style");
    style.innerHTML = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setHidden(false);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const link    = t.closest("a, button");
      const imgEl   = t.closest("[data-cursor-image]");
      const dragEl  = t.closest("[data-cursor-drag]");

      if (imgEl) {
        setMode("image");
        setLabel("VIEW");
      } else if (dragEl) {
        setMode("drag");
        setLabel("DRAG");
      } else if (link) {
        setMode("hover");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    const onDown  = () => setMode(m => m === "image" ? "click" : "click");
    const onUp    = () => setMode("default");
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY]);

  if (isMobile) return null;

  /* Size / style per mode */
  const ringSize = mode === "image" || mode === "hover" ? 72
                 : mode === "drag"  ? 64
                 : mode === "click" ? 18
                 : 38;

  const showAperture = mode === "image" || mode === "click";

  return (
    <>
      {/* ── OUTER RING ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          /* Visible on BOTH dark & light: dark border + white shadow */
          border: "1.5px solid rgba(0,0,0,0.75)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
        animate={{
          width:  ringSize,
          height: ringSize,
          opacity: hidden ? 0 : 1,
          backgroundColor: mode === "image" ? "rgba(0,0,0,0.55)"
                          : mode === "hover" ? "rgba(0,0,0,0.07)"
                          : "transparent",
          rotate: mode === "click" ? 45 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Label inside ring (VIEW / DRAG) */}
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="text-[9px] font-black tracking-[0.18em] uppercase text-white select-none"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Aperture blades (visible on image hover) */}
        {showAperture && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 0.5, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[0, 60, 120].map((deg) => (
              <div
                key={deg}
                className="absolute w-full h-[1px] bg-white/60"
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* ── INNER DOT ── (hidden when ring shows label) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "#000",
          /* White outline makes dot visible on dark backgrounds */
          boxShadow: "0 0 0 1px rgba(255,255,255,0.7)",
        }}
        animate={{
          width:  mode === "image" || mode === "hover" || label ? 0 : mode === "click" ? 12 : 5,
          height: mode === "image" || mode === "hover" || label ? 0 : mode === "click" ? 12 : 5,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* ── CROSSHAIR LINES (default state only) ── */}
      <AnimatePresence>
        {mode === "default" && !hidden && (
          <>
            {/* Horizontal tick */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9998] bg-black/40"
              style={{
                x: dotX,
                y: dotY,
                translateX: "-50%",
                translateY: "-50%",
                height: "1px",
                boxShadow: "0 0 0 0.5px rgba(255,255,255,0.5)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 18, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            {/* Vertical tick */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9998] bg-black/40"
              style={{
                x: dotX,
                y: dotY,
                translateX: "-50%",
                translateY: "-50%",
                width: "1px",
                boxShadow: "0 0 0 0.5px rgba(255,255,255,0.5)",
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 18, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
