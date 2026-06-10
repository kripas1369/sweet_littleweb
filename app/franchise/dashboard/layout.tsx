"use client";

import {
  Calendar,
  Camera,
  LayoutDashboard,
  Settings,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { Sidebar, AdminShell } from "@/app/components/admin/Sidebar";
import { bookings } from "@/lib/mock-data";

export default function FranchiseDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Demo: assume Kathmandu franchise. (In a real app, session.entityId would drive this.)
  const myPending = bookings.filter(
    (b) => b.franchiseId === "fr_ktm" && b.status === "pending",
  ).length;

  const items = [
    { href: "/franchise/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    {
      href: "/franchise/dashboard/bookings",
      label: "My Bookings",
      Icon: Calendar,
      badge: myPending,
    },
    {
      href: "/franchise/dashboard/photographers",
      label: "My Photographers",
      Icon: Camera,
    },
    {
      href: "/franchise/dashboard/earnings",
      label: "My Earnings",
      Icon: Wallet,
    },
    {
      href: "/franchise/dashboard/settings",
      label: "Settings",
      Icon: Settings,
    },
  ];

  return (
    <AdminShell>
      <Sidebar
        brand="Franchise"
        items={items}
        user={{
          name: "Bishal Khatri",
          tag: "Franchise",
          subtitle: "kathmandu@lsponestop.com",
        }}
        accent="amber"
      />
      {children}
    </AdminShell>
  );
}
