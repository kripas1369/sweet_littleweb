"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

const videos = [
  {
    title: "Sharma Wedding Highlight",
    category: "Wedding",
    srcs: [
      "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-looking-at-the-ocean-4487-large.mp4",
      "https://assets.mixkit.co/videos/4487/mixkit-bride-and-groom-looking-at-the-ocean-4487-large.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    ],
    poster: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=85&auto=format&fit=crop",
  },
  {
    title: "Celebration & Dance",
    category: "Party",
    srcs: [
      "https://assets.mixkit.co/videos/preview/mixkit-a-couple-dancing-at-a-formal-party-6887-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-people-celebrating-a-party-with-colored-streamers-2-large.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
    poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=85&auto=format&fit=crop",
  },
  {
    title: "Newborn — Baby Aarav",
    category: "Newborn",
    srcs: [
      "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-baby-yawning-and-breathing-2190-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-baby-sleeping-close-up-2185-large.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    poster: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85&auto=format&fit=crop",
  },
  {
    title: "The Acharya Family",
    category: "Family Portrait",
    srcs: [
      "https://assets.mixkit.co/videos/preview/mixkit-family-having-fun-in-the-park-4694-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-family-sitting-and-talking-in-the-living-room-43845-large.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    ],
    poster: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=85&auto=format&fit=crop",
  },
  {
    title: "TechSummit 2024",
    category: "Corporate Event",
    srcs: [
      "https://assets.mixkit.co/videos/preview/mixkit-business-meeting-in-a-conference-room-40534-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-team-in-a-meeting-discussion-40543-large.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    ],
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85&auto=format&fit=crop",
  },
];

/* ── Individual video card ── */
function VideoCard({ v, index }: { v: (typeof videos)[number]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play();
      setPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    setProgress(el.currentTime / el.duration);
  };

  const onEnded = () => {
    setPlaying(false);
    setProgress(0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * el.duration;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="flex-shrink-0 snap-center"
      style={{ width: "clamp(300px, 46vw, 520px)" }}
    >
      {/* Video box */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        style={{ aspectRatio: "16/9" }}
        onClick={toggle}
      >
        <video
          ref={videoRef}
          poster={v.poster}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          {v.srcs.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(10,10,10,0.5) 100%)" }}
        />

        {/* Pause overlay with play button */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20"
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playing badge top-right */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-white text-[9px] tracking-widest uppercase font-bold">Playing</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.12)" }}
          onClick={seek}
        >
          <div
            className="h-full bg-white/70"
            style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
          />
        </div>
      </div>

      {/* Card label */}
      <div className="mt-3 px-1">
        <p className="text-[#86868B] text-[10px] font-semibold tracking-[0.22em] uppercase mb-1">
          {v.category}
        </p>
        <p className="text-white font-bold text-sm tracking-tight">{v.title}</p>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function VideoReveal() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 560 : -560, behavior: "smooth" });
  };

  return (
    <section className="bg-[#0A0A0A] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading + nav arrows */}
        <div className="flex items-end justify-between px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="text-[#86868B] text-xs font-semibold tracking-[0.3em] uppercase block mb-4">
              The Experience
            </span>
            <h2
              className="font-black tracking-tighter text-white leading-none"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              Photography
              <br />
              <span className="italic font-light text-white/40">that moves you.</span>
            </h2>
          </motion.div>

          {/* Scroll arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => nudge("left")}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-white/50 hover:text-white transition-colors duration-200"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
              </svg>
            </button>
            <button
              onClick={() => nudge("right")}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-white/50 hover:text-white transition-colors duration-200"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {videos.map((v, i) => (
            <VideoCard key={v.title} v={v} index={i} />
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mt-6 tracking-wide px-6">
          Click any video to play · scroll to browse · all videos muted
        </p>
      </div>
    </section>
  );
}
