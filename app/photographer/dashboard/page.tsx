"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Camera,
  CheckCircle2,
  Edit3,
  MapPin,
  PartyPopper,
  Star,
  Sparkles,
} from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { StatCard } from "@/app/components/admin/StatCard";
import { Card, GhostButton, GoldButton } from "@/app/components/admin/Card";
import { Pill, StatusBadge } from "@/app/components/admin/Badge";
import { Modal } from "@/app/components/admin/Modal";
import { useToast } from "@/app/components/admin/Toast";
import {
  bookings as initialBookings,
  photographers,
} from "@/lib/mock-data";
import {
  computeQualityScore,
  formatCurrency,
  formatDate,
  initials,
} from "@/lib/utils";
import type { Booking } from "@/lib/types";

const PHOTOGRAPHER_ID = "ph_001";

export default function PhotographerDashboardPage() {
  const me = photographers.find((p) => p.id === PHOTOGRAPHER_ID)!;
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [newPopup, setNewPopup] = useState<Booking | null>(null);
  const toast = useToast();

  const mine = useMemo(
    () => bookings.filter((b) => b.photographerId === PHOTOGRAPHER_ID),
    [bookings],
  );

  // Surface the first unacknowledged assignment as a popup
  useEffect(() => {
    const t = setTimeout(() => {
      const unread = mine.find(
        (b) => b.status === "assigned" && !b.acknowledged,
      );
      if (unread) setNewPopup(unread);
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acknowledge = (id: string) => {
    setBookings((arr) =>
      arr.map((b) => (b.id === id ? { ...b, acknowledged: true } : b)),
    );
    setNewPopup(null);
    toast.success("Booking acknowledged");
  };

  const updateStatus = (id: string, status: Booking["status"]) => {
    setBookings((arr) =>
      arr.map((b) => (b.id === id ? { ...b, status } : b)),
    );
    toast.success(
      status === "in_progress"
        ? "Marked as In Progress"
        : "Marked Completed 🎉",
    );
  };

  const score = computeQualityScore(me);
  const active = mine.filter(
    (b) => b.status === "assigned" || b.status === "in_progress",
  ).length;
  const completed = mine.filter((b) => b.status === "completed").length;

  return (
    <>
      <TopBar
        greeting={`Welcome back, ${me.name.split(" ")[0]} 👋`}
        notifications={
          mine.filter((b) => b.status === "assigned" && !b.acknowledged).length
        }
      />

      <main className="space-y-6 p-6">
        {/* Profile banner */}
        <div className="overflow-hidden rounded-2xl border border-sky-400/20 bg-gradient-to-r from-sky-500/10 via-lsp-surface to-lsp-surface p-5">
          <div className="flex flex-wrap items-center gap-5">
            <div
              className="grid h-20 w-20 place-items-center rounded-2xl text-2xl font-semibold text-black ring-2 ring-white/10"
              style={{ background: me.avatarColor }}
            >
              {initials(me.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-2xl text-black">{me.name}</div>
              <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-lsp-muted">
                <MapPin className="h-3 w-3 gold-text" />
                {me.city} • {me.email}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {me.specializations.map((s) => (
                  <Pill key={s} tone="blue">
                    {s}
                  </Pill>
                ))}
              </div>
            </div>
            <div className="w-full max-w-xs rounded-xl border border-black/15 bg-lsp-surface-2 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="tracking-wider text-lsp-muted uppercase">
                  Quality Score
                </span>
                <span className="font-semibold gold-text">
                  {score.toFixed(1)} / 100
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-lsp-border">
                <div
                  className="h-full gold-gradient"
                  style={{ width: `${Math.min(100, score)}%` }}
                />
              </div>
              <div className="mt-3 grid grid-cols-3 text-center text-[11px] text-lsp-muted">
                <div>
                  <div className="text-sm font-semibold text-black">
                    {me.completedJobs}
                  </div>
                  Jobs
                </div>
                <div>
                  <div className="inline-flex items-center gap-0.5 text-sm font-semibold text-black">
                    <Star className="h-3 w-3 fill-lsp-gold gold-text" />
                    {me.rating.toFixed(1)}
                  </div>
                  Rating
                </div>
                <div>
                  <div className="text-sm font-semibold text-black">
                    {me.portfolio.length}
                  </div>
                  Photos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Active Assignments"
            value={active}
            Icon={Calendar}
            tone={active > 0 ? "gold" : "blue"}
          />
          <StatCard
            label="Completed Jobs"
            value={completed}
            Icon={CheckCircle2}
            tone="green"
          />
          <StatCard
            label="My Rating"
            value={
              <span className="inline-flex items-center gap-1">
                <Star className="h-5 w-5 fill-lsp-gold gold-text" />
                {me.rating.toFixed(1)}
              </span>
            }
            Icon={Sparkles}
            tone="amber"
          />
        </div>

        {/* Assignments table */}
        <Card title="My Assignments" subtitle="Update status as you progress">
          <div className="lsp-dark-scrollbar -mx-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="text-[11px] tracking-wider text-lsp-muted uppercase">
                  <th className="px-5 py-2">Booking</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Package</th>
                  <th className="py-2">Event Date</th>
                  <th className="py-2">Location</th>
                  <th className="py-2">Status</th>
                  <th className="px-5 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {mine.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t border-lsp-border/60 hover:bg-lsp-surface-2/60"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-black">
                      {b.id}
                    </td>
                    <td className="py-3 text-black">{b.customerName}</td>
                    <td className="py-3 text-black">{b.package}</td>
                    <td className="py-3 text-lsp-muted">
                      {formatDate(b.eventDate)}
                    </td>
                    <td className="py-3 text-lsp-muted">{b.location}</td>
                    <td className="py-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 py-3">
                      {b.status === "assigned" ? (
                        <GhostButton
                          size="sm"
                          onClick={() => updateStatus(b.id, "in_progress")}
                        >
                          Mark In Progress
                        </GhostButton>
                      ) : b.status === "in_progress" ? (
                        <button
                          onClick={() => updateStatus(b.id, "completed")}
                          className="inline-flex items-center gap-1 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-400/20"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Mark Completed
                        </button>
                      ) : b.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {formatDate(b.eventDate)}
                        </span>
                      ) : (
                        <span className="text-xs text-lsp-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Portfolio */}
        <Card
          title="My Portfolio"
          subtitle={`${me.portfolio.length}/10 photos uploaded`}
          action={
            <GoldButton size="sm">
              <Edit3 className="h-3.5 w-3.5" />
              Edit Portfolio
            </GoldButton>
          }
        >
          <div className="lsp-dark-scrollbar flex gap-3 overflow-x-auto pb-2">
            {me.portfolio.map((url, i) => (
              <div
                key={i}
                className="relative h-32 w-44 shrink-0 overflow-hidden rounded-xl border border-lsp-border"
              >
                <Image
                  src={url}
                  alt={`Portfolio ${i + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* New booking popup */}
      <AnimatePresence>
        {newPopup && (
          <Modal
            open={!!newPopup}
            onClose={() => setNewPopup(null)}
            hideClose
            size="md"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 16 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full"
                style={{ animation: "goldPulse 2.4s ease-out infinite" }}
              >
                <div className="grid h-20 w-20 place-items-center rounded-full gold-gradient text-white">
                  <Camera className="h-9 w-9" />
                </div>
              </motion.div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-lsp-surface-2 px-3 py-1 text-[11px] tracking-wider gold-text uppercase">
                <PartyPopper className="h-3 w-3" />
                New Assignment
              </div>
              <h3 className="mt-3 font-display text-3xl text-black">
                New Booking Assigned!
              </h3>
              <p className="mt-1 text-sm text-lsp-muted">
                You&apos;ve been selected for the following job:
              </p>

              <div className="mt-5 rounded-xl border border-lsp-border bg-lsp-surface-2 p-4 text-left">
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <Field label="Customer" value={newPopup.customerName} />
                  <Field label="Package" value={newPopup.package} />
                  <Field
                    label="Event Date"
                    value={formatDate(newPopup.eventDate)}
                  />
                  <Field
                    label="Amount"
                    value={
                      <span className="gold-text">
                        {formatCurrency(newPopup.amount)}
                      </span>
                    }
                  />
                  <div className="sm:col-span-2">
                    <div className="text-[10px] tracking-wider text-lsp-muted uppercase">
                      Location
                    </div>
                    <div className="mt-0.5 inline-flex items-center gap-1 font-medium text-black">
                      <MapPin className="h-3.5 w-3.5 gold-text" />
                      {newPopup.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <GoldButton onClick={() => acknowledge(newPopup.id)}>
                  View Details
                </GoldButton>
                <GhostButton onClick={() => acknowledge(newPopup.id)}>
                  Acknowledge
                </GhostButton>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-wider text-lsp-muted uppercase">
        {label}
      </div>
      <div className="mt-0.5 font-medium text-black">{value}</div>
    </div>
  );
}
