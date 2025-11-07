import React from "react";
import Router from "./routes/Router";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";
import { useNavigate } from "react-router-dom";
import { storage } from "./services/storage";

export default function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleLogout() {
    storage.logout();
    // send user to login page
    navigate("/login");
    // optional: force reload to clear any in-memory state
    // window.location.reload();
  }

  return (
    <div>
      <header className="container header">
        <h2>{t("appName")}</h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LanguageSelector />
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="container">
        <Router />
      </main>
      <footer className="container footer">
        <small>© {new Date().getFullYear()} {t("appName")}</small>
      </footer>
    </div>
  );
}