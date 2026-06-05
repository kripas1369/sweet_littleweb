"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";

const ParticleSphere = dynamic(() => import("./ParticleSphere"), { ssr: false });

const EASE = [0.32, 0.72, 0, 1] as const;

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  };

  // Headline lines clip from below
  const lineVariants = {
    hidden: { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1.0, ease: EASE },
    },
  };

  // Subtitle slides from right
  const subtitleVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } },
  };

  // Buttons fade up
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-white overflow-hidden"
    >
      {/* Three.js canvas */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
          <ParticleSphere mouse={mouse} />
        </div>
      )}

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(255,255,255,0.6)_100%)] pointer-events-none z-10" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Each headline line clips from below */}
        <div className="mb-8 overflow-hidden">
          <motion.h1
            className="font-black tracking-tighter text-black leading-[0.92]"
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", letterSpacing: "-0.03em" }}
          >
            {["Capture Life's Most", "Unforgettable", "Moments."].map((line, i) => (
              <motion.span
                key={line}
                variants={lineVariants}
                className={`block ${i === 1 ? "italic font-light" : "font-black"}`}
                style={i === 2 ? {
                  background: "linear-gradient(135deg, #F472B6 0%, #D4A017 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : {}}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Subtitle from right */}
        <motion.p
          variants={subtitleVariants}
          className="text-[#86868B] max-w-xl leading-relaxed mb-12"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
        >
          Seamless booking. Professional photographers.
          <br />
          Preserved forever.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="px-8 py-4 rounded-full bg-black text-white text-sm font-semibold tracking-wide hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-shadow duration-300"
          >
            Book a Session
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="px-8 py-4 rounded-full border border-black/20 text-black text-sm font-semibold tracking-wide hover:border-black/50 transition-colors duration-300"
          >
            Explore Services
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — arrow only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} strokeWidth={1.5} className="text-black/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
