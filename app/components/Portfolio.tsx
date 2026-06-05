"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const EASE = [0.32, 0.72, 0, 1] as const;

const projects = [
  {
    title: "Sharma Wedding",
    category: "Wedding",
    year: "2024",
    img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&q=90&auto=format&fit=crop",
    align: "left",
  },
  {
    title: "The Acharya Family",
    category: "Family Portrait",
    year: "2024",
    img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=90&auto=format&fit=crop",
    align: "right",
  },
  {
    title: "Baby Aarav",
    category: "Newborn",
    year: "2023",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1400&q=90&auto=format&fit=crop",
    align: "left",
  },
  {
    title: "TechSummit 2024",
    category: "Corporate Event",
    year: "2024",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=90&auto=format&fit=crop",
    align: "right",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const isLeft = project.align === "left";

  // Image slides from its side, text slides from opposite side
  const imgX = isLeft ? -120 : 120;
  const textX = isLeft ? 100 : -100;

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isLeft ? "" : "lg:flex-row-reverse"}`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: imgX, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: EASE, delay: index * 0.05 }}
        className="w-full lg:w-3/5 relative overflow-hidden rounded-3xl aspect-[4/3] flex-shrink-0 group"
        data-cursor-hover
      >
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        </motion.div>
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        {/* Category chip on image */}
        <div className="absolute top-5 left-5 z-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {project.category}
          </span>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: textX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.18 + index * 0.05 }}
        className={`w-full lg:w-2/5 ${isLeft ? "lg:text-left" : "lg:text-right"}`}
      >
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868B] block mb-4">
          {project.category} · {project.year}
        </span>
        <h3
          className="font-black tracking-tighter text-black mb-6 leading-none"
          style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", letterSpacing: "-0.03em" }}
        >
          {project.title}
        </h3>
        <motion.a
          href="#contact"
          whileHover={{ x: isLeft ? 6 : -6, opacity: 0.7 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`inline-flex items-center gap-2 text-sm font-semibold text-black border-b border-black/30 pb-0.5 hover:border-black transition-colors ${isLeft ? "" : "flex-row-reverse"}`}
          data-cursor-hover
        >
          View Gallery
          <span className={isLeft ? "" : "rotate-180"}>→</span>
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading swipes from left */}
        <div className="mb-24 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868B] inline-block"
          >
            Portfolio
          </motion.span>
          <div className="overflow-hidden mt-4">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="font-black tracking-tighter text-black max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              Selected Work.
            </motion.h2>
          </div>
        </div>

        <div className="space-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
