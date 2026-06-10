import Link from "next/link";
import { LoginShell } from "@/app/components/admin/LoginShell";
import { demoCredentials } from "@/lib/mock-data";

export default function SuperAdminLoginPage() {
  return (
    <LoginShell
      role="superadmin"
      displayName="Riya Sharma"
      imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
      imageAlt="Elegant wedding ceremony"
      tagline="Capturing Moments, Managing Excellence"
      badgeLabel="Super Admin"
      badgeTone="gold"
      heading="Welcome Back"
      subheading="Little Sweet Photography — Control Center"
      defaultEmail={demoCredentials.superadmin.email}
      demoCredential={demoCredentials.superadmin}
      belowLinks={
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/franchise/login"
            className="font-medium text-black hover:text-amber-700"
          >
            Franchise Login →
          </Link>
          <span className="text-lsp-border-strong">|</span>
          <Link
            href="/photographer/login"
            className="font-medium text-black hover:text-sky-700"
          >
            Photographer Login →
          </Link>
        </div>
      }
    />
  );
}
