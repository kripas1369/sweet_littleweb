import Link from "next/link";
import { LoginShell } from "@/app/components/admin/LoginShell";
import { demoCredentials } from "@/lib/mock-data";

export default function PhotographerLoginPage() {
  return (
    <LoginShell
      role="photographer"
      entityId="ph_001"
      displayName="Aarav Shrestha"
      imageUrl="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80"
      imageAlt="Photographer at work behind the scenes"
      tagline="Behind Every Frame, A Story"
      badgeLabel="Photographer Portal"
      badgeTone="blue"
      heading="Photographer Login"
      subheading="Access your assignments and portfolio"
      defaultEmail={demoCredentials.photographer.email}
      demoCredential={demoCredentials.photographer}
      belowLinks={
        <div className="space-y-2">
          <div>
            Not registered yet?{" "}
            <Link
              href="/photographer"
              className="font-medium text-black hover:text-sky-700"
            >
              Join as Photographer →
            </Link>
          </div>
          <div>
            <Link
              href="/superadmin/login"
              className="font-medium text-black hover:text-lsp-gold-deep"
            >
              ← Back to Super Admin
            </Link>
          </div>
        </div>
      }
    />
  );
}
