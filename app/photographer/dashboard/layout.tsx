"use client";

import {
  Calendar,
  Image as ImageIcon,
  LayoutDashboard,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { Sidebar, AdminShell } from "@/app/components/admin/Sidebar";
import { bookings } from "@/lib/mock-data";

const PHOTOGRAPHER_ID = "ph_001";

export default function PhotographerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const newAssignments = bookings.filter(
    (b) =>
      b.photographerId === PHOTOGRAPHER_ID &&
      b.status === "assigned" &&
      !b.acknowledged,
  ).length;

  const items = [
    { href: "/photographer/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    {
      href: "/photographer/dashboard/assignments",
      label: "My Assignments",
      Icon: Calendar,
      badge: newAssignments,
    },
    {
      href: "/photographer/dashboard/portfolio",
      label: "My Portfolio",
      Icon: ImageIcon,
    },
    {
      href: "/photographer/dashboard/profile",
      label: "Profile",
      Icon: User,
    },
  ];

  return (
    <AdminShell>
      <Sidebar
        brand="Photographer"
        items={items}
        user={{
          name: "Aarav Shrestha",
          tag: "Photographer",
          subtitle: "aarav@lsp.com",
        }}
        accent="blue"
      />
      {children}
    </AdminShell>
  );
}
