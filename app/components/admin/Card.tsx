import type { ReactNode } from "react";

interface CardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`rounded-3xl border border-lsp-border bg-lsp-surface lsp-card-shadow ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 border-b border-lsp-border px-5 py-4">
          <div>
            {title && (
              <h3 className="font-display text-lg text-black">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-lsp-muted">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function GoldButton({
  children,
  type = "button",
  onClick,
  disabled,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sz =
    size === "sm"
      ? "px-4 py-2 text-xs"
      : size === "lg"
        ? "px-7 py-3.5 text-sm"
        : "px-5 py-2.5 text-sm";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight text-white gold-gradient shadow-[0_8px_24px_-10px_rgba(244,114,182,0.55)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 ${sz} ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md";
}) {
  const sz = size === "sm" ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-lsp-border bg-white text-black transition hover:border-black hover:bg-black hover:text-white ${sz} ${className}`}
    >
      {children}
    </button>
  );
}
