"use client";

import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  sortBy?: (row: T) => string | number;
  className?: string;
  width?: string;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T | ((row: T) => string))[];
  pageSize?: number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  toolbar?: ReactNode;
  expandRender?: (row: T) => ReactNode;
  rowKey: (row: T) => string;
}

export function DataTable<T>({
  rows,
  columns,
  searchKeys,
  pageSize = 10,
  emptyMessage = "No records to display.",
  searchPlaceholder = "Search…",
  toolbar,
  expandRender,
  rowKey,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim() || !searchKeys?.length) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      searchKeys.some((k) => {
        const val =
          typeof k === "function" ? k(row) : (row as Record<string, unknown>)[k as string];
        return String(val ?? "")
          .toLowerCase()
          .includes(q);
      }),
    );
  }, [rows, query, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortBy) return filtered;
    const arr = [...filtered].sort((a, b) => {
      const va = col.sortBy!(a);
      const vb = col.sortBy!(b);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir, columns]);

  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pages);
  const start = (safePage - 1) * pageSize;
  const visible = sorted.slice(start, start + pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-lsp-border bg-lsp-surface lsp-card-shadow">
      {(searchKeys?.length || toolbar) && (
        <div className="flex flex-wrap items-center gap-3 border-b border-lsp-border p-4">
          {searchKeys?.length ? (
            <div className="flex flex-1 items-center gap-2 rounded-full border border-lsp-border bg-lsp-surface-2 px-4 py-2">
              <Search className="h-4 w-4 text-lsp-muted" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-sm text-black placeholder:text-lsp-muted focus:outline-none"
              />
            </div>
          ) : (
            <div className="flex-1" />
          )}
          {toolbar}
        </div>
      )}

      <div className="lsp-dark-scrollbar overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-lsp-border bg-lsp-surface-2/60 text-[11px] font-semibold tracking-wider text-lsp-muted uppercase">
              {expandRender && <th className="w-8 px-3" />}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 whitespace-nowrap ${col.className ?? ""}`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.sortBy ? (
                    <button
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-black"
                    >
                      {col.header}
                      <ArrowUpDown className="h-3 w-3 opacity-60" />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (expandRender ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-lsp-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
            {visible.map((row) => {
              const k = rowKey(row);
              const isOpen = expanded === k;
              return (
                <Row
                  key={k}
                  row={row}
                  columns={columns}
                  expanded={isOpen}
                  onToggle={() => setExpanded(isOpen ? null : k)}
                  expandRender={expandRender}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between border-t border-lsp-border px-4 py-3 text-xs text-lsp-muted">
          <div>
            Showing {start + 1}–{Math.min(start + pageSize, total)} of {total}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="rounded-full border border-lsp-border bg-white p-1.5 hover:text-black disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="px-2 font-semibold text-black">
              {safePage} / {pages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={safePage === pages}
              className="rounded-full border border-lsp-border bg-white p-1.5 hover:text-black disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row<T>({
  row,
  columns,
  expanded,
  onToggle,
  expandRender,
}: {
  row: T;
  columns: Column<T>[];
  expanded: boolean;
  onToggle: () => void;
  expandRender?: (row: T) => ReactNode;
}) {
  return (
    <>
      <tr className="border-b border-lsp-border/60 transition hover:bg-lsp-surface-2/60">
        {expandRender && (
          <td className="px-3 py-3 align-middle">
            <button
              onClick={onToggle}
              className="rounded-full p-1 text-lsp-muted hover:bg-lsp-surface-2 hover:text-black"
              aria-label={expanded ? "Collapse row" : "Expand row"}
            >
              <ChevronRight
                className={`h-4 w-4 transition ${expanded ? "rotate-90" : ""}`}
              />
            </button>
          </td>
        )}
        {columns.map((col) => (
          <td
            key={col.key}
            className={`px-4 py-3 align-middle whitespace-nowrap ${col.className ?? ""}`}
          >
            {col.cell(row)}
          </td>
        ))}
      </tr>
      {expandRender && expanded && (
        <tr className="bg-lsp-surface-2/60">
          <td
            colSpan={columns.length + 1}
            className="border-b border-lsp-border/60 px-6 py-4"
          >
            {expandRender(row)}
          </td>
        </tr>
      )}
    </>
  );
}
