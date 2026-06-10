"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { Card, GhostButton } from "@/app/components/admin/Card";
import {
  DataTable,
  type Column,
} from "@/app/components/admin/DataTable";
import { StatusBadge } from "@/app/components/admin/Badge";
import { useToast } from "@/app/components/admin/Toast";
import {
  bookings as initialBookings,
} from "@/lib/mock-data";
import type { Booking } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

const PHOTOGRAPHER_ID = "ph_001";

export default function PhotographerAssignmentsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const toast = useToast();

  const rows = bookings.filter((b) => b.photographerId === PHOTOGRAPHER_ID);

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

  const columns: Column<Booking>[] = [
    {
      key: "id",
      header: "Booking",
      cell: (r) => <span className="font-mono text-xs text-black">{r.id}</span>,
    },
    {
      key: "customer",
      header: "Customer",
      sortBy: (r) => r.customerName,
      cell: (r) => <span className="text-black">{r.customerName}</span>,
    },
    {
      key: "package",
      header: "Package",
      cell: (r) => <span className="text-black">{r.package}</span>,
    },
    {
      key: "date",
      header: "Event Date",
      sortBy: (r) => new Date(r.eventDate).getTime(),
      cell: (r) => (
        <span className="text-lsp-muted">{formatDate(r.eventDate)}</span>
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
    {
      key: "action",
      header: "Action",
      cell: (r) =>
        r.status === "assigned" ? (
          <GhostButton
            size="sm"
            onClick={() => updateStatus(r.id, "in_progress")}
          >
            Start
          </GhostButton>
        ) : r.status === "in_progress" ? (
          <button
            onClick={() => updateStatus(r.id, "completed")}
            className="inline-flex items-center gap-1 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-400/20"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Complete
          </button>
        ) : (
          <span className="text-xs text-emerald-700">Done</span>
        ),
    },
  ];

  return (
    <>
      <TopBar
        greeting="My Assignments"
        subtitle="All bookings assigned to you"
      />
      <main className="space-y-6 p-6">
        <Card title={`${rows.length} assignments`}>
          <DataTable<Booking>
            rows={rows}
            columns={columns}
            rowKey={(r) => r.id}
            searchKeys={[(r) => `${r.id} ${r.customerName} ${r.package}`]}
            searchPlaceholder="Search assignments…"
          />
        </Card>
      </main>
    </>
  );
}
