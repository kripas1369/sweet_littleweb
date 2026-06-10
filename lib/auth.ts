"use client";

import type { AuthSession, Role } from "./types";

const KEY = "lsp_session_v1";

export function saveSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export const dashboardPath: Record<Role, string> = {
  superadmin: "/superadmin/dashboard",
  franchise: "/franchise/dashboard",
  photographer: "/photographer/dashboard",
};
