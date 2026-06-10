"use client";

import { useMemo, useState } from "react";
import { Check, Pencil, Plus, X } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import {
  DataTable,
  type Column,
} from "@/app/components/admin/DataTable";
import {
  Card,
  GhostButton,
  GoldButton,
} from "@/app/components/admin/Card";
import { Modal } from "@/app/components/admin/Modal";
import { Pill, StatusBadge } from "@/app/components/admin/Badge";
import { useToast } from "@/app/components/admin/Toast";
import {
  bookings,
  franchises as initialFranchises,
  photographers,
} from "@/lib/mock-data";
import type { Franchise } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

type Filter = "all" | "active" | "inactive";

export default function FranchisesPage() {
  const [franchises, setFranchises] = useState<Franchise[]>(initialFranchises);
  const [filter, setFilter] = useState<Filter>("all");
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [createOpen, setCreateOpen] = useState(false);
  const toast = useToast();

  const rows = useMemo(() => {
    return franchises.filter((f) =>
      filter === "all" ? true : f.status === filter,
    );
  }, [franchises, filter]);

  const saveRoyalty = (id: string, value: number) => {
    setFranchises((arr) =>
      arr.map((f) => (f.id === id ? { ...f, royaltyPercent: value } : f)),
    );
    setEditing(null);
    toast.success(`Royalty updated to ${value}%`);
  };

  const columns: Column<Franchise>[] = [
    {
      key: "name",
      header: "Franchise",
      sortBy: (r) => r.name,
      cell: (r) => (
        <div>
          <div className="font-medium text-black">{r.name}</div>
          <div className="text-[11px] text-lsp-muted">{r.email}</div>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      cell: (r) => <span className="text-black">{r.location}</span>,
    },
    {
      key: "royalty",
      header: "Royalty %",
      cell: (r) => {
        const isEdit = editing === r.id;
        return isEdit ? (
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min={0}
              max={100}
              value={editValue}
              onChange={(e) => setEditValue(Number(e.target.value))}
              className="w-16 rounded-xl border border-black/30 bg-lsp-surface-2 px-2 py-1 text-sm text-black focus:outline-none"
            />
            <button
              onClick={() => saveRoyalty(r.id, editValue)}
              className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              aria-label="Save"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setEditing(null)}
              className="grid h-7 w-7 place-items-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
              aria-label="Cancel"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="font-semibold gold-text">
              {r.royaltyPercent}%
            </span>
            <button
              onClick={() => {
                setEditing(r.id);
                setEditValue(r.royaltyPercent);
              }}
              className="grid h-6 w-6 place-items-center rounded-xl text-lsp-muted hover:bg-lsp-surface-2 hover:gold-text"
              aria-label="Edit"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </div>
        );
      },
    },
    {
      key: "bookings",
      header: "Bookings",
      sortBy: (r) => bookings.filter((b) => b.franchiseId === r.id).length,
      cell: (r) => (
        <span className="text-black">
          {bookings.filter((b) => b.franchiseId === r.id).length}
        </span>
      ),
    },
    {
      key: "earnings",
      header: "Total Earnings",
      sortBy: (r) =>
        bookings
          .filter((b) => b.franchiseId === r.id && b.status !== "cancelled")
          .reduce((s, b) => s + b.amount, 0),
      cell: (r) => {
        const earnings = bookings
          .filter((b) => b.franchiseId === r.id && b.status !== "cancelled")
          .reduce((s, b) => s + b.amount, 0);
        return (
          <span className="font-medium text-black">
            {formatCurrency(earnings)}
          </span>
        );
      },
    },
    {
      key: "photographers",
      header: "Photographers",
      cell: (r) => {
        const c = photographers.filter((p) => p.franchiseId === r.id).length;
        return <Pill tone="blue">{c} active</Pill>;
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (r) =>
        r.status === "active" ? (
          <Pill tone="green">Active</Pill>
        ) : (
          <Pill tone="muted">Inactive</Pill>
        ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-1">
          <GhostButton size="sm">View</GhostButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <TopBar
        greeting="Franchises"
        subtitle="Manage your studios and royalty splits"
      />

      <main className="space-y-6 p-6">
        <Card
          title="All Franchises"
          subtitle={`${franchises.length} total`}
          action={
            <div className="flex items-center gap-2">
              <div className="flex rounded-2xl border border-lsp-border bg-lsp-surface-2 p-1 text-xs">
                {(["all", "active", "inactive"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-xl px-3 py-1 capitalize transition ${
                      filter === f
                        ? "bg-lsp-gold text-white"
                        : "text-lsp-muted hover:text-black"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <GoldButton size="sm" onClick={() => setCreateOpen(true)}>
                <Plus className="h-3.5 w-3.5" />
                Add Franchise
              </GoldButton>
            </div>
          }
        >
          <DataTable<Franchise>
            rows={rows}
            columns={columns}
            rowKey={(r) => r.id}
            searchKeys={[(r) => `${r.name} ${r.location} ${r.email}`]}
            searchPlaceholder="Search by name, location…"
            expandRender={(r) => {
              const last = bookings
                .filter((b) => b.franchiseId === r.id)
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .slice(0, 3);
              return (
                <div>
                  <div className="mb-3 text-xs tracking-wider text-lsp-muted uppercase">
                    Last 3 bookings
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    {last.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-xl border border-lsp-border bg-lsp-bg p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-black">{b.id}</div>
                          <StatusBadge status={b.status} />
                        </div>
                        <div className="mt-1 text-xs text-lsp-muted">
                          {b.package}
                        </div>
                        <div className="mt-1 text-[11px] text-lsp-muted">
                          {b.customerName} • {formatDate(b.eventDate)}
                        </div>
                        <div className="mt-2 text-sm font-medium gold-text">
                          {formatCurrency(b.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          />
        </Card>
      </main>

      <CreateFranchiseModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(f) => {
          setFranchises((arr) => [...arr, f]);
          setCreateOpen(false);
          toast.success(`${f.name} added`);
        }}
      />
    </>
  );
}

function CreateFranchiseModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (f: Franchise) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    address: "",
    contact: "",
    royaltyPercent: 15,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      id: `fr_${Date.now()}`,
      name: form.name || "New Franchise",
      location: form.location || "—",
      address: form.address || "—",
      contact: form.contact || "—",
      email: `${form.location.toLowerCase() || "branch"}@lsponestop.com`,
      royaltyPercent: form.royaltyPercent,
      status: "active",
      createdAt: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Franchise"
      subtitle="Create a new franchise branch"
    >
      <form onSubmit={submit} className="space-y-4">
        {[
          { key: "name", label: "Franchise Name", placeholder: "LSP Biratnagar" },
          { key: "location", label: "Location", placeholder: "Biratnagar" },
          { key: "address", label: "Address", placeholder: "Main Road…" },
          { key: "contact", label: "Contact Number", placeholder: "+977 …" },
        ].map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-xs tracking-wider text-lsp-muted uppercase">
              {f.label}
            </label>
            <input
              value={form[f.key as keyof typeof form] as string}
              onChange={(e) =>
                setForm({ ...form, [f.key]: e.target.value })
              }
              placeholder={f.placeholder}
              className="w-full rounded-2xl border border-lsp-border bg-lsp-surface-2 px-3 py-2.5 text-sm text-black placeholder:text-lsp-muted focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none"
            />
          </div>
        ))}
        <div>
          <label className="mb-1 block text-xs tracking-wider text-lsp-muted uppercase">
            Royalty %
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={form.royaltyPercent}
            onChange={(e) =>
              setForm({ ...form, royaltyPercent: Number(e.target.value) })
            }
            className="w-32 rounded-2xl border border-lsp-border bg-lsp-surface-2 px-3 py-2.5 text-sm text-black focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <GoldButton type="submit">Create</GoldButton>
        </div>
      </form>
    </Modal>
  );
}
