"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { LoginShell } from "@/app/components/admin/LoginShell";
import { demoCredentials, franchises } from "@/lib/mock-data";

export default function FranchiseLoginPage() {
  const [franchiseId, setFranchiseId] = useState(franchises[0].id);

  const cred = useMemo(() => {
    return franchiseId === "fr_ktm"
      ? demoCredentials.franchise_ktm
      : demoCredentials.franchise_pkr;
  }, [franchiseId]);

  return (
    <LoginShell
      key={franchiseId}
      role="franchise"
      entityId={franchiseId}
      displayName={
        franchiseId === "fr_ktm" ? "Bishal Khatri" : "Anjana Gurung"
      }
      imageUrl="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80"
      imageAlt="Photography studio interior"
      tagline="Run Your Studio, Grow With Us"
      badgeLabel="Franchise Portal"
      badgeTone="amber"
      heading="Franchise Login"
      subheading={`Sign in to manage your ${
        franchises.find((f) => f.id === franchiseId)?.location
      } branch`}
      defaultEmail={cred.email}
      demoCredential={cred}
      topExtras={
        <div>
          <label className="mb-1.5 block text-xs font-medium tracking-wider text-lsp-muted uppercase">
            Select Your Branch
          </label>
          <div className="group relative">
            <MapPin className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-lsp-muted group-focus-within:text-black" />
            <select
              value={franchiseId}
              onChange={(e) => setFranchiseId(e.target.value)}
              className="w-full appearance-none rounded-full border border-lsp-border bg-lsp-surface-2 py-2.5 pr-3 pl-10 text-sm text-black focus:border-black focus:bg-white focus:outline-none"
            >
              {franchises.map((f) => (
                <option key={f.id} value={f.id}>
                  LSP {f.location}
                </option>
              ))}
            </select>
          </div>
        </div>
      }
      belowLinks={
        <Link
          href="/superadmin/login"
          className="font-medium text-black hover:text-lsp-gold-deep"
        >
          ← Back to Super Admin Login
        </Link>
      }
    />
  );
}
