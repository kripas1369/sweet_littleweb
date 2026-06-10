"use client";

import { Download, Wallet } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import {
  Card,
  GhostButton,
} from "@/app/components/admin/Card";
import { StatCard } from "@/app/components/admin/StatCard";
import { StatusBadge } from "@/app/components/admin/Badge";
import { bookings, franchises, photographers } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const FRANCHISE_ID = "fr_ktm";

export default function FranchiseEarningsPage() {
  const me = franchises.find((f) => f.id === FRANCHISE_ID)!;
  const mine = bookings.filter(
    (b) => b.franchiseId === FRANCHISE_ID && b.status !== "cancelled",
  );

  const gross = mine.reduce((s, b) => s + b.amount, 0);
  const royalty = (gross * me.royaltyPercent) / 100;
  const pending = mine
    .filter((b) => b.status !== "completed")
    .reduce((s, b) => s + b.amount, 0);

  return (
    <>
      <TopBar
        greeting="My Earnings"
        subtitle={`Royalty rate: ${me.royaltyPercent}% • Auto-settled monthly`}
      />

      <main className="space-y-6 p-6">
        <div className="rounded-2xl border border-black/15 bg-lsp-surface-2 p-5">
          <div className="text-sm gold-text">
            You earn{" "}
            <span className="font-semibold">{me.royaltyPercent}% royalty</span>{" "}
            on all bookings completed at your franchise.
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Gross Earned"
            value={formatCurrency(gross)}
            Icon={Wallet}
            tone="gold"
          />
          <StatCard
            label="Royalty Retained"
            value={formatCurrency(royalty)}
            Icon={Wallet}
            tone="amber"
          />
          <StatCard
            label="Pending Settlement"
            value={formatCurrency(pending)}
            Icon={Wallet}
            tone="blue"
          />
        </div>

        <Card
          title="Earnings History"
          subtitle="Per-booking breakdown"
          action={
            <GhostButton size="sm">
              <Download className="h-3.5 w-3.5" />
              Export
            </GhostButton>
          }
        >
          <div className="lsp-dark-scrollbar -mx-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-[11px] tracking-wider text-lsp-muted uppercase">
                  <th className="px-5 py-2">Booking</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Photographer</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Gross</th>
                  <th className="px-5 py-2">Royalty</th>
                </tr>
              </thead>
              <tbody>
                {mine.map((b) => {
                  const royaltyAmt = (b.amount * me.royaltyPercent) / 100;
                  return (
                    <tr
                      key={b.id}
                      className="border-t border-lsp-border/60 hover:bg-lsp-surface-2/60"
                    >
                      <td className="px-5 py-3 font-mono text-xs text-black">
                        {b.id}
                      </td>
                      <td className="py-3 text-black">{b.customerName}</td>
                      <td className="py-3 text-lsp-muted">
                        {photographers.find((p) => p.id === b.photographerId)
                          ?.name ?? "—"}
                      </td>
                      <td className="py-3 text-lsp-muted">
                        {formatDate(b.eventDate)}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="py-3 font-medium text-black">
                        {formatCurrency(b.amount)}
                      </td>
                      <td className="px-5 py-3 font-semibold gold-text">
                        {formatCurrency(royaltyAmt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </>
  );
}
