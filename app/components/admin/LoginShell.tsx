"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { saveSession, dashboardPath } from "@/lib/auth";
import type { Role } from "@/lib/types";
import { GoldButton } from "./Card";

interface LoginShellProps {
  role: Role;
  imageUrl: string;
  imageAlt: string;
  tagline: string;
  badgeLabel: string;
  badgeTone: "gold" | "amber" | "blue";
  heading: string;
  subheading: string;
  defaultEmail: string;
  demoCredential: { email: string; password: string };
  topExtras?: ReactNode;
  belowLinks: ReactNode;
  entityId?: string;
  displayName: string;
}

const toneClass = {
  gold: "border-lsp-gold/35 text-lsp-gold-deep bg-amber-50",
  amber: "border-amber-300 text-amber-700 bg-amber-50",
  blue: "border-sky-300 text-sky-700 bg-sky-50",
};

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

export function LoginShell({
  role,
  imageUrl,
  imageAlt,
  tagline,
  badgeLabel,
  badgeTone,
  heading,
  subheading,
  defaultEmail,
  demoCredential,
  topExtras,
  belowLinks,
  entityId,
  displayName,
}: LoginShellProps) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveSession({
      role,
      name: displayName,
      email: email || demoCredential.email,
      entityId,
    });
    setTimeout(() => router.push(dashboardPath[role]), 250);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-lsp-bg lg:grid-cols-5">
      {/* LEFT — hero */}
      <div className="relative hidden overflow-hidden lg:col-span-3 lg:block">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="60vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Bokeh dots */}
        <div
          className="bokeh-dot"
          style={{ top: "12%", left: "18%", width: 70, height: 70 }}
        />
        <div
          className="bokeh-dot"
          style={{
            top: "32%",
            left: "62%",
            width: 110,
            height: 110,
            animationDelay: "2s",
          }}
        />
        <div
          className="bokeh-dot"
          style={{
            top: "55%",
            left: "28%",
            width: 90,
            height: 90,
            animationDelay: "4s",
          }}
        />
        <div
          className="bokeh-dot"
          style={{
            top: "70%",
            left: "72%",
            width: 60,
            height: 60,
            animationDelay: "1s",
          }}
        />
        <div
          className="bokeh-dot"
          style={{
            top: "20%",
            left: "85%",
            width: 50,
            height: 50,
            animationDelay: "3s",
          }}
        />

        {/* Brand + tagline at bottom-left */}
        <div className="absolute right-10 bottom-10 left-10 text-white">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl gold-gradient text-white font-display text-xl">
              L
            </div>
            <div>
              <div className="font-display text-xl leading-tight tracking-tight">
                Little Sweet Photography
              </div>
              <div className="text-[10px] tracking-[0.32em] font-semibold uppercase opacity-90">
                One Stop
              </div>
            </div>
          </div>
          <p className="max-w-md font-display text-4xl leading-tight tracking-tight">
            <span className="gold-text">{tagline.split(",")[0]},</span>
            <br />
            <span className="font-display-italic font-light text-white/95">
              {tagline.split(",").slice(1).join(",").trim()}
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="relative flex items-center justify-center bg-lsp-surface px-6 py-10 lg:col-span-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-full max-w-md"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-xs text-lsp-muted hover:text-black"
          >
            ← Back to main site
          </Link>

          <div
            className={`mb-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider uppercase ${toneClass[badgeTone]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {badgeLabel}
          </div>

          <h1 className="font-display text-5xl text-black">{heading}</h1>
          <p className="mt-3 text-sm text-lsp-muted">{subheading}</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {topExtras}

            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-lsp-muted uppercase">
                Email
              </label>
              <div className="group relative">
                <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-lsp-muted group-focus-within:text-black" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-full border border-lsp-border bg-lsp-surface-2 py-3 pr-3 pl-10 text-sm text-black placeholder:text-lsp-muted focus:border-black focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-lsp-muted uppercase">
                Password
              </label>
              <div className="group relative">
                <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-lsp-muted group-focus-within:text-black" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-full border border-lsp-border bg-lsp-surface-2 py-3 pr-10 pl-10 text-sm text-black placeholder:text-lsp-muted focus:border-black focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-lsp-muted hover:text-black"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex cursor-pointer items-center gap-2 text-lsp-muted">
                <span
                  className={`grid h-4 w-4 place-items-center rounded border transition ${
                    remember
                      ? "border-transparent gold-gradient"
                      : "border-lsp-border-strong bg-transparent"
                  }`}
                >
                  {remember && (
                    <svg
                      className="h-3 w-3 text-black"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6.5 5 9 10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            <GoldButton
              type="submit"
              size="lg"
              className="w-full text-black"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </GoldButton>
          </form>

          <div className="mt-6 border-t border-lsp-border pt-5 text-center text-xs text-lsp-muted">
            {belowLinks}
          </div>

          <div className="mt-6 rounded-2xl border border-lsp-border bg-lsp-surface-2 p-3.5">
            <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase">
              <span className="gold-text">Demo credentials</span>
              <span className="rounded-full border border-lsp-gold/30 bg-amber-50 px-2 py-0.5 text-lsp-gold-deep normal-case">
                auto-filled
              </span>
            </div>
            <div className="mt-2 grid gap-1 text-[11px] text-lsp-muted">
              <div>
                <span className="font-semibold text-black">Email:</span>{" "}
                {demoCredential.email}
              </div>
              <div>
                <span className="font-semibold text-black">Password:</span>{" "}
                {demoCredential.password}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile hero strip */}
      <div className="relative h-40 overflow-hidden lg:hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </div>
  );
}
