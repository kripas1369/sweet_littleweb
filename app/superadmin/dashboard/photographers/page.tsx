"use client";

import { Star } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { Card } from "@/app/components/admin/Card";
import {
  DataTable,
  type Column,
} from "@/app/components/admin/DataTable";
import { Pill } from "@/app/components/admin/Badge";
import { franchises, photographers } from "@/lib/mock-data";
import { computeQualityScore, initials } from "@/lib/utils";
import type { Photographer } from "@/lib/types";

export default function PhotographersPage() {
  const enriched = photographers.map((p) => ({
    ...p,
    qualityScore: computeQualityScore(p),
  }));

  const columns: Column<Photographer>[] = [
    {
      key: "name",
      header: "Photographer",
      sortBy: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-black"
            style={{ background: r.avatarColor }}
          >
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
      key: "city",
      header: "City",
      cell: (r) => <span className="text-black">{r.city}</span>,
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
      key: "specialties",
      header: "Specializations",
      cell: (r) => (
        <div className="flex flex-wrap gap-1">
          {r.specializations.slice(0, 3).map((s) => (
            <Pill key={s} tone="muted">
              {s}
            </Pill>
          ))}
          {r.specializations.length > 3 && (
            <Pill tone="muted">+{r.specializations.length - 3}</Pill>
          )}
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      sortBy: (r) => r.rating,
      cell: (r) => (
        <div className="inline-flex items-center gap-1 text-black">
          <Star className="h-3.5 w-3.5 fill-lsp-gold gold-text" />
          {r.rating.toFixed(1)}
        </div>
      ),
    },
    {
      key: "jobs",
      header: "Jobs",
      sortBy: (r) => r.completedJobs,
      cell: (r) => <span className="text-black">{r.completedJobs}</span>,
    },
    {
      key: "score",
      header: "Quality",
      sortBy: (r) => computeQualityScore(r),
      cell: (r) => {
        const s = computeQualityScore(r);
        const tone = s >= 70 ? "green" : s >= 40 ? "amber" : "red";
        return <Pill tone={tone}>{s.toFixed(1)}</Pill>;
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (r) =>
        r.status === "active" ? (
          <Pill tone="green">Active</Pill>
        ) : (
          <Pill tone="amber">Pending</Pill>
        ),
    },
  ];

  return (
    <>
      <TopBar
        greeting="Photographers"
        subtitle="All photographers across LSP network"
      />
      <main className="space-y-6 p-6">
        <Card title={`${photographers.length} photographers`}>
          <DataTable<Photographer>
            rows={enriched}
            columns={columns}
            rowKey={(r) => r.id}
            searchKeys={[(r) => `${r.name} ${r.email} ${r.city}`]}
            searchPlaceholder="Search by name, email, city…"
          />
        </Card>
      </main>
    </>
  );
}
