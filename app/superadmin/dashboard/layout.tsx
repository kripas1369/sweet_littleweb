"use client";

import {
  Building2,
  Calendar,
  Camera,
  LayoutDashboard,
  TrendingUp,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { Sidebar, AdminShell } from "@/app/components/admin/Sidebar";
import { bookings } from "@/lib/mock-data";

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  const items = [
    { href: "/superadmin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    {
      href: "/superadmin/dashboard/franchises",
      label: "Franchises",
      Icon: Building2,
    },
    {
      href: "/superadmin/dashboard/bookings",
      label: "All Bookings",
      Icon: Calendar,
      badge: pendingCount,
    },
    {
      href: "/superadmin/dashboard/photographers",
      label: "Photographers",
      Icon: Camera,
    },
    {
      href: "/superadmin/dashboard/earnings",
      label: "Earnings",
      Icon: TrendingUp,
    },
    {
      href: "/superadmin/dashboard/users",
      label: "Users",
      Icon: Users,
    },
  ];

  return (
    <AdminShell>
      <Sidebar
        brand="Super Admin"
        items={items}
        user={{
          name: "Riya Sharma",
          tag: "Super Admin",
          subtitle: "admin@lsponestop.com",
        }}
        accent="gold"
      />
      {children}
    </AdminShell>
  );
}
