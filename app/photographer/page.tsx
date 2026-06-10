"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
  X,
} from "lucide-react";
import { GhostButton, GoldButton } from "@/app/components/admin/Card";
import { useToast } from "@/app/components/admin/Toast";
import { franchises } from "@/lib/mock-data";
import type { Specialization } from "@/lib/types";

const ALL_SPECIALIZATIONS: Specialization[] = [
  "Wedding",
  "Birthday",
  "Baby Shower",
  "Corporate",
  "Travel",
  "Newborn",
  "Maternity",
  "Party",
  "Bratabandha",
  "Pasni",
];

interface PortfolioPhoto {
  id: string;
  url: string;
  name: string;
}

export default function PhotographerRegistrationPage() {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"form" | "success">("form");

  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    city: franchises[0].location,
  });
  const [selected, setSelected] = useState<Specialization[]>([]);
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [password, setPassword] = useState({ pw: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);

  const toggleSpec = (s: Specialization) => {
    setSelected((arr) =>
      arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s],
    );
  };

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const next: PortfolioPhoto[] = [];
    Array.from(files).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name} is over 5MB`);
        return;
      }
      next.push({
        id: `${Date.now()}_${f.name}`,
        url: URL.createObjectURL(f),
        name: f.name,
      });
    });
    setPhotos((arr) => [...arr, ...next].slice(0, 10));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  };

  const removePhoto = (id: string) => {
    setPhotos((arr) => arr.filter((p) => p.id !== id));
  };

  const onDragHandle = (
    e: React.DragEvent<HTMLDivElement>,
    fromIndex: number,
  ) => {
    e.dataTransfer.setData("text/plain", String(fromIndex));
  };

  const onDropReorder = (
    e: React.DragEvent<HTMLDivElement>,
    toIndex: number,
  ) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(fromIndex) || fromIndex === toIndex) return;
    setPhotos((arr) => {
      const next = [...arr];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length < 5) {
      setShowSubmitError(true);
      toast.error("Please upload at least 5 portfolio photos");
      return;
    }
    setStep("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "success") {
    return (
      <main className="min-h-screen bg-lsp-bg px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl border border-lsp-border bg-lsp-surface p-10 text-center lsp-card-shadow"
          >
            <div className="relative mx-auto h-24 w-24">
              <motion.div
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-pink-200/50 blur-2xl"
              />
              <div className="relative grid h-24 w-24 place-items-center rounded-full gold-gradient text-white">
                <CheckCircle2 className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mt-6 font-display text-5xl text-black">
              Application Submitted!
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-lsp-muted">
              Thank you for applying to Little Sweet Photography. We will review
              your portfolio and connect you with the nearest franchise.
              Expect a response within 3 business days.
            </p>

            <div className="mx-auto mt-6 grid max-w-sm gap-2 rounded-2xl border border-lsp-border bg-lsp-surface-2 p-4 text-left text-xs">
              <Row label="Name" value={personal.name || "—"} />
              <Row label="Email" value={personal.email || "—"} />
              <Row label="Branch" value={personal.city} />
              <Row label="Specializations" value={selected.join(", ") || "—"} />
              <Row label="Portfolio" value={`${photos.length} photos`} />
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/photographer/login">
                <GoldButton>Go to Photographer Login</GoldButton>
              </Link>
              <Link href="/">
                <GhostButton>Back to Home</GhostButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lsp-bg text-black">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden border-b border-lsp-border">
        <Image
          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80"
          alt="Photographer at work"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lsp-bg via-lsp-bg/70 to-black/30" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end px-6 pb-8">
          <Link
            href="/"
            className="self-start text-xs text-white/80 hover:text-white"
          >
            ← Back to main site
          </Link>
          <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full gold-gradient px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Join the Network
          </div>
          <h1 className="mt-2 font-display text-5xl text-black sm:text-6xl">
            Apply as a <span className="gold-text font-display-italic">Photographer</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-lsp-muted">
            Get matched with curated bookings, build your reputation, and grow
            with Little Sweet Photography across Nepal.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 — Personal */}
          <Section
            number={1}
            title="Personal Information"
            description="Tell us about yourself"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" Icon={User}>
                <input
                  required
                  value={personal.name}
                  onChange={(e) =>
                    setPersonal({ ...personal, name: e.target.value })
                  }
                  placeholder="e.g. Aarav Shrestha"
                  className="w-full bg-transparent text-sm text-black placeholder:text-lsp-muted focus:outline-none"
                />
              </Field>
              <Field label="Email" Icon={Mail}>
                <input
                  required
                  type="email"
                  value={personal.email}
                  onChange={(e) =>
                    setPersonal({ ...personal, email: e.target.value })
                  }
                  placeholder="you@email.com"
                  className="w-full bg-transparent text-sm text-black placeholder:text-lsp-muted focus:outline-none"
                />
              </Field>
              <Field label="Phone" Icon={Phone}>
                <input
                  required
                  value={personal.phone}
                  onChange={(e) =>
                    setPersonal({ ...personal, phone: e.target.value })
                  }
                  placeholder="+977 …"
                  className="w-full bg-transparent text-sm text-black placeholder:text-lsp-muted focus:outline-none"
                />
              </Field>
              <Field label="City / Branch" Icon={MapPin}>
                <select
                  value={personal.city}
                  onChange={(e) =>
                    setPersonal({ ...personal, city: e.target.value })
                  }
                  className="w-full appearance-none bg-transparent text-sm text-black focus:outline-none"
                >
                  {franchises.map((f) => (
                    <option key={f.id} value={f.location}>
                      {f.location}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          {/* Section 2 — Specializations */}
          <Section
            number={2}
            title="Specializations"
            description="Select all areas where you excel"
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {ALL_SPECIALIZATIONS.map((s) => {
                const on = selected.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleSpec(s)}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-left text-sm font-medium transition ${
                      on
                        ? "border-transparent gold-gradient text-white"
                        : "border-lsp-border bg-lsp-surface-2 text-lsp-muted hover:border-black hover:text-black"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 place-items-center rounded border ${
                        on
                          ? "border-white bg-white text-pink-500"
                          : "border-lsp-border-strong"
                      }`}
                    >
                      {on && (
                        <svg
                          className="h-3 w-3"
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
                    {s}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Section 3 — Portfolio */}
          <Section
            number={3}
            title="Portfolio Upload"
            description="Upload 5 to 10 of your best work photos"
          >
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className="group cursor-pointer rounded-3xl border-2 border-dashed border-lsp-border-strong bg-lsp-surface-2 p-10 text-center transition hover:border-black hover:bg-lsp-surface"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gold-gradient text-white transition group-hover:scale-110">
                <Upload className="h-6 w-6" />
              </div>
              <div className="mt-3 font-display text-2xl text-black">
                Drop your photos here
              </div>
              <div className="mt-1 text-xs text-lsp-muted">
                or click to browse • JPG, PNG, WEBP • max 5 MB each
              </div>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => onFiles(e.target.files)}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span
                className={
                  showSubmitError && photos.length < 5
                    ? "text-red-600"
                    : "text-lsp-muted"
                }
              >
                <span className="font-semibold text-black">{photos.length}</span>{" "}
                / 10 photos uploaded •{" "}
                {photos.length < 5 ? (
                  <span
                    className={
                      showSubmitError ? "text-red-600" : "text-amber-700"
                    }
                  >
                    Need at least 5
                  </span>
                ) : (
                  <span className="text-emerald-700">Looks great</span>
                )}
              </span>
              {photos.length > 0 && (
                <span className="text-lsp-muted">
                  Drag thumbs to reorder — best first
                </span>
              )}
            </div>

            {photos.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {photos.map((photo, i) => (
                  <div
                    key={photo.id}
                    draggable
                    onDragStart={(e) => onDragHandle(e, i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDropReorder(e, i)}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-lsp-border bg-black"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.name}
                      fill
                      sizes="200px"
                      className="object-cover"
                      unoptimized
                    />
                    {i === 0 && (
                      <span className="absolute top-1.5 left-1.5 rounded-full gold-gradient px-2 py-0.5 text-[9px] font-bold text-white">
                        BEST
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(photo.id);
                      }}
                      className="absolute top-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                      aria-label="Remove"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {photos.length < 10 && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-lsp-border bg-lsp-surface-2 text-lsp-muted hover:border-black hover:text-black"
                  >
                    <ImageIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
            )}
          </Section>

          {/* Section 4 — Password */}
          <Section
            number={4}
            title="Password Setup"
            description="Create a secure password for your account"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Password" Icon={Lock}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password.pw}
                  onChange={(e) =>
                    setPassword({ ...password, pw: e.target.value })
                  }
                  placeholder="At least 8 characters"
                  className="w-full bg-transparent pr-7 text-sm text-black placeholder:text-lsp-muted focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-lsp-muted hover:text-black"
                  aria-label="Toggle password visibility"
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </Field>
              <Field label="Confirm Password" Icon={Lock}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password.confirm}
                  onChange={(e) =>
                    setPassword({ ...password, confirm: e.target.value })
                  }
                  placeholder="Repeat password"
                  className="w-full bg-transparent text-sm text-black placeholder:text-lsp-muted focus:outline-none"
                />
              </Field>
            </div>
          </Section>

          {/* Submit */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <Link
              href="/photographer/login"
              className="text-sm text-lsp-muted hover:text-black"
            >
              Already have an account? Sign in →
            </Link>
            <GoldButton type="submit" size="lg">
              <Camera className="h-4 w-4" />
              Apply as Photographer
            </GoldButton>
          </div>
        </form>
      </div>
    </main>
  );
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-lsp-border bg-lsp-surface p-6 lsp-card-shadow sm:p-7"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl gold-gradient font-display text-base font-bold text-white">
          {number}
        </div>
        <div>
          <h2 className="font-display text-2xl text-black">{title}</h2>
          <p className="text-xs text-lsp-muted">{description}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function Field({
  label,
  Icon,
  children,
}: {
  label: string;
  Icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-lsp-muted uppercase">
        {label}
      </label>
      <div className="group relative flex items-center gap-2 rounded-full border border-lsp-border bg-lsp-surface-2 px-4 py-3 focus-within:border-black focus-within:bg-white">
        <Icon className="h-4 w-4 shrink-0 text-lsp-muted group-focus-within:text-black" />
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-lsp-muted">{label}</span>
      <span className="text-right font-semibold text-black">{value}</span>
    </div>
  );
}
