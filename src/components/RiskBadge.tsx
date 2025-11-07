import React from "react";

export default function RiskBadge({ risk }: { risk: number }) {
  const color = risk >= 70 ? "var(--danger)" : risk >= 40 ? "var(--accent)" : "var(--primary)";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 18, height: 18, borderRadius: 9, background: color }} />
      <strong>{risk}%</strong>
    </div>
  );
}
