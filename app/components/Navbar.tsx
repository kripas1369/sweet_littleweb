"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Services", "Portfolio", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkBg, setDarkBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Detect pricing section dark background
      const pricingEl = document.getElementById("pricing");
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect();
        setDarkBg(rect.top <= 80 && rect.bottom >= 80);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = darkBg ? "text-white" : "text-black";
  const logoSrc = darkBg ? "/logo-dark.png" : "/logo-light.png";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkBg
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 py-3"
              : "bg-white/80 backdrop-blur-2xl border-b border-black/8 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <Image
              src={logoSrc}
              alt="Little Sweet Photography"
              width={160}
              height={64}
              className="h-14 w-auto object-contain transition-all duration-500"
              priority
            />
          </a>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-pink-400 ${textColor}`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide bg-black text-white hover:shadow-[0_0_0_3px_rgba(0,0,0,0.12)] transition-shadow duration-300"
            >
              Book Consultation
            </motion.a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 ${textColor}`}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className={`absolute bottom-0 left-0 h-[1.5px] origin-left ${darkBg ? "bg-white/50" : "bg-black/40"}`}
          style={{ scaleX, width: "100%" }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-semibold tracking-tighter text-black"
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 rounded-full bg-black text-white text-lg font-semibold"
            >
              Book Consultation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
