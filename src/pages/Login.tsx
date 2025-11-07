import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { storage } from "../services/storage";
import { v4 as uuidv4 } from "uuid";
import type { Role, User } from "../types";

export default function Login() {
  const { t } = useTranslation();
  const [role, setRole] = useState<Role>("parent");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = uuidv4();
    const user: User =
      role === "parent"
        ? { id, role, phone, name: `Parent ${phone.slice(-4)}` }
        : { id, role, email, name: "Clinician" };
    storage.saveUser(user);
    nav("/dashboard");
  }

  return (
    <div className="card">
      <h3>{t("auth.loginBtn")}</h3>
      <form className="form" onSubmit={submit}>
        <label>
          {t("auth.role")}
          <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="parent">{t("auth.parent")}</option>
            <option value="clinician">{t("auth.clinician")}</option>
          </select>
        </label>

        {role === "parent" ? (
          <>
            <label>{t("auth.phone")}</label>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} />
          </>
        ) : (
          <>
            <label>{t("auth.email")}</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} />
          </>
        )}

        <label>{t("auth.password")}</label>
        <input type="password" defaultValue="demo" readOnly />

        <button className="btn" type="submit">
          {t("auth.loginBtn")}
        </button>
      </form>
    </div>
  );
}
