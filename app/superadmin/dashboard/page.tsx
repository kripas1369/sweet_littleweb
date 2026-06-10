"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Building2,
  Calendar,
  Camera,
  Check,
  MapPin,
  Pencil,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { StatCard } from "@/app/components/admin/StatCard";
import { Card, GhostButton, GoldButton } from "@/app/components/admin/Card";
import { StatusBadge } from "@/app/components/admin/Badge";
import { DonutChart, LineChart } from "@/app/components/admin/Charts";
import { useToast } from "@/app/components/admin/Toast";
import {
  bookings,
  franchises as initialFranchises,
  monthlyRevenue,
  photographers,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Franchise } from "@/lib/types";

export default function SuperAdminDashboardPage() {
  const [franchises, setFranchises] = useState<Franchise[]>(initialFranchises);
  const toast = useToast();

  const totalRevenue = useMemo(
    () =>
      bookings
        .filter((b) => b.status !== "cancelled")
        .reduce((s, b) => s + b.amount, 0),
    [],
  );

  const recent = useMemo(
    () =>
      [...bookings]
        .sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 8),
    [],
  );

  const donutData = franchises.map((f, i) => {
    const fb = bookings.filter(
      (b) => b.franchiseId === f.id && b.status !== "cancelled",
    );
    const gross = fb.reduce((s, b) => s + b.amount, 0);
    return {
      label: f.name,
      value: gross,
      meta: `Royalty ${f.royaltyPercent}% • ${fb.length} bookings`,
      color: i === 0 ? "#d4af37" : "#e6c869",
    };
  });

  const totalGross = donutData.reduce((s, d) => s + d.value, 0);
  const totalRoyalty = franchises.reduce((s, f) => {
    const fb = bookings.filter(
      (b) => b.franchiseId === f.id && b.status !== "cancelled",
    );
    return s + (fb.reduce((x, b) => x + b.amount, 0) * f.royaltyPercent) / 100;
  }, 0);

  return (
    <>
      <TopBar
        greeting="Good morning, Riya 👋"
        notifications={bookings.filter((b) => b.status === "pending").length}
      />

      <main className="space-y-6 p-6">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Bookings"
            value={bookings.length}
            Icon={Calendar}
            trend={{ value: "↑ 12% this month", direction: "up" }}
            tone="gold"
            delay={0}
          />
          <StatCard
            label="Total Revenue"
            value={formatCurrency(totalRevenue)}
            Icon={Wallet}
            trend={{ value: "↑ 8% this month", direction: "up" }}
            tone="green"
            delay={0.05}
          />
          <StatCard
            label="Active Franchises"
            value={franchises.filter((f) => f.status === "active").length}
            Icon={Building2}
            trend={{ value: "Both active", direction: "neutral" }}
            tone="amber"
            delay={0.1}
          />
          <StatCard
            label="Active Photographers"
            value={photographers.filter((p) => p.status === "active").length}
            Icon={Camera}
            trend={{ value: "↑ 2 new this month", direction: "up" }}
            tone="blue"
            delay={0.15}
          />
        </div>

        {/* Recent bookings + donut */}
        <div className="grid gap-6 xl:grid-cols-5">
          <Card
            className="xl:col-span-3"
            title="Recent Bookings"
            subtitle="Latest activity across all franchises"
            action={
              <Link href="/superadmin/dashboard/bookings">
                <GhostButton size="sm">View All →</GhostButton>
              </Link>
            }
          >
            <div className="lsp-dark-scrollbar -mx-5 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="text-[11px] tracking-wider text-lsp-muted uppercase">
                    <th className="px-5 py-2">Customer</th>
                    <th className="py-2">Package</th>
                    <th className="py-2">Franchise</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Amount</th>
                    <th className="px-5 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((b) => {
                    const fr = franchises.find((f) => f.id === b.franchiseId);
                    return (
                      <tr
                        key={b.id}
                        className="border-t border-lsp-border/60 transition hover:bg-lsp-surface-2/60"
                      >
                        <td className="px-5 py-3">
                          <div className="font-medium text-black">
                            {b.customerName}
                          </div>
                          <div className="text-[11px] text-lsp-muted">
                            {b.id}
                          </div>
                        </td>
                        <td className="py-3 text-black">{b.package}</td>
                        <td className="py-3 text-lsp-muted">{fr?.location}</td>
                        <td className="py-3">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="py-3 font-medium text-black">
                          {formatCurrency(b.amount)}
                        </td>
                        <td className="px-5 py-3 text-lsp-muted">
                          {formatDate(b.eventDate)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            className="xl:col-span-2"
            title="Franchise Earnings Split"
            subtitle="Gross revenue distribution"
          >
            <DonutChart
              data={donutData}
              centerLabel={{
                primary: formatCurrency(totalGross),
                secondary: "Gross",
              }}
            />
            <div className="mt-4 rounded-xl border border-lsp-border bg-lsp-surface-2/50 p-3 text-xs text-lsp-muted">
              <span className="font-medium gold-text">Royalty paid:</span>{" "}
              {formatCurrency(totalRoyalty)} • LSP net{" "}
              {formatCurrency(totalGross - totalRoyalty)}
            </div>
          </Card>
        </div>

        {/* Revenue trend */}
        <Card
          title="Revenue Trend"
          subtitle="Last 6 months — gross vs net after royalty"
        >
          <LineChart
            labels={monthlyRevenue.map((m) => m.month)}
            series={[
              {
                name: "Total Revenue",
                color: "#d4af37",
                values: monthlyRevenue.map((m) => m.total),
              },
              {
                name: "Net after royalty",
                color: "#e6e8ee",
                values: monthlyRevenue.map((m) => m.net),
              },
            ]}
            formatValue={(n) =>
              n >= 1000 ? `${Math.round(n / 1000)}k` : String(n)
            }
          />
        </Card>

        {/* Franchise overview cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {franchises.map((fr) => {
            const fb = bookings.filter((b) => b.franchiseId === fr.id);
            const pending = fb.filter((b) => b.status === "pending").length;
            const monthAmt = fb
              .filter((b) => new Date(b.eventDate).getMonth() === 5)
              .reduce((s, b) => s + b.amount, 0);
            const phCount = photographers.filter(
              (p) => p.franchiseId === fr.id && p.status === "active",
            ).length;

            return (
              <FranchiseOverviewCard
                key={fr.id}
                franchise={fr}
                photographers={phCount}
                pending={pending}
                monthlyEarnings={monthAmt}
                onRoyaltyChange={(v) => {
                  setFranchises((arr) =>
                    arr.map((x) =>
                      x.id === fr.id ? { ...x, royaltyPercent: v } : x,
                    ),
                  );
                  toast.success(
                    `Royalty updated to ${v}% for ${fr.name}`,
                  );
                }}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

function FranchiseOverviewCard({
  franchise,
  photographers,
  pending,
  monthlyEarnings,
  onRoyaltyChange,
}: {
  franchise: Franchise;
  photographers: number;
  pending: number;
  monthlyEarnings: number;
  onRoyaltyChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(franchise.royaltyPercent);

  return (
    <div className="overflow-hidden rounded-2xl border border-lsp-border bg-lsp-surface">
      <div className="flex items-start justify-between gap-3 border-b border-lsp-border p-5">
        <div>
          <h3 className="font-display text-xl text-black">{franchise.name}</h3>
          <div className="mt-1 inline-flex items-center gap-1 text-xs text-lsp-muted">
            <MapPin className="h-3 w-3 gold-text" />
            {franchise.location}
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-lsp-border border-b border-lsp-border text-center">
        <div className="p-4">
          <div className="text-2xl font-semibold text-black">
            {photographers}
          </div>
          <div className="mt-1 text-[10px] tracking-wider text-lsp-muted uppercase">
            Active photographers
          </div>
        </div>
        <div className="p-4">
          <div
            className={`text-2xl font-semibold ${pending > 0 ? "text-amber-700" : "text-black"}`}
          >
            {pending}
          </div>
          <div className="mt-1 text-[10px] tracking-wider text-lsp-muted uppercase">
            Pending bookings
          </div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-semibold gold-text">
            {formatCurrency(monthlyEarnings)}
          </div>
          <div className="mt-1 text-[10px] tracking-wider text-lsp-muted uppercase">
            This month
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lsp-muted">Royalty %:</span>
          {editing ? (
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={0}
                max={100}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-16 rounded-xl border border-black/30 bg-lsp-surface-2 px-2 py-1 text-sm text-black focus:outline-none"
              />
              <button
                onClick={() => {
                  onRoyaltyChange(value);
                  setEditing(false);
                }}
                className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                aria-label="Save royalty"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  setValue(franchise.royaltyPercent);
                  setEditing(false);
                }}
                className="grid h-7 w-7 place-items-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                aria-label="Cancel"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="font-semibold gold-text">
                {franchise.royaltyPercent}%
              </span>
              <button
                onClick={() => setEditing(true)}
                className="grid h-6 w-6 place-items-center rounded-xl text-lsp-muted hover:bg-lsp-surface-2 hover:gold-text"
                aria-label="Edit royalty"
              >
                <Pencil className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        <Link href={`/superadmin/dashboard/franchises`}>
          <GoldButton size="sm">
            <TrendingUp className="h-3.5 w-3.5" />
            View Details
          </GoldButton>
        </Link>
      </div>
    </div>
  );
}
