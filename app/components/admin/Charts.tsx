"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface DonutSlice {
  label: string;
  value: number;
  color: string;
  meta?: string;
}

const GRID = "#e5e5ea";
const AXIS_TEXT = "#86868B";
const DOT_BG = "#ffffff";

export function DonutChart({
  data,
  size = 200,
  thickness = 28,
  centerLabel,
}: {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  centerLabel?: { primary: string; secondary: string };
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - thickness / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:gap-8">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#f0f0f3"
            strokeWidth={thickness}
          />
          {data.map((d, i) => {
            const frac = d.value / total;
            const dash = frac * c;
            const offset = -acc;
            acc += dash;
            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{
                  transition: "opacity 0.2s",
                  opacity: hover === null || hover === i ? 1 : 0.4,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </svg>
        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-[10px] font-semibold tracking-wider text-lsp-muted uppercase">
              {centerLabel.secondary}
            </div>
            <div className="font-display text-2xl text-black">
              {centerLabel.primary}
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex-1 space-y-2">
        {data.map((d, i) => {
          const pct = ((d.value / total) * 100).toFixed(1);
          return (
            <div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={`flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2 transition ${
                hover === i ? "border-lsp-border bg-lsp-surface-2" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: d.color }}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-black">{d.label}</div>
                  {d.meta && (
                    <div className="truncate text-[11px] text-lsp-muted">
                      {d.meta}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-black">{pct}%</div>
                <div className="text-[11px] text-lsp-muted">
                  {formatCurrency(d.value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LineSeries {
  name: string;
  color: string;
  values: number[];
}

export function LineChart({
  labels,
  series,
  height = 260,
  formatValue,
}: {
  labels: string[];
  series: LineSeries[];
  height?: number;
  formatValue?: (n: number) => string;
}) {
  const pad = { l: 50, r: 16, t: 24, b: 28 };
  const w = 720;
  const h = height;
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all, 1);
  const min = 0;
  const rng = max - min || 1;
  const stepX = innerW / Math.max(1, labels.length - 1);

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max * (yTicks - i)) / yTicks),
  );

  const [hover, setHover] = useState<number | null>(null);
  const fmt = formatValue ?? ((n) => n.toLocaleString());

  const buildPath = (vals: number[]) => {
    if (!vals.length) return "";
    const pts = vals.map((v, i) => {
      const x = pad.l + stepX * i;
      const y = pad.t + (1 - (v - min) / rng) * innerH;
      return [x, y] as const;
    });
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="block h-auto w-full"
        preserveAspectRatio="none"
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t, i) => {
          const y = pad.t + (i * innerH) / yTicks;
          return (
            <g key={i}>
              <line
                x1={pad.l}
                x2={pad.l + innerW}
                y1={y}
                y2={y}
                stroke={GRID}
                strokeDasharray="3 4"
              />
              <text
                x={pad.l - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill={AXIS_TEXT}
              >
                {fmt(t)}
              </text>
            </g>
          );
        })}

        {labels.map((l, i) => (
          <text
            key={i}
            x={pad.l + stepX * i}
            y={h - 8}
            textAnchor="middle"
            fontSize="11"
            fill={AXIS_TEXT}
          >
            {l}
          </text>
        ))}

        {series.map((s, si) => (
          <g key={si}>
            <path
              d={`${buildPath(s.values)} L ${pad.l + innerW} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`}
              fill={s.color}
              fillOpacity={0.08}
            />
            <path
              d={buildPath(s.values)}
              fill="none"
              stroke={s.color}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {s.values.map((v, i) => {
              const x = pad.l + stepX * i;
              const y = pad.t + (1 - (v - min) / rng) * innerH;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={hover === i ? 5 : 3.5}
                  fill={DOT_BG}
                  stroke={s.color}
                  strokeWidth={2}
                  onMouseEnter={() => setHover(i)}
                />
              );
            })}
          </g>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 px-1 text-xs">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="h-2 w-4 rounded-full"
              style={{ background: s.color }}
            />
            <span className="text-lsp-muted">{s.name}</span>
            {hover !== null && (
              <span className="font-semibold text-black">
                {fmt(s.values[hover])}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface BarSeries {
  name: string;
  color: string;
  values: number[];
}

export function StackedBarChart({
  labels,
  series,
  height = 260,
  formatValue,
}: {
  labels: string[];
  series: BarSeries[];
  height?: number;
  formatValue?: (n: number) => string;
}) {
  const pad = { l: 50, r: 16, t: 24, b: 28 };
  const w = 720;
  const h = height;
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const fmt = formatValue ?? ((n) => n.toLocaleString());

  const totals = useMemo(
    () => labels.map((_, i) => series.reduce((s, ss) => s + ss.values[i], 0)),
    [labels, series],
  );
  const max = Math.max(...totals, 1);
  const barW = (innerW / labels.length) * 0.55;
  const step = innerW / labels.length;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max * (yTicks - i)) / yTicks),
  );

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full">
        {ticks.map((t, i) => {
          const y = pad.t + (i * innerH) / yTicks;
          return (
            <g key={i}>
              <line
                x1={pad.l}
                x2={pad.l + innerW}
                y1={y}
                y2={y}
                stroke={GRID}
                strokeDasharray="3 4"
              />
              <text
                x={pad.l - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill={AXIS_TEXT}
              >
                {fmt(t)}
              </text>
            </g>
          );
        })}

        {labels.map((l, i) => {
          const cx = pad.l + step * i + step / 2;
          let yBottom = pad.t + innerH;
          return (
            <g key={i}>
              {series.map((s, si) => {
                const v = s.values[i];
                const hgt = (v / max) * innerH;
                yBottom -= hgt;
                return (
                  <rect
                    key={si}
                    x={cx - barW / 2}
                    y={yBottom}
                    width={barW}
                    height={hgt}
                    fill={s.color}
                    rx={si === 0 ? 0 : 3}
                  />
                );
              })}
              <text
                x={cx}
                y={h - 8}
                textAnchor="middle"
                fontSize="11"
                fill={AXIS_TEXT}
              >
                {l}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 px-1 text-xs">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="h-2 w-4 rounded-full"
              style={{ background: s.color }}
            />
            <span className="text-lsp-muted">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
