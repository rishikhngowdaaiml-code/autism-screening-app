import React from "react";

export default function ProgressRing({ value }: { value: number }) {
  const radius = 50;
  const stroke = 10;
  const normalized = Math.max(0, Math.min(100, value));
  const c = 2 * Math.PI * radius;
  const dash = (normalized / 100) * c;
  const remainder = c - dash;
  const color = value >= 70 ? "#ef4444" : value >= 40 ? "#f59e0b" : "#0f766e";

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
      <g transform="translate(60,60)">
        <circle r={radius} stroke="#eef2f4" strokeWidth={stroke} fill="transparent" />
        <circle r={radius} stroke={color} strokeWidth={stroke} fill="transparent" strokeLinecap="round"
          strokeDasharray={`${dash} ${remainder}`} transform="rotate(-90)" />
        <text x="0" y="6" textAnchor="middle" fontSize="20" fill="#0f172a">{Math.round(value)}%</text>
      </g>
    </svg>
  );
}
