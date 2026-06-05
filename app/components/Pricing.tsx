"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Rs 17,000",
    original: "Rs 25,000",
    tag: null,
    features: [
      "15 edited images",
      "1 Gown (mother only)",
      "Session: couple & siblings",
      "Photos in Google Drive",
    ],
    card: "bg-[#111111]",
    border: "1px solid rgba(255,255,255,0.06)",
    cta: "Get Started",
  },
  {
    name: "Standard",
    price: "Rs 25,000",
    original: "Rs 35,000",
    tag: "Most Popular",
    features: [
      "20 edited images",
      "2 Gowns (mother only)",
      "Session: couple, siblings & family",
      "Photos in Google Drive",
      "8×12 Photo Frame (1 pc)",
    ],
    card: "bg-[#111111]",
    border: "1px solid rgba(245,166,35,0.35)",
    cta: "Choose Standard",
  },
  {
    name: "Premium",
    price: "Rs 30,000",
    original: "Rs 40,000",
    tag: null,
    features: [
      "25 edited images",
      "2 Gowns (mother only)",
      "Session: couple, siblings & family",
      "Photos in Google Drive",
      "12×18 Photobook",
      "Portable bag & calendar",
    ],
    card: "bg-[#0a0a0a]",
    border: "1px solid rgba(255,255,255,0.06)",
    cta: "Go Premium",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background transition handled via CSS class toggle
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom top",
        onEnter: () => {
          document.body.style.backgroundColor = "#000000";
        },
        onLeaveBack: () => {
          document.body.style.backgroundColor = "#ffffff";
        },
        onLeave: () => {
          document.body.style.backgroundColor = "#ffffff";
        },
        onEnterBack: () => {
          document.body.style.backgroundColor = "#000000";
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center overflow-hidden">
          {/* Label slides from right with gold accent dots */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-2 justify-center"
          >
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868B]">Packages</span>
          </motion.div>
          {/* Headline word-by-word from below */}
          <div className="overflow-hidden mt-4">
            <motion.h2
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="font-black tracking-tighter text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              Simple, transparent pricing.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="text-[#86868B] mt-4 max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)" }}
          >
            Choose the package that fits your vision. Every session is crafted
            with intention and care.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            // Starter from left, Standard from bottom, Premium from right
            const xMap = [-100, 0, 100];
            const yMap = [0, 60, 0];
            return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, x: xMap[i], y: yMap[i], scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
              whileHover={{
                y: -8,
                boxShadow: plan.tag
                  ? "0 0 0 1px rgba(255,255,255,0.3), 0 32px 80px rgba(255,255,255,0.06)"
                  : "0 32px 80px rgba(255,255,255,0.03)",
                transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
              }}
              className={`relative rounded-3xl p-8 flex flex-col ${plan.card} transition-all duration-500`}
              style={{ border: plan.border }}
              data-cursor-hover
            >
              {plan.tag && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white text-black">
                    {plan.tag}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <p className="text-[#86868B] text-sm font-semibold tracking-[0.15em] uppercase mb-3">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className="font-black text-white tracking-tighter"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[#444] line-through text-base font-medium">
                    {plan.original}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0">
                      {/* Gold checkmark for Standard, white for others */}
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path
                          d="M2 6.5L5.2 10L11 3"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[#A1A1A6] text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="block text-center py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
                style={
                  plan.tag
                    ? { background: "#fff", color: "#000" }
                    : { border: "1px solid rgba(255,255,255,0.18)", color: "#fff" }
                }
              >
                {plan.cta}
              </motion.a>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
