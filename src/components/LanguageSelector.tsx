import React from "react";
import { useTranslation } from "react-i18next";
import { storage } from "../services/storage";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const change = (lng: string) => {
    i18n.changeLanguage(lng);
    storage.setLang(lng);
  };
  return (
    <div>
      <button className="lang-select" onClick={() => change("en")}>EN</button>{" "}
      <button className="lang-select" onClick={() => change("kn")}>KN</button>{" "}
      <button className="lang-select" onClick={() => change("hi")}>HI</button>
    </div>
  );
}
