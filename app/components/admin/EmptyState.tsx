import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-lsp-border bg-lsp-surface px-6 py-14 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl gold-gradient text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-4 font-display text-xl text-black">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-lsp-muted">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
