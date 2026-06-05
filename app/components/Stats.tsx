"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const stats = [
  {
    label: "Happy Clients",
    value: 500,
    suffix: "+",
    desc: "Families who trusted us with their most precious moments.",
  },
  {
    label: "Years of Experience",
    value: 12,
    suffix: "+",
    desc: "Crafting timeless imagery across every genre.",
  },
  {
    label: "Photos Delivered",
    value: 10,
    suffix: "K+",
    desc: "High-resolution images, carefully edited and delivered.",
  },
  {
    label: "Five-Star Reviews",
    value: 98,
    suffix: "%",
    desc: "Consistent excellence from our first shoot to our latest.",
  },
];

function StatCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = stat.value;
    const steps = 52;
    const interval = 1300 / steps;
    let current = 0;
    const id = setInterval(() => {
      current = Math.min(current + target / steps, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: EASE }}
      className="bg-[#F5F5F7] rounded-2xl p-8 flex flex-col justify-between"
      style={{ minHeight: 210 }}
    >
      <p className="text-[#86868B] text-sm font-medium tracking-wide">{stat.label}</p>
      <div>
        <p
          className="font-black tracking-tighter text-black leading-none"
          style={{ fontSize: "clamp(2.8rem, 4.5vw, 4.2rem)", letterSpacing: "-0.04em" }}
        >
          {count}
          {stat.suffix}
        </p>
        <p className="text-[#86868B] text-xs leading-relaxed mt-2 max-w-[22ch]">
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
