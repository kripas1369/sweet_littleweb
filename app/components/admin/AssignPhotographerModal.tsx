"use client";

import { Camera, Crown, MapPin, Sparkles, Star } from "lucide-react";
import type { Booking, Photographer } from "@/lib/types";
import { computeQualityScore, formatCurrency, formatDate, initials } from "@/lib/utils";
import { Modal } from "./Modal";
import { Pill } from "./Badge";
import { GoldButton } from "./Card";

interface Props {
  booking: Booking | null;
  photographers: Photographer[];
  allBookings: Booking[];
  onClose: () => void;
  onAssign: (photographer: Photographer) => void;
}

export function AssignPhotographerModal({
  booking,
  photographers,
  allBookings,
  onClose,
  onAssign,
}: Props) {
  if (!booking) return null;

  const ranked = photographers
    .filter((p) => p.franchiseId === booking.franchiseId && p.status === "active")
    .map((p) => ({ ...p, qualityScore: computeQualityScore(p) }))
    .sort((a, b) => (b.qualityScore ?? 0) - (a.qualityScore ?? 0));

  const activeFor = (id: string) =>
    allBookings.filter(
      (b) =>
        b.photographerId === id &&
        (b.status === "assigned" || b.status === "in_progress"),
    ).length;

  return (
    <Modal
      open={!!booking}
      onClose={onClose}
      size="lg"
      title={`Assign Booking ${booking.id}`}
      subtitle="Sorted by quality score — best match first"
    >
      {/* Booking summary */}
      <div className="rounded-2xl border border-lsp-border bg-lsp-surface-2 p-4">
        <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-lsp-muted uppercase">
              Customer
            </div>
            <div className="mt-0.5 font-medium text-black">
              {booking.customerName}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-lsp-muted uppercase">
              Package
            </div>
            <div className="mt-0.5 font-medium text-black">
              {booking.package}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-lsp-muted uppercase">
              Event Date
            </div>
            <div className="mt-0.5 font-medium text-black">
              {formatDate(booking.eventDate)}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-lsp-muted uppercase">
              Amount
            </div>
            <div className="mt-0.5 font-semibold gold-text">
              {formatCurrency(booking.amount)}
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="text-[10px] font-semibold tracking-wider text-lsp-muted uppercase">
              Location
            </div>
            <div className="mt-0.5 inline-flex items-center gap-1 text-black">
              <MapPin className="h-3.5 w-3.5 gold-text" />
              {booking.location}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-3 flex items-center gap-2 text-xs font-semibold text-lsp-muted">
        <Sparkles className="h-3.5 w-3.5" />
        Available Photographers — {ranked.length} matched
      </div>

      <div className="space-y-2.5">
        {ranked.length === 0 && (
          <div className="rounded-2xl border border-dashed border-lsp-border p-6 text-center text-sm text-lsp-muted">
            No active photographers available for this booking&apos;s location.
          </div>
        )}
        {ranked.map((p, idx) => {
          const score = p.qualityScore ?? 0;
          const tone =
            score >= 70 ? "green" : score >= 40 ? "amber" : "red";
          const colorBadge =
            tone === "green"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : tone === "amber"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-red-50 text-red-600 border-red-200";
          const load = activeFor(p.id);

          return (
            <div
              key={p.id}
              className={`flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-4 transition ${
                idx === 0
                  ? "border-transparent ring-2 ring-pink-300/60 shadow-[0_8px_24px_-10px_rgba(244,114,182,0.45)]"
                  : "border-lsp-border hover:border-lsp-border-strong"
              }`}
            >
              <div className="relative">
                <div
                  className="grid h-12 w-12 place-items-center rounded-full text-base font-semibold text-white"
                  style={{ background: p.avatarColor }}
                >
                  {initials(p.name)}
                </div>
                {idx === 0 && (
                  <div className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full gold-gradient text-white">
                    <Crown className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold text-black">{p.name}</div>
                  {idx === 0 && (
                    <Pill tone="gold">⭐ Recommended</Pill>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.specializations.slice(0, 3).map((s) => (
                    <Pill key={s} tone="muted">
                      {s}
                    </Pill>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-lsp-muted">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="font-semibold text-black">{p.rating.toFixed(1)}</span>
                    rating
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    <span className="font-semibold text-black">{p.completedJobs}</span> jobs
                  </span>
                  <span>
                    Response{" "}
                    <span className="font-semibold text-black">{p.responseRate}%</span>
                  </span>
                  <span
                    className={
                      load > 0 ? "text-amber-700" : "text-emerald-700"
                    }
                  >
                    {load} active booking{load === 1 ? "" : "s"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${colorBadge}`}
                >
                  Score: {score.toFixed(1)}/100
                </span>
                <GoldButton size="sm" onClick={() => onAssign(p)}>
                  Assign →
                </GoldButton>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
