"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  Icon: LucideIcon;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  tone?: "gold" | "amber" | "blue" | "green" | "red";
  delay?: number;
}

const toneMap = {
  gold: { iconBg: "gold-gradient text-white" },
  amber: { iconBg: "bg-amber-100 text-amber-700" },
  blue: { iconBg: "bg-sky-100 text-sky-700" },
  green: { iconBg: "bg-emerald-100 text-emerald-700" },
  red: { iconBg: "bg-red-100 text-red-700" },
};

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

export function StatCard({
  label,
  value,
  Icon,
  trend,
  tone = "gold",
  delay = 0,
}: StatCardProps) {
  const t = toneMap[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="group relative overflow-hidden rounded-3xl border border-lsp-border bg-lsp-surface p-5 lsp-card-shadow transition hover:-translate-y-0.5 hover:border-lsp-border-strong"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold tracking-wider text-lsp-muted uppercase">
            {label}
          </div>
          <div className="mt-2 font-display text-3xl text-black sm:text-[34px]">
            {value}
          </div>
          {trend && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium">
              {trend.direction === "up" ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              ) : trend.direction === "down" ? (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              ) : (
                <span className="h-3.5 w-3.5" />
              )}
              <span
                className={
                  trend.direction === "up"
                    ? "text-emerald-600"
                    : trend.direction === "down"
                      ? "text-red-500"
                      : "text-lsp-muted"
                }
              >
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl ${t.iconBg}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-gradient-to-br from-pink-200/40 to-amber-200/30 blur-3xl transition group-hover:from-pink-200/60 group-hover:to-amber-200/40" />
    </motion.div>
  );
}
