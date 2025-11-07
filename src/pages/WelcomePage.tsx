import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function WelcomePage() {
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="card hero">
        <div className="left">
          <h1>{t("welcome.title")}</h1>
          <p className="small">{t("welcome.subtitle")}</p>
          <div style={{ marginTop: 16 }}>
            <button className="btn" onClick={() => nav("/login")}>{t("welcome.start")}</button>
          </div>
        </div>
        <div className="right">
          <img src="/src/assets/logo.svg" alt="logo" style={{ width: "100%" }} />
        </div>
      </div>
    </motion.div>
  );
}
