import React from "react";
import type { Child } from "../types";

export default function ChildCard({ child, onStart }: { child: Child; onStart: (id: string) => void }) {
  return (
    <div className="card child-card">
      <div>
        <strong>{child.name}</strong>
        <div className="small">Age: {child.age}</div>
      </div>
      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={() => onStart(child.id)}>Start</button>
      </div>
    </div>
  );
}
