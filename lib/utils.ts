import type { Photographer, Booking } from "./types";

export function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  return `NPR ${formatted}`;
}

export function formatDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateTime(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  const h = d.getHours() % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${formatDate(d)} • ${h}:${m} ${ampm}`;
}

export function computeQualityScore(p: Photographer): number {
  const ratingScore = (p.rating / 5) * 50;
  const jobScore = Math.min(p.completedJobs / 50, 1) * 30;
  const responseScore = (p.responseRate / 100) * 20;
  return Math.round((ratingScore + jobScore + responseScore) * 10) / 10;
}

export function rankPhotographersForBooking(
  photographers: Photographer[],
  booking: Booking,
): Photographer[] {
  return photographers
    .filter(
      (p) => p.franchiseId === booking.franchiseId && p.status === "active",
    )
    .map((p) => ({ ...p, qualityScore: computeQualityScore(p) }))
    .sort((a, b) => (b.qualityScore ?? 0) - (a.qualityScore ?? 0));
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function relativeFromNow(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(d);
}
