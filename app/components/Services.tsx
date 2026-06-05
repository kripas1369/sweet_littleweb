"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE = [0.32, 0.72, 0, 1] as const;

/* ─── Fan carousel data ─── */
const featured = [
  {
    title: "Wedding",
    desc: "Celebrate your special day with timeless imagery that tells your love story.",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=90&auto=format&fit=crop",
  },
  {
    title: "Party & Celebration",
    desc: "Turn up the fun with our vibrant party photography packages.",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=90&auto=format&fit=crop",
  },
  {
    title: "Maternity",
    desc: "Glowing, timeless portraits before your beautiful new chapter begins.",
    img: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=900&q=90&auto=format&fit=crop",
  },
  {
    title: "Vacation Photography",
    desc: "Capture your travel memories with professional artistry on location.",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=90&auto=format&fit=crop",
  },
  {
    title: "Newborn Package",
    desc: "Delicate first portraits of your precious little one, beautifully preserved.",
    img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=900&q=90&auto=format&fit=crop",
  },
];

/* ─── Full service grid data ─── */
const services = [
  { title: "Newborn Package",    desc: "Delicate first portraits, beautifully preserved.",        img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80&auto=format&fit=crop" },
  { title: "Maternity Package",  desc: "Glowing, timeless moments before your new chapter.",      img: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&q=80&auto=format&fit=crop" },
  { title: "Toddler Package",    desc: "Candid joy from your little one's best years.",           img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80&auto=format&fit=crop" },
  { title: "Family Portrait",    desc: "Everyone together, forever in frame.",                    img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80&auto=format&fit=crop" },
  { title: "Baby Shower",        desc: "Celebrating the beautiful journey ahead.",                img: "https://images.unsplash.com/photo-1543342384-1f1350e27861?w=600&q=80&auto=format&fit=crop" },
  { title: "Bratabandha",        desc: "Sacred traditions documented with reverence.",            img: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=600&q=80&auto=format&fit=crop" },
  { title: "Birthday",           desc: "Every smile, every candle, every memory.",               img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80&auto=format&fit=crop" },
  { title: "Pasni",              desc: "Your child's first rice ceremony, preserved with love.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop" },
  { title: "Party",              desc: "Vibrant moments from your celebration.",                  img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&auto=format&fit=crop" },
  { title: "Wedding",            desc: "Your love story, told through our lens.",                img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80&auto=format&fit=crop" },
  { title: "Vacation",           desc: "Adventure and discovery, beautifully captured.",         img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80&auto=format&fit=crop" },
  { title: "Corporate Events",   desc: "Professional coverage for company milestones.",          img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop" },
  { title: "Product Photoshoot", desc: "Showcase your products in their best light.",            img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop" },
  { title: "Boutique",           desc: "Elevate your brand with stunning visuals.",              img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80&auto=format&fit=crop" },
  { title: "Profile & Headshot", desc: "First impressions that last a lifetime.",               img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&auto=format&fit=crop" },
  { title: "Food Photography",   desc: "Making every dish irresistible on camera.",             img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80&auto=format&fit=crop" },
];

/* ════════════════════════════════════════════
   PART 1 — Fan Carousel
═══════════════════════════════════════════════ */
function FanCarousel() {
  const [center, setCenter] = useState(2);
  const total = featured.length;

  useEffect(() => {
    const id = setInterval(() => setCenter((c) => (c + 1) % total), 4000);
    return () => clearInterval(id);
  }, [total]);

  const getPos = (i: number) => {
    let d = i - center;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <section className="py-24 overflow-hidden bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-px bg-black/20" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868B]">
                Our Services
              </span>
              <span className="w-5 h-px bg-black/20" />
            </div>
            <h2
              className="font-black tracking-tighter text-black"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Featured{" "}
              <span className="italic font-light text-black">Ceremonies</span>
            </h2>
            <p className="text-[#86868B] mt-4 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}>
              Capturing the Magic of Your Big Day — Every Smile, Tear, and Joyful Moment Preserved Forever.
            </p>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center" style={{ height: 480 }}>
          {featured.map((item, i) => {
            const pos = getPos(i);
            const isCenter = pos === 0;
            const absPos = Math.abs(pos);
            const xPct = pos * 52;
            const rotate = pos * -7;
            const scale = 1 - absPos * 0.09;
            const zIndex = 10 - absPos;
            const opacity = 1 - absPos * 0.18;

            return (
              <motion.div
                key={item.title}
                onClick={() => setCenter(i)}
                /* Fan position — smooth ease */
                animate={{ x: `${xPct}%`, rotate, scale, opacity, zIndex }}
                /* Jiggle entrance — spring on y only, fired once when scrolled into view */
                initial={{ y: 80 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  x:       { duration: 0.65, ease: EASE },
                  rotate:  { duration: 0.65, ease: EASE },
                  scale:   { duration: 0.65, ease: EASE },
                  opacity: { duration: 0.65, ease: EASE },
                  y: {
                    type: "spring",
                    stiffness: 280,
                    damping: 11,
                    mass: 0.9,
                    delay: absPos * 0.11,
                  },
                }}
                className="absolute cursor-pointer"
                style={{
                  width: isCenter ? 300 : 250,
                  height: isCenter ? 420 : 370,
                  borderRadius: 24,
                  overflow: "hidden",
                  transformOrigin: "bottom center",
                  boxShadow: isCenter
                    ? "0 32px 80px rgba(0,0,0,0.35)"
                    : "0 16px 40px rgba(0,0,0,0.2)",
                }}
                data-cursor-hover
              >
                <Image src={item.img} alt={item.title} fill className="object-cover" unoptimized />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }}
                />
                <AnimatePresence>
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute bottom-0 left-0 right-0 p-6"
                    >
                      <p className="text-white font-bold text-lg tracking-tight leading-snug mb-1">
                        {item.title}
                      </p>
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isCenter && (
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white/80 font-semibold text-sm tracking-tight">{item.title}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-12">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenter(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === center ? 28 : 6,
                height: 6,
                background: i === center ? "#000" : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   PART 2 — Clean service card grid
═══════════════════════════════════════════════ */
function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const col = i % 4;
  const xFrom = col < 2 ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: xFrom, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: (i % 4) * 0.06, ease: EASE }}
      whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-shadow duration-400"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
      data-cursor-hover
    >
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Image src={s.img} alt={s.title} fill className="object-cover" unoptimized />
        </motion.div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-black/10" />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-black tracking-tight mb-2 leading-snug" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)" }}>
          {s.title}
        </h3>
        <p className="text-[#86868B] text-sm leading-relaxed flex-1 mb-5">{s.desc}</p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="inline-flex items-center justify-center rounded-full py-2.5 px-5 text-xs font-bold tracking-[0.12em] uppercase self-start border border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
        >
          Book Now
        </motion.a>
      </div>
    </motion.div>
  );
}

/* Wide horizontal card */
function WideServiceCard({ s }: { s: (typeof services)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE }}
      whileHover={{ y: -4, boxShadow: "0 24px 70px rgba(0,0,0,0.12)" }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row group"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)", height: 220 }}
      data-cursor-hover
    >
      {/* Image — left 45% */}
      <div className="relative overflow-hidden sm:w-[45%] h-48 sm:h-full flex-shrink-0">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Image src={s.img} alt={s.title} fill className="object-cover" unoptimized />
        </motion.div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10 pointer-events-none" />
      </div>

      {/* Content — right side */}
      <div className="flex flex-col justify-center flex-1 px-8 py-6">
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#86868B] mb-3">
          Featured Service
        </span>
        <h3
          className="font-black tracking-tighter text-black leading-tight mb-3"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}
        >
          {s.title}
        </h3>
        <p className="text-[#86868B] text-sm leading-relaxed mb-6 max-w-md">{s.desc}</p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="inline-flex items-center gap-2 rounded-full py-2.5 px-6 text-xs font-bold tracking-[0.12em] uppercase self-start border border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
        >
          Book Now <span>→</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function Services() {
  return (
    <div id="services">
      <FanCarousel />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868B]">
                All Services
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
                className="font-black tracking-tighter text-black"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", letterSpacing: "-0.03em" }}
              >
                Offering For{" "}
                <span className="italic font-light text-black">All.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
              className="mt-2 font-light italic tracking-tight text-[#86868B]"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              We Bleed Photographs.
            </motion.p>
          </div>

          {/* Row 1 — 4 portrait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {services.slice(0, 4).map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>

          {/* Row 2 — 1 wide horizontal card */}
          <WideServiceCard s={services[4]} />

          {/* Row 3 — 4 portrait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {services.slice(5, 9).map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i + 5} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
