"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Bride",
    text: "Little Sweet captured every emotion of our wedding day. The photos are breathtaking — we relive the day every time we look at them.",
    initials: "PS",
  },
  {
    name: "Rohan Thapa",
    role: "Father",
    text: "The newborn session was handled with such care and patience. The final images are heirlooms we will treasure for generations.",
    initials: "RT",
  },
  {
    name: "Anjali Karmacharya",
    role: "Mother",
    text: "From booking to delivery, everything was seamless. The maternity shoot exceeded every expectation — professional, elegant, and deeply personal.",
    initials: "AK",
  },
  {
    name: "Bikash Adhikari",
    role: "CEO, TechSummit",
    text: "Our corporate event was documented impeccably. The photographers were unobtrusive yet captured every key moment with precision.",
    initials: "BA",
  },
  {
    name: "Sita Maharjan",
    role: "Pasni Ceremony",
    text: "Every candid, every portrait — perfect. Little Sweet truly understands the weight of our cultural moments.",
    initials: "SM",
  },
  {
    name: "Dev Rana",
    role: "Birthday Client",
    text: "Booked for my daughter's first birthday and was blown away. The team arrived prepared, styled the scene beautifully, and delivered 20 perfect edits.",
    initials: "DR",
  },
  {
    name: "Kritika Pokharel",
    role: "Maternity",
    text: "I was nervous about a maternity shoot, but the photographer made me feel completely at ease. The results are stunning.",
    initials: "KP",
  },
  {
    name: "Amar Shrestha",
    role: "Wedding Client",
    text: "Chose the Premium package and it was worth every rupee. The photobook quality is exceptional — our family is obsessed.",
    initials: "AS",
  },
];

const doubled = [...reviews, ...reviews];

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[380px] mx-3">
      <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
        <p className="text-[#A1A1A6] leading-relaxed text-sm flex-1">&ldquo;{r.text}&rdquo;</p>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold tracking-wider flex-shrink-0">
            {r.initials}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{r.name}</p>
            <p className="text-[#86868B] text-xs mt-0.5">{r.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.span
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868B] inline-block"
        >
          Testimonials
        </motion.span>
        <div className="overflow-hidden mt-4">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          >
            <h2
              className="font-black tracking-tighter text-white max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              Moments preserved.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            <h2
              className="font-black tracking-tighter text-[#444] max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              Stories remembered.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {doubled.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
