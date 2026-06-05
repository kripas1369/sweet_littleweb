"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

/* Pink → Yellow accent gradient */
const GRAD = "linear-gradient(135deg, #F472B6 0%, #FBBF24 100%)";
const GRAD_SOFT = "linear-gradient(150deg, #FDF2F8 0%, #FFFDE7 100%)";

const features = [
  {
    heading: "Transparent Pricing.",
    body: "No hidden fees, no surprise invoices. Every package is laid out clearly so you can choose what fits your vision and budget. What you see is exactly what you get.",
  },
  {
    heading: "Hassle-Free Booking.",
    body: "Our streamlined booking process takes less than two minutes. Select your package, pick a date, and confirm — no back-and-forth, no friction. A dedicated coordinator handles the rest.",
  },
  {
    heading: "Personalized Matches.",
    body: "Every photographer in our network has been rigorously vetted for style, technical mastery, and professional conduct. We match you with the one who sees the world the way you do.",
  },
  {
    heading: "Secure & Reliable.",
    body: "Your moments are sacred. We back every booking with a satisfaction guarantee, secure cloud delivery, and encrypted storage of your final gallery.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const leftOpacity = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [0, 1, 1, 0]);
  const leftY       = useTransform(scrollYProgress, [0, 0.1], [24, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ background: GRAD_SOFT }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row">

        {/* ── LEFT sticky panel ── */}
        <div className="hidden lg:block w-5/12 flex-shrink-0 relative">
          <motion.div
            style={{ opacity: leftOpacity, y: leftY }}
            className="sticky top-0 h-screen flex flex-col justify-center pr-16"
          >
            {/* Decorative gradient blob */}
            <div
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(244,114,182,0.15) 0%, rgba(251,191,36,0.12) 100%)",
                filter: "blur(60px)",
              }}
            />

            {/* Gradient accent bar */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full"
              style={{ height: "28%", background: GRAD }}
            />

            {/* Label */}
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-8 flex items-center gap-2"
              style={{ color: "#86868B" }}
            >
              <span
                className="w-4 h-px inline-block"
                style={{ background: GRAD }}
              />
              Why Little Sweet
            </span>

            {/* Heading */}
            <h2
              className="font-black tracking-tighter leading-[1.0] relative z-10"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)", letterSpacing: "-0.03em" }}
            >
              <span className="text-black">Transparent Pricing.</span>
              <br />
              <span
                className="font-light italic"
                style={{
                  background: GRAD,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hassle-Free Booking.
              </span>
              <br />
              <span className="text-black">Personalized Matches.</span>
            </h2>

            <div
              className="mt-8 h-px w-12 rounded-full"
              style={{ background: GRAD, opacity: 0.4 }}
            />
          </motion.div>
        </div>

        {/* Vertical divider */}
        <div
          className="hidden lg:block w-px flex-shrink-0 my-32"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(244,114,182,0.2), rgba(251,191,36,0.2), transparent)" }}
        />

        {/* ── RIGHT normal-flow list ── */}
        <div className="flex-1 py-32 lg:pl-20">

          {/* Mobile heading */}
          <div className="lg:hidden mb-16">
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 flex items-center gap-2"
              style={{ color: "#86868B" }}
            >
              <span className="w-4 h-px inline-block" style={{ background: GRAD }} />
              Why Little Sweet
            </span>
            <h2
              className="font-black tracking-tighter text-black"
              style={{ fontSize: "clamp(2rem, 6vw, 3rem)", letterSpacing: "-0.03em" }}
            >
              Transparent Pricing.{" "}
              <span
                className="font-light italic"
                style={{
                  background: GRAD,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hassle-Free Booking.
              </span>{" "}
              Personalized Matches.
            </h2>
          </div>

          {features.map((f, i) => (
            <motion.div
              key={f.heading}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: EASE }}
              className={`max-w-xl ${i < features.length - 1 ? "mb-20 pb-20 border-b" : ""}`}
              style={{ borderColor: "rgba(244,114,182,0.15)" }}
            >
              {/* Number + bar */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-[2px] h-7 rounded-full flex-shrink-0"
                  style={{ background: GRAD }}
                />
                <span
                  className="text-xs font-black tracking-[0.25em]"
                  style={{
                    background: GRAD,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Heading */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="font-black tracking-tighter text-black mb-4 leading-[1.05]"
                style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                {f.heading}
              </motion.h3>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                className="text-[#86868B] leading-relaxed"
                style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
              >
                {f.body}
              </motion.p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
