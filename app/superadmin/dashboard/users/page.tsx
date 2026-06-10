"use client";

import { TopBar } from "@/app/components/admin/TopBar";
import { Card } from "@/app/components/admin/Card";
import {
  DataTable,
  type Column,
} from "@/app/components/admin/DataTable";
import { Pill } from "@/app/components/admin/Badge";
import { customers } from "@/lib/mock-data";
import { formatDate, initials } from "@/lib/utils";
import type { Customer } from "@/lib/types";

export default function UsersPage() {
  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Customer",
      sortBy: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-lsp-surface-2 text-sm font-semibold gold-text ring-1 ring-black/10">
            {initials(r.name)}
          </div>
          <div>
            <div className="font-medium text-black">{r.name}</div>
            <div className="text-[11px] text-lsp-muted">{r.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (r) => <span className="text-black">{r.phone}</span>,
    },
    {
      key: "bookings",
      header: "Bookings",
      sortBy: (r) => r.totalBookings,
      cell: (r) => <Pill tone="gold">{r.totalBookings} total</Pill>,
    },
    {
      key: "joined",
      header: "Joined",
      sortBy: (r) => new Date(r.joinedAt).getTime(),
      cell: (r) => (
        <span className="text-lsp-muted">{formatDate(r.joinedAt)}</span>
      ),
    },
  ];

  return (
    <>
      <TopBar
        greeting="Customers"
        subtitle="All registered customers across the platform"
      />
      <main className="space-y-6 p-6">
        <Card title={`${customers.length} customers`}>
          <DataTable<Customer>
            rows={customers}
            columns={columns}
            rowKey={(r) => r.id}
            searchKeys={[(r) => `${r.name} ${r.email} ${r.phone}`]}
            searchPlaceholder="Search customers…"
          />
        </Card>
      </main>
    </>
  );
}
