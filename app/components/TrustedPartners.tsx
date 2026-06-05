"use client";

import { motion } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

/* Photography-industry partner wordmarks */
const partners = [
  { name: "Canon",       weight: 700, spacing: "0.08em",  size: "1.15rem", italic: false },
  { name: "Nikon",       weight: 700, spacing: "0.1em",   size: "1.1rem",  italic: false },
  { name: "Sony",        weight: 800, spacing: "0.22em",  size: "1rem",    italic: false },
  { name: "Adobe",       weight: 600, spacing: "0.05em",  size: "1.1rem",  italic: false },
  { name: "Fujifilm",    weight: 600, spacing: "-0.01em", size: "1.05rem", italic: false },
  { name: "Capture One", weight: 500, spacing: "0.1em",   size: "0.8rem",  italic: false },
  { name: "Manfrotto",   weight: 600, spacing: "0.06em",  size: "1rem",    italic: false },
  { name: "DJI",         weight: 800, spacing: "0.25em",  size: "1.05rem", italic: false },
  { name: "Profoto",     weight: 600, spacing: "0.08em",  size: "1rem",    italic: false },
  { name: "Sigma",       weight: 700, spacing: "0.15em",  size: "1rem",    italic: false },
  { name: "Lightroom",   weight: 500, spacing: "0.04em",  size: "1rem",    italic: false },
  { name: "Godox",       weight: 700, spacing: "0.1em",   size: "1rem",    italic: false },
];

const doubled = [...partners, ...partners];

export default function TrustedPartners() {
  return (
    <section className="bg-white py-14 overflow-hidden border-t border-black/5">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-center mb-10"
      >
        <p
          className="text-[10px] font-semibold tracking-[0.32em] uppercase"
          style={{
            background: "linear-gradient(135deg, #F472B6 0%, #D4A017 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Trusted Partners
        </p>
      </motion.div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fff 0%, transparent 100%)" }}
        />

        <div className="flex animate-marquee">
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center px-10 group"
            >
              {/* Dot separator */}
              <span
                className="w-1 h-1 rounded-full bg-black/15 mr-10 flex-shrink-0"
              />
              <span
                className="text-black uppercase select-none transition-opacity duration-500"
                style={{
                  fontWeight: p.weight,
                  letterSpacing: p.spacing,
                  fontSize: p.size,
                  opacity: 0.18,
                  fontStyle: p.italic ? "italic" : "normal",
                }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
