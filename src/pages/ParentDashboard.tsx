import React, { useEffect, useState } from "react";
import { storage } from "../services/storage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChildCard from "../components/ChildCard";
import { v4 as uuidv4 } from "uuid";
import type { Child } from "../types";

export default function ParentDashboard() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const user = storage.currentUser();
  const phone = user?.phone || "anon";

  const [children, setChildren] = useState<Child[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [expandedChildId, setExpandedChildId] = useState<string | null>(null);
  const [reports, setReports] = useState<
    { id: string; childId: string; date: string; risk: number }[]
  >([]);

  useEffect(() => {
    // load children and reports for this parent
    const ch = storage.getChildren(phone);
    setChildren(ch);

    const rs = storage.getReports(phone);
    // map minimal fields we need
    const mapped = rs.map((r) => ({ id: r.id, childId: r.childId, date: r.date, risk: r.risk }));
    setReports(mapped);

    // debug helpers - if nothing loaded, print keys to help troubleshoot
    if (!user?.phone) {
      // If user has no phone, parent likely logged in with clinician role or user not set
      console.warn("[ParentDashboard] No phone found on current user; using 'anon'.");
    } else if (ch.length === 0 && rs.length > 0) {
      console.warn(`[ParentDashboard] Found reports (${rs.length}) but no children under phone ${phone}.`);
    }
  }, [phone]); // run when phone changes

  function addChild(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !age) return;
    const c: Child = { id: uuidv4(), name, age: Number(age), reports: [] };
    const next = [...children, c];
    setChildren(next);
    storage.saveChildren(phone, next);
    setName("");
    setAge("");
  }

  function start(id: string) {
    nav(`/assessment/${id}`);
  }

  function toggleReports(id: string) {
    setExpandedChildId((s) => (s === id ? null : id));
  }

  function reportsFor(childId: string) {
    return reports.filter((r) => r.childId === childId);
  }

  return (
    <div>
      <h3>{t("dashboard.title")}</h3>

      <div className="card" style={{ marginBottom: 12 }}>
        <form className="form" onSubmit={addChild}>
          <label>{t("dashboard.name")}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>{t("dashboard.age")}</label>
          <input value={age} onChange={(e) => setAge(Number(e.target.value) || "")} type="number" min={6} max={10} />
          <button className="btn" type="submit">{t("dashboard.addChild")}</button>
        </form>
      </div>

      <div>
        {children.length === 0 ? (
          <div className="card small">{t("dashboard.noChildren")}</div>
        ) : (
          <div className="child-grid">
            {children.map((c) => (
              <ChildCard
                key={c.id}
                child={c}
                onStart={start}
                onToggleReports={toggleReports}
                expanded={expandedChildId === c.id}
                reportsForChild={reportsFor(c.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}