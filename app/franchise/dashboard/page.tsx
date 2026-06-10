"use client";

import { useMemo, useState } from "react";
import { Calendar, CheckCircle2, MapPin, UserPlus, Wallet } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { StatCard } from "@/app/components/admin/StatCard";
import { Card, GoldButton } from "@/app/components/admin/Card";
import { StatusBadge } from "@/app/components/admin/Badge";
import { AssignPhotographerModal } from "@/app/components/admin/AssignPhotographerModal";
import { useToast } from "@/app/components/admin/Toast";
import {
  bookings as initialBookings,
  franchises,
  photographers,
} from "@/lib/mock-data";
import type { Booking } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

const FRANCHISE_ID = "fr_ktm";

export default function FranchiseDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [assignBooking, setAssignBooking] = useState<Booking | null>(null);
  const toast = useToast();

  const me = franchises.find((f) => f.id === FRANCHISE_ID)!;
  const mine = useMemo(
    () => bookings.filter((b) => b.franchiseId === FRANCHISE_ID),
    [bookings],
  );

  const today = mine.filter(
    (b) => b.createdAt === new Date().toISOString().slice(0, 10),
  ).length;
  const pendingAssign = mine.filter((b) => b.status === "pending").length;
  const monthRevenue = mine
    .filter((b) => new Date(b.eventDate).getMonth() === 5) // June
    .reduce((s, b) => s + b.amount, 0);
  const myPhotos = photographers.filter(
    (p) => p.franchiseId === FRANCHISE_ID && p.status === "active",
  ).length;

  const handleAssign = (photographerId: string) => {
    if (!assignBooking) return;
    setBookings((arr) =>
      arr.map((b) =>
        b.id === assignBooking.id
          ? { ...b, photographerId, status: "assigned" }
          : b,
      ),
    );
    const photographer = photographers.find((p) => p.id === photographerId);
    toast.success(
      `Assigned ${photographer?.name} to ${assignBooking.id}`,
    );
    setAssignBooking(null);
  };

  return (
    <>
      <TopBar
        greeting="Good morning, Bishal 👋"
        notifications={pendingAssign}
      />

      <main className="space-y-6 p-6">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-500/10 via-lsp-surface to-lsp-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-sm text-amber-700">
                <MapPin className="h-4 w-4" />
                {me.name} Branch
              </div>
              <h2 className="mt-1 font-display text-2xl text-black">
                {me.address}
              </h2>
            </div>
            <div className="rounded-xl border border-black/20 bg-lsp-surface-2 px-4 py-3 text-right">
              <div className="text-[10px] tracking-wider gold-text uppercase">
                Your royalty
              </div>
              <div className="font-display text-3xl gold-text">
                {me.royaltyPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="New Today"
            value={today}
            Icon={Calendar}
            tone={today > 0 ? "amber" : "gold"}
          />
          <StatCard
            label="Pending Assignment"
            value={pendingAssign}
            Icon={UserPlus}
            tone={pendingAssign > 0 ? "red" : "green"}
          />
          <StatCard
            label="This Month Revenue"
            value={formatCurrency(monthRevenue)}
            Icon={Wallet}
            tone="gold"
          />
          <StatCard
            label="My Photographers"
            value={myPhotos}
            Icon={CheckCircle2}
            tone="blue"
          />
        </div>

        {/* Incoming bookings */}
        <Card
          title="Incoming Bookings"
          subtitle="Newest at the top"
        >
          <div className="lsp-dark-scrollbar -mx-5 overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="text-[11px] tracking-wider text-lsp-muted uppercase">
                  <th className="px-5 py-2">Booking</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Package</th>
                  <th className="py-2">Event Date</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="px-5 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {mine
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .map((b) => (
                    <tr
                      key={b.id}
                      className="border-t border-lsp-border/60 hover:bg-lsp-surface-2/60"
                    >
                      <td className="px-5 py-3 font-mono text-xs text-black">
                        {b.id}
                      </td>
                      <td className="py-3">
                        <div className="font-medium text-black">
                          {b.customerName}
                        </div>
                        <div className="text-[11px] text-lsp-muted">
                          {b.customerPhone}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="text-black">{b.package}</div>
                        <div className="text-[11px] text-lsp-muted">
                          {b.location}
                        </div>
                      </td>
                      <td className="py-3 text-black">
                        {formatDate(b.eventDate)}
                      </td>
                      <td className="py-3 font-medium gold-text">
                        {formatCurrency(b.amount)}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-5 py-3">
                        {b.status === "pending" ? (
                          <GoldButton
                            size="sm"
                            onClick={() => setAssignBooking(b)}
                          >
                            Assign Photographer
                          </GoldButton>
                        ) : b.photographerId ? (
                          <span className="text-xs text-lsp-muted">
                            {
                              photographers.find(
                                (p) => p.id === b.photographerId,
                              )?.name
                            }
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
      </main>

      <AssignPhotographerModal
        booking={assignBooking}
        photographers={photographers}
        allBookings={bookings}
        onClose={() => setAssignBooking(null)}
        onAssign={(p) => handleAssign(p.id)}
      />
    </>
  );
}
