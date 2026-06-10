"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { Card, GhostButton, GoldButton } from "@/app/components/admin/Card";
import { Modal } from "@/app/components/admin/Modal";
import { Pill } from "@/app/components/admin/Badge";
import { EmptyState } from "@/app/components/admin/EmptyState";
import { photographers } from "@/lib/mock-data";
import { computeQualityScore, initials } from "@/lib/utils";
import type { Photographer } from "@/lib/types";

const FRANCHISE_ID = "fr_ktm";

export default function FranchisePhotographersPage() {
  const mine = photographers.filter((p) => p.franchiseId === FRANCHISE_ID);
  const [openPortfolio, setOpenPortfolio] = useState<Photographer | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      <TopBar
        greeting="My Photographers"
        subtitle="Your franchise photographer pool"
      />

      <main className="space-y-6 p-6">
        <Card title={`${mine.length} photographers`}>
          {mine.length === 0 ? (
            <EmptyState
              Icon={Camera}
              title="No photographers yet"
              description="Photographers assigned to your franchise will appear here."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {mine.map((p) => {
                const score = computeQualityScore(p);
                return (
                  <PhotographerCard
                    key={p.id}
                    p={p}
                    score={score}
                    onOpen={() => {
                      setOpenPortfolio(p);
                      setLightboxIndex(0);
                    }}
                  />
                );
              })}
            </div>
          )}
        </Card>
      </main>

      <Modal
        open={!!openPortfolio}
        onClose={() => setOpenPortfolio(null)}
        size="xl"
        title={openPortfolio ? `${openPortfolio.name}'s Portfolio` : ""}
        subtitle={
          openPortfolio
            ? `${openPortfolio.portfolio.length} photos • ${openPortfolio.specializations.join(", ")}`
            : undefined
        }
      >
        {openPortfolio && (
          <>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-lsp-border bg-black">
              <Image
                src={openPortfolio.portfolio[lightboxIndex]}
                alt={`Portfolio ${lightboxIndex + 1}`}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <button
                onClick={() =>
                  setLightboxIndex(
                    (i) =>
                      (i - 1 + openPortfolio.portfolio.length) %
                      openPortfolio.portfolio.length,
                  )
                }
                className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-black backdrop-blur hover:bg-black/80"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setLightboxIndex(
                    (i) => (i + 1) % openPortfolio.portfolio.length,
                  )
                }
                className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-black backdrop-blur hover:bg-black/80"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs text-black backdrop-blur">
                {lightboxIndex + 1} / {openPortfolio.portfolio.length}
              </div>
            </div>
            <div className="lsp-dark-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2">
              {openPortfolio.portfolio.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                    i === lightboxIndex
                      ? "border-black"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`Thumb ${i + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

function PhotographerCard({
  p,
  score,
  onOpen,
}: {
  p: Photographer;
  score: number;
  onOpen: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-lsp-border bg-lsp-surface transition hover:border-lsp-border-strong">
      {/* Portfolio strip */}
      <div className="relative grid grid-cols-3 gap-0.5 bg-lsp-border-strong">
        {p.portfolio.slice(0, 3).map((url, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={url}
              alt={`${p.name} preview ${i + 1}`}
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-black"
            style={{ background: p.avatarColor }}
          >
            {initials(p.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate font-medium text-black">{p.name}</div>
              {p.status === "active" ? (
                <Pill tone="green">Active</Pill>
              ) : (
                <Pill tone="amber">Pending</Pill>
              )}
            </div>
            <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-lsp-muted">
              <MapPin className="h-3 w-3 gold-text" />
              {p.city}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {p.specializations.slice(0, 3).map((s) => (
            <Pill key={s} tone="muted">
              {s}
            </Pill>
          ))}
        </div>

        {/* Quality bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-lsp-muted">Quality Score</span>
            <span className="font-semibold gold-text">
              {score.toFixed(1)} / 100
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-lsp-border">
            <div
              className="h-full gold-gradient transition-all"
              style={{ width: `${Math.min(100, score)}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-lsp-border rounded-xl border border-lsp-border bg-lsp-surface-2 py-2 text-center">
          <div>
            <div className="text-sm font-semibold text-black">
              {p.completedJobs}
            </div>
            <div className="text-[10px] tracking-wider text-lsp-muted uppercase">
              Jobs
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-0.5 text-sm font-semibold text-black">
              <Star className="h-3 w-3 fill-lsp-gold gold-text" />
              {p.rating.toFixed(1)}
            </div>
            <div className="text-[10px] tracking-wider text-lsp-muted uppercase">
              Rating
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-black">
              {p.responseRate}%
            </div>
            <div className="text-[10px] tracking-wider text-lsp-muted uppercase">
              Response
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <GoldButton size="sm" className="flex-1" onClick={onOpen}>
            View Portfolio
          </GoldButton>
          <GhostButton size="sm">Message</GhostButton>
        </div>
      </div>
    </div>
  );
}
