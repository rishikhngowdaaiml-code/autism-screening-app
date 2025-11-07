import React from "react";
import type { Child } from "../types";
import { useNavigate } from "react-router-dom";

export default function ChildCard({
  child,
  onStart,
  onToggleReports,
  expanded,
  reportsForChild
}: {
  child: Child;
  onStart: (id: string) => void;
  onToggleReports?: (id: string) => void;
  expanded?: boolean;
  reportsForChild?: { id: string; date: string; risk: number }[];
}) {
  const nav = useNavigate();

  return (
    <div className="card child-card">
      <div>
        <strong>{child.name}</strong>
        <div className="small">Age: {child.age}</div>
      </div>

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => onStart(child.id)}>Start</button>
        {onToggleReports && (
          <button
            className="btn"
            onClick={() => onToggleReports(child.id)}
            aria-expanded={expanded}
            title="View previous reports"
          >
            {expanded ? "Hide reports" : "View reports"}
          </button>
        )}
      </div>

      {expanded && reportsForChild && (
        <div style={{ marginTop: 12 }}>
          {reportsForChild.length === 0 ? (
            <div className="small card">No reports yet</div>
          ) : (
            <ul style={{ paddingLeft: 16 }}>
              {reportsForChild.map((r) => (
                <li key={r.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13 }}>{new Date(r.date).toLocaleString()}</div>
                      <div className="small">Risk: {r.risk}%</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn" onClick={() => nav(`/results/${r.id}`)}>View</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}