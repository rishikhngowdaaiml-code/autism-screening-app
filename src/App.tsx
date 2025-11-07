import React from "react";
import Router from "./routes/Router";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";

export default function App() {
  const { t } = useTranslation();
  return (
    <div>
      <header className="container header">
        <h2>{t("appName")}</h2>
        <LanguageSelector />
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
