"use client";

import { Download, Check, Pencil, X } from "lucide-react";
import { useMemo, useState } from "react";
import { TopBar } from "@/app/components/admin/TopBar";
import {
  Card,
  GhostButton,
  GoldButton,
} from "@/app/components/admin/Card";
import { StatCard } from "@/app/components/admin/StatCard";
import { StackedBarChart } from "@/app/components/admin/Charts";
import { useToast } from "@/app/components/admin/Toast";
import {
  bookings,
  franchises as initialFranchises,
  monthlyRevenue,
} from "@/lib/mock-data";
import type { Franchise } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function EarningsPage() {
  const [franchises, setFranchises] = useState<Franchise[]>(initialFranchises);
  const [editing, setEditing] = useState<string | null>(null);
  const [editVal, setEditVal] = useState(0);
  const toast = useToast();

  const rows = useMemo(
    () =>
      franchises.map((f) => {
        const fb = bookings.filter(
          (b) => b.franchiseId === f.id && b.status !== "cancelled",
        );
        const gross = fb.reduce((s, b) => s + b.amount, 0);
        const royalty = (gross * f.royaltyPercent) / 100;
        return {
          franchise: f,
          totalBookings: fb.length,
          gross,
          royalty,
          net: gross - royalty,
        };
      }),
    [franchises],
  );

  const totalGross = rows.reduce((s, r) => s + r.gross, 0);
  const totalRoyalty = rows.reduce((s, r) => s + r.royalty, 0);
  const totalNet = rows.reduce((s, r) => s + r.net, 0);

  const exportCsv = () => {
    const header = [
      "Franchise",
      "Royalty %",
      "Total Bookings",
      "Gross Revenue (NPR)",
      "Royalty (NPR)",
      "Net to LSP (NPR)",
    ];
    const lines = rows.map((r) => [
      r.franchise.name,
      r.franchise.royaltyPercent,
      r.totalBookings,
      r.gross,
      r.royalty,
      r.net,
    ]);
    const csv = [header, ...lines]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lsp-earnings.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Earnings CSV downloaded");
  };

  return (
    <>
      <TopBar
        greeting="Earnings"
        subtitle="Revenue, royalty splits, and franchise performance"
      />
      <main className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Revenue"
            value={formatCurrency(totalGross)}
            Icon={Download}
            tone="gold"
          />
          <StatCard
            label="Total Royalty Paid"
            value={formatCurrency(totalRoyalty)}
            Icon={Download}
            tone="amber"
          />
          <StatCard
            label="LSP Net Revenue"
            value={formatCurrency(totalNet)}
            Icon={Download}
            tone="green"
          />
        </div>

        <Card
          title="Per-Franchise Breakdown"
          subtitle="Edit royalty inline to recalculate"
          action={
            <GhostButton size="sm" onClick={exportCsv}>
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </GhostButton>
          }
        >
          <div className="lsp-dark-scrollbar -mx-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-[11px] tracking-wider text-lsp-muted uppercase">
                  <th className="px-5 py-2">Franchise</th>
                  <th className="py-2">Royalty %</th>
                  <th className="py-2">Bookings</th>
                  <th className="py-2">Gross Revenue</th>
                  <th className="py-2">Royalty Amount</th>
                  <th className="px-5 py-2">Net to LSP</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const isEdit = editing === r.franchise.id;
                  return (
                    <tr
                      key={r.franchise.id}
                      className="border-t border-lsp-border/60 hover:bg-lsp-surface-2/60"
                    >
                      <td className="px-5 py-3">
                        <div className="font-medium text-black">
                          {r.franchise.name}
                        </div>
                        <div className="text-[11px] text-lsp-muted">
                          {r.franchise.location}
                        </div>
                      </td>
                      <td className="py-3">
                        {isEdit ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={editVal}
                              onChange={(e) =>
                                setEditVal(Number(e.target.value))
                              }
                              className="w-16 rounded-xl border border-black/30 bg-lsp-surface-2 px-2 py-1 text-sm text-black focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                setFranchises((arr) =>
                                  arr.map((f) =>
                                    f.id === r.franchise.id
                                      ? { ...f, royaltyPercent: editVal }
                                      : f,
                                  ),
                                );
                                setEditing(null);
                                toast.success("Royalty updated");
                              }}
                              className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-100 text-emerald-700"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="grid h-7 w-7 place-items-center rounded-xl bg-red-100 text-red-600"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5">
                            <span className="font-semibold gold-text">
                              {r.franchise.royaltyPercent}%
                            </span>
                            <button
                              onClick={() => {
                                setEditing(r.franchise.id);
                                setEditVal(r.franchise.royaltyPercent);
                              }}
                              className="grid h-6 w-6 place-items-center rounded-xl text-lsp-muted hover:bg-lsp-surface-2 hover:gold-text"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-black">{r.totalBookings}</td>
                      <td className="py-3 text-black">
                        {formatCurrency(r.gross)}
                      </td>
                      <td className="py-3 text-amber-700">
                        {formatCurrency(r.royalty)}
                      </td>
                      <td className="px-5 py-3 font-semibold text-emerald-700">
                        {formatCurrency(r.net)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-lsp-border bg-lsp-surface-2/40">
                  <td className="px-5 py-3 font-medium text-black">Total</td>
                  <td className="py-3" />
                  <td className="py-3 text-black">
                    {rows.reduce((s, r) => s + r.totalBookings, 0)}
                  </td>
                  <td className="py-3 font-semibold text-black">
                    {formatCurrency(totalGross)}
                  </td>
                  <td className="py-3 font-semibold text-amber-700">
                    {formatCurrency(totalRoyalty)}
                  </td>
                  <td className="px-5 py-3 font-bold text-emerald-700">
                    {formatCurrency(totalNet)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          title="Monthly Earnings Breakdown"
          subtitle="Net revenue (gold) + royalty paid (amber)"
        >
          <StackedBarChart
            labels={monthlyRevenue.map((m) => m.month)}
            series={[
              {
                name: "Net to LSP",
                color: "#d4af37",
                values: monthlyRevenue.map((m) => m.net),
              },
              {
                name: "Royalty",
                color: "#f59e0b",
                values: monthlyRevenue.map((m) => m.total - m.net),
              },
            ]}
            formatValue={(n) =>
              n >= 1000 ? `${Math.round(n / 1000)}k` : String(n)
            }
          />
        </Card>

        <div className="flex justify-end">
          <GoldButton onClick={exportCsv}>
            <Download className="h-3.5 w-3.5" />
            Export Full Report
          </GoldButton>
        </div>
      </main>
    </>
  );
}
