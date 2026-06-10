"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { clearSession } from "@/lib/auth";
import { cn, initials } from "@/lib/utils";

export interface SidebarItem {
  href: string;
  label: string;
  Icon: LucideIcon;
  badge?: number;
}

interface SidebarProps {
  brand: string;
  items: SidebarItem[];
  user: { name: string; tag: string; subtitle?: string };
  accent?: "gold" | "amber" | "blue";
}

const accentMap = {
  gold: {
    active: "text-black",
    bar: "gold-gradient",
    tagBg: "border-transparent text-white gold-gradient",
    pill: "bg-lsp-surface-2 text-black",
  },
  amber: {
    active: "text-black",
    bar: "bg-amber-500",
    tagBg: "border-amber-300 text-amber-700 bg-amber-50",
    pill: "bg-lsp-surface-2 text-black",
  },
  blue: {
    active: "text-black",
    bar: "bg-sky-500",
    tagBg: "border-sky-300 text-sky-700 bg-sky-50",
    pill: "bg-lsp-surface-2 text-black",
  },
};

export function Sidebar({
  brand,
  items,
  user,
  accent = "gold",
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const acc = accentMap[accent];

  const handleLogout = () => {
    clearSession();
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === pathname) return true;
    if (pathname?.startsWith(href + "/")) return true;
    return false;
  };

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-40 rounded-full border border-lsp-border bg-white p-2 text-black shadow-sm lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-lsp-border bg-white transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl gold-gradient text-white font-display text-lg">
              L
            </div>
            <div>
              <div className="font-display text-lg leading-tight text-black">
                LSP
              </div>
              <div className="text-[10px] tracking-[0.18em] gold-text font-semibold uppercase">
                {brand}
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-lsp-muted hover:bg-lsp-surface-2 hover:text-black lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="lsp-dark-scrollbar mt-4 flex-1 overflow-y-auto px-3 pb-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm font-medium tracking-tight transition",
                      active
                        ? `${acc.active} bg-lsp-surface-2`
                        : "text-lsp-muted hover:bg-lsp-surface-2 hover:text-black",
                    )}
                  >
                    {active && (
                      <span
                        className={`absolute top-2 bottom-2 left-0 w-0.5 rounded-r ${acc.bar}`}
                      />
                    )}
                    <item.Icon
                      className={cn(
                        "h-[18px] w-[18px] shrink-0",
                        active ? "text-black" : "text-lsp-muted group-hover:text-black",
                      )}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="rounded-full gold-gradient px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-lsp-border px-3 py-3">
          <div className="flex items-center gap-3 rounded-2xl bg-lsp-surface-2 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full gold-gradient font-semibold text-white">
              {initials(user.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-black">
                {user.name}
              </div>
              <div
                className={`mt-0.5 inline-block rounded-full border px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider ${acc.tagBg}`}
              >
                {user.tag}
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="rounded-full p-2 text-lsp-muted hover:bg-white hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-lsp-bg text-black lg:pl-[260px]">
      {children}
    </div>
  );
}
