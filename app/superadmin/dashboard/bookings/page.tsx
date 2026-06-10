"use client";

import { TopBar } from "@/app/components/admin/TopBar";
import { Card } from "@/app/components/admin/Card";
import {
  DataTable,
  type Column,
} from "@/app/components/admin/DataTable";
import { StatusBadge } from "@/app/components/admin/Badge";
import { bookings, franchises, photographers } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/lib/types";
import { useState } from "react";

const STATUSES = ["all", "pending", "assigned", "in_progress", "completed"] as const;
type Status = (typeof STATUSES)[number];

export default function AllBookingsPage() {
  const [status, setStatus] = useState<Status>("all");

  const rows = bookings.filter((b) =>
    status === "all" ? true : b.status === status,
  );

  const columns: Column<Booking>[] = [
    {
      key: "id",
      header: "Booking ID",
      sortBy: (r) => r.id,
      cell: (r) => <span className="font-mono text-xs text-black">{r.id}</span>,
    },
    {
      key: "customer",
      header: "Customer",
      sortBy: (r) => r.customerName,
      cell: (r) => (
        <div>
          <div className="font-medium text-black">{r.customerName}</div>
          <div className="text-[11px] text-lsp-muted">{r.customerPhone}</div>
        </div>
      ),
    },
    {
      key: "package",
      header: "Package",
      cell: (r) => (
        <div>
          <div className="text-black">{r.package}</div>
          <div className="text-[11px] text-lsp-muted">{r.location}</div>
        </div>
      ),
    },
    {
      key: "franchise",
      header: "Franchise",
      cell: (r) => (
        <span className="text-lsp-muted">
          {franchises.find((f) => f.id === r.franchiseId)?.location}
        </span>
      ),
    },
    {
      key: "photographer",
      header: "Photographer",
      cell: (r) =>
        r.photographerId ? (
          <span className="text-black">
            {photographers.find((p) => p.id === r.photographerId)?.name ?? "—"}
          </span>
        ) : (
          <span className="text-lsp-muted">—</span>
        ),
    },
    {
      key: "date",
      header: "Event Date",
      sortBy: (r) => new Date(r.eventDate).getTime(),
      cell: (r) => (
        <span className="text-black">{formatDate(r.eventDate)}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortBy: (r) => r.amount,
      cell: (r) => (
        <span className="font-medium gold-text">
          {formatCurrency(r.amount)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <>
      <TopBar
        greeting="All Bookings"
        subtitle="Every booking across all franchises"
        notifications={bookings.filter((b) => b.status === "pending").length}
      />
      <main className="space-y-6 p-6">
        <Card
          title={`${rows.length} bookings`}
          action={
            <div className="flex flex-wrap rounded-2xl border border-lsp-border bg-lsp-surface-2 p-1 text-xs">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-xl px-3 py-1 capitalize transition ${
                    status === s
                      ? "bg-lsp-gold text-white"
                      : "text-lsp-muted hover:text-black"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
          }
        >
          <DataTable<Booking>
            rows={rows}
            columns={columns}
            rowKey={(r) => r.id}
            searchKeys={[
              (r) =>
                `${r.id} ${r.customerName} ${r.package} ${r.location}`,
            ]}
            searchPlaceholder="Search bookings…"
            pageSize={10}
          />
        </Card>
      </main>
    </>
  );
}
