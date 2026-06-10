"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { Card, GoldButton } from "@/app/components/admin/Card";
import { Pill } from "@/app/components/admin/Badge";
import { useToast } from "@/app/components/admin/Toast";
import { photographers } from "@/lib/mock-data";
import { initials } from "@/lib/utils";

const PHOTOGRAPHER_ID = "ph_001";

export default function PhotographerProfilePage() {
  const me = photographers.find((p) => p.id === PHOTOGRAPHER_ID)!;
  const [form, setForm] = useState({
    name: me.name,
    email: me.email,
    phone: me.phone,
    city: me.city,
  });
  const toast = useToast();

  return (
    <>
      <TopBar greeting="Profile" subtitle="Manage your account" />
      <main className="max-w-3xl space-y-6 p-6">
        <Card title="Account Details">
          <div className="mb-5 flex items-center gap-4">
            <div
              className="grid h-16 w-16 place-items-center rounded-2xl text-xl font-semibold text-black"
              style={{ background: me.avatarColor }}
            >
              {initials(me.name)}
            </div>
            <div>
              <div className="font-display text-xl text-black">{me.name}</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {me.specializations.map((s) => (
                  <Pill key={s} tone="blue">
                    {s}
                  </Pill>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile saved");
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              { key: "name", label: "Full Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "city", label: "City" },
            ].map((f) => (
              <div key={f.key}>
                <label className="mb-1 block text-xs tracking-wider text-lsp-muted uppercase">
                  {f.label}
                </label>
                <input
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  className="w-full rounded-2xl border border-lsp-border bg-lsp-surface-2 px-3 py-2.5 text-sm text-black focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none"
                />
              </div>
            ))}
            <div className="sm:col-span-2 flex justify-end">
              <GoldButton type="submit">
                <Save className="h-4 w-4" />
                Save Changes
              </GoldButton>
            </div>
          </form>
        </Card>
      </main>
    </>
  );
}
