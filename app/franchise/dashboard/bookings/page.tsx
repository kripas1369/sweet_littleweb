"use client";

import { useMemo, useState } from "react";
import { TopBar } from "@/app/components/admin/TopBar";
import { Card, GoldButton } from "@/app/components/admin/Card";
import {
  DataTable,
  type Column,
} from "@/app/components/admin/DataTable";
import { StatusBadge } from "@/app/components/admin/Badge";
import { AssignPhotographerModal } from "@/app/components/admin/AssignPhotographerModal";
import { useToast } from "@/app/components/admin/Toast";
import {
  bookings as initialBookings,
  photographers,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/lib/types";

const FRANCHISE_ID = "fr_ktm";

export default function FranchiseBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [assign, setAssign] = useState<Booking | null>(null);
  const toast = useToast();

  const rows = useMemo(
    () => bookings.filter((b) => b.franchiseId === FRANCHISE_ID),
    [bookings],
  );

  const columns: Column<Booking>[] = [
    {
      key: "id",
      header: "Booking",
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
    {
      key: "action",
      header: "Action",
      cell: (r) =>
        r.status === "pending" ? (
          <GoldButton size="sm" onClick={() => setAssign(r)}>
            Assign Photographer
          </GoldButton>
        ) : r.photographerId ? (
          <span className="text-xs text-lsp-muted">
            {photographers.find((p) => p.id === r.photographerId)?.name}
          </span>
        ) : (
          <span className="text-xs text-lsp-muted">—</span>
        ),
    },
  ];

  return (
    <>
      <TopBar
        greeting="My Bookings"
        subtitle="All bookings for your franchise"
      />
      <main className="space-y-6 p-6">
        <Card title={`${rows.length} bookings`}>
          <DataTable<Booking>
            rows={rows}
            columns={columns}
            rowKey={(r) => r.id}
            searchKeys={[
              (r) => `${r.id} ${r.customerName} ${r.package}`,
            ]}
            searchPlaceholder="Search bookings…"
          />
        </Card>
      </main>

      <AssignPhotographerModal
        booking={assign}
        photographers={photographers}
        allBookings={bookings}
        onClose={() => setAssign(null)}
        onAssign={(p) => {
          if (!assign) return;
          setBookings((arr) =>
            arr.map((b) =>
              b.id === assign.id
                ? { ...b, photographerId: p.id, status: "assigned" }
                : b,
            ),
          );
          toast.success(`Assigned ${p.name} to ${assign.id}`);
          setAssign(null);
        }}
      />
    </>
  );
}
