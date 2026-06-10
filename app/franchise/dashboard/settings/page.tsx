"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { TopBar } from "@/app/components/admin/TopBar";
import { Card, GoldButton } from "@/app/components/admin/Card";
import { useToast } from "@/app/components/admin/Toast";
import { franchises } from "@/lib/mock-data";

const FRANCHISE_ID = "fr_ktm";

export default function FranchiseSettingsPage() {
  const me = franchises.find((f) => f.id === FRANCHISE_ID)!;
  const [form, setForm] = useState({
    name: me.name,
    address: me.address,
    contact: me.contact,
    email: me.email,
  });
  const toast = useToast();

  return (
    <>
      <TopBar
        greeting="Settings"
        subtitle="Update your branch details"
      />
      <main className="max-w-2xl space-y-6 p-6">
        <Card title="Branch Information">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Settings saved");
            }}
            className="space-y-4"
          >
            {[
              { key: "name", label: "Franchise Name" },
              { key: "address", label: "Address" },
              { key: "contact", label: "Contact" },
              { key: "email", label: "Email" },
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
            <div className="flex items-center justify-between rounded-xl border border-lsp-border bg-lsp-surface-2 p-4">
              <div>
                <div className="text-sm font-medium text-black">
                  Royalty Rate
                </div>
                <div className="text-[11px] text-lsp-muted">
                  Set by Super Admin
                </div>
              </div>
              <div className="font-display text-2xl gold-text">
                {me.royaltyPercent}%
              </div>
            </div>
            <div className="flex justify-end">
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
