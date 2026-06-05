"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contacts = [
  {
    label: "WhatsApp",
    sub: "+977 98XXXXXXXX",
    href: "https://wa.me/9779800000000",
    bg: "#25D366",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: "Viber",
    sub: "+977 98XXXXXXXX",
    href: "viber://chat?number=9779800000000",
    bg: "#7360F2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm3.844 15.305c-.195.146-.424.22-.656.22-.146 0-.293-.029-.432-.088-.878-.37-1.71-.89-2.456-1.542a11.57 11.57 0 01-1.95-2.237 8.948 8.948 0 01-1.03-2.07c-.195-.615-.088-1.23.293-1.67l.468-.527c.283-.322.742-.322 1.025 0l1.094 1.24c.146.166.225.38.225.6 0 .22-.079.43-.225.595l-.42.474c.19.42.449.81.765 1.152.336.362.727.664 1.152.893l.527-.6c.147-.166.361-.26.59-.26.23 0 .444.094.59.26l1.094 1.24c.293.332.283.84-.054 1.12z" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    sub: "+977 98XXXXXXXX",
    href: "tel:+9779800000000",
    bg: "#1C1C1E",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-5 bottom-8 z-[9990]">
      <div className="relative flex flex-col items-center">

        {/* Sub-buttons — stack upward above main button */}
        <AnimatePresence>
          {open &&
            contacts.map((c, i) => (
              <motion.div
                key={c.label}
                className="absolute bottom-16 left-0 flex items-center gap-3"
                style={{ bottom: `${(contacts.length - i) * 64}px` }}
                initial={{ opacity: 0, y: 20, scale: 0.4 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.4 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 26,
                  delay: (contacts.length - 1 - i) * 0.07,
                }}
              >
                {/* Icon button */}
                <motion.a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                  style={{ background: c.bg, boxShadow: `0 4px 20px ${c.bg}55` }}
                  aria-label={c.label}
                >
                  {c.icon}
                </motion.a>

                {/* Label pill */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: (contacts.length - 1 - i) * 0.07 + 0.1 }}
                  className="bg-white rounded-xl px-3 py-1.5 shadow-md pointer-events-none"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
                >
                  <p className="text-black text-xs font-bold leading-none">{c.label}</p>
                  <p className="text-[#86868B] text-[10px] mt-0.5 leading-none">{c.sub}</p>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Main FAB — pink with arrow */}
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative z-10"
          style={{
            background: open
              ? "linear-gradient(135deg, #F472B6, #FBBF24)"
              : "#F472B6",
            boxShadow: "0 6px 28px rgba(244,114,182,0.45)",
          }}
          aria-label="Contact"
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            {open ? (
              /* Down arrow (closes) */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            ) : (
              /* Up arrow (opens) */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M7 14l5-5 5 5H7z" />
              </svg>
            )}
          </motion.div>
        </motion.button>

        {/* Pink ripple ring when closed */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(244,114,182,0.5)" }}
            animate={{ scale: [1, 1.55, 1.55], opacity: [0.7, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
}
