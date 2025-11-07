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

  useEffect(() => {
    setChildren(storage.getChildren(phone));
  }, []);

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
              <ChildCard key={c.id} child={c} onStart={start} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
