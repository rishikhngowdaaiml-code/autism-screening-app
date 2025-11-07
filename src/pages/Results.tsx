import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../services/storage";
import { useTranslation } from "react-i18next";
import ProgressRing from "../components/ProgressRing";
import RiskBadge from "../components/RiskBadge";

export default function Results() {
  const { t } = useTranslation();
  const { reportId } = useParams();
  const nav = useNavigate();
  const user = storage.currentUser();
  const phone = user?.phone || "anon";
  const reports = storage.getReports(phone);
  const report = reports.find(r => r.id === reportId);

  if (!report) {
    return <div className="card">Report not found</div>;
  }

  const level = report.risk >= 70 ? "high" : report.risk >= 40 ? "moderate" : "low";
  const recs = t(`recommendations.${level}`, { returnObjects: true }) as string[];

  function onPrint() {
    window.print();
  }

  async function onShare() {
    const text = `${t("results.risk")}: ${report.risk}%`;
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title: "Screening Report", text });
      } catch (e) {
        alert("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Result copied to clipboard");
    }
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{t("results.risk")}</h3>
        <RiskBadge risk={report.risk} />
      </div>

      <div className="result-visual" style={{ marginTop: 12 }}>
        <ProgressRing value={report.risk} />
        <div>
          <p className="small">Model breakdown</p>
          <ul>
            <li>Random Forest: {report.modelScores.rf}%</li>
            <li>Logistic Regression: {report.modelScores.lr}%</li>
            <li>SVM: {report.modelScores.svm}%</li>
          </ul>
        </div>
      </div>

      <div className="recommendation">
        <h4>{t("results.recommendations")}</h4>
        <ul>
          {recs.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn" onClick={onPrint}>{t("results.print")}</button>
        <button className="btn" onClick={onShare}>{t("results.share")}</button>
        <button className="btn" onClick={() => nav(-1)}>Back</button>
      </div>
    </div>
  );
}
