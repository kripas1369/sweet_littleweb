"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const navLinks = [
  "About",
  "Portfolio",
  "Services",
  "Pricing",
  "Testimonials",
  "FAQs",
  "Contact",
  "Book Now",
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div id="contact" className="bg-white">
      {/* ── CTA pill ── */}
      <div className="flex justify-center px-6 pb-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-black rounded-full px-6 py-4 sm:px-8"
        >
          <p className="text-white/70 text-sm font-medium tracking-wide text-center sm:text-left">
            Ready to capture your most precious moments?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex-shrink-0 flex items-center gap-2 bg-white text-black text-xs font-bold tracking-[0.12em] uppercase px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Book a Session
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>

      {/* ── Floating footer card ── */}
      <div className="px-4 pb-6">
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="bg-[#111] rounded-3xl overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-8 md:px-12 pt-14 pb-10">
            {/* Top row */}
            <div className="flex flex-col lg:flex-row justify-between gap-14 pb-14 border-b border-white/8">
              {/* Left */}
              <div className="max-w-xs">
                <Image
                  src="/logo-dark.png"
                  alt="Little Sweet Photography"
                  width={140}
                  height={56}
                  className="h-11 w-auto object-contain mb-8"
                />
                <h3
                  className="font-bold tracking-tighter text-white mb-3 leading-tight"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}
                >
                  Subscribe to Little Sweet
                </h3>
                <p className="text-[#86868B] text-sm leading-relaxed mb-7">
                  Session tips, new arrivals, and exclusive promotions — straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition-colors duration-200"
                  >
                    Sign Up
                  </motion.button>
                </form>
              </div>

              {/* Right — links */}
              <div className="flex gap-16 lg:gap-24">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#555] mb-6">
                    Navigate
                  </p>
                  <ul className="space-y-3.5">
                    {navLinks.slice(0, 4).map((l) => (
                      <li key={l}>
                        <a
                          href={`#${l.toLowerCase().replace(" ", "-")}`}
                          className="text-[#A1A1A6] text-sm hover:text-white transition-colors duration-200"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#555] mb-6">
                    Services
                  </p>
                  <ul className="space-y-3.5">
                    {navLinks.slice(4).map((l) => (
                      <li key={l}>
                        <a
                          href={`#${l.toLowerCase().replace(" ", "-")}`}
                          className="text-[#A1A1A6] text-sm hover:text-white transition-colors duration-200"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8">
              <p className="text-[#555] text-xs tracking-wide">
                © {new Date().getFullYear()} Little Sweet Photography. All rights reserved.
              </p>

              <div className="flex items-center gap-5">
                <motion.a
                  href="https://instagram.com"
                  whileHover={{ scale: 1.12, color: "#fff" }}
                  className="text-[#555] hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://x.com"
                  whileHover={{ scale: 1.12, color: "#fff" }}
                  className="text-[#555] hover:text-white transition-colors duration-200"
                  aria-label="X (Twitter)"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
