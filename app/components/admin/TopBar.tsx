"use client";

import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface TopBarProps {
  greeting: string;
  subtitle?: string;
  notifications?: number;
}

export function TopBar({ greeting, subtitle, notifications = 0 }: TopBarProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <header className="sticky top-0 z-30 border-b border-lsp-border bg-lsp-bg/85 backdrop-blur-md">
      <div className="flex items-center gap-3 px-6 pl-16 py-4 lg:pl-6">
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-2xl text-black sm:text-3xl">
            {greeting}
          </h1>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-lsp-muted sm:text-sm">
              {subtitle}
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-lsp-muted">
              {now ? `${formatDate(now)} • ${timeStr}` : ""}
            </p>
          )}
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-lsp-border bg-white px-4 py-2 lg:flex lg:w-72">
          <Search className="h-4 w-4 text-lsp-muted" />
          <input
            type="text"
            placeholder="Search bookings, customers…"
            className="w-full bg-transparent text-sm text-black placeholder:text-lsp-muted focus:outline-none"
          />
        </div>

        <button
          className="relative rounded-full border border-lsp-border bg-white p-2.5 text-lsp-muted hover:text-black"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full gold-gradient px-1 text-[10px] font-bold text-white">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
