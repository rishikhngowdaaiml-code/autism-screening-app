import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { simulateModels } from "../services/models";
import { storage } from "../services/storage";
import { v4 as uuidv4 } from "uuid";
import type { Report } from "../types";

const QUESTIONS = [
  "Has difficulty with back-and-forth conversations.",
  "Repeats phrases or words often.",
  "Avoids eye contact.",
  "Has limited interest in peers.",
  "Shows repetitive behaviors.",
  "Unusual reactions to sensory input.",
  "Delayed speech development.",
  "Difficulty understanding nonverbal cues.",
  "Limited imaginative play.",
  "Has intense interests or obsessions."
];

export default function Assessment() {
  const { t } = useTranslation();
  const { childId } = useParams();
  const nav = useNavigate();
  const user = storage.currentUser();
  const phone = user?.phone || "anon";
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));

  useEffect(()=> {
    const children = storage.getChildren(phone);
    if (!children.find(c=>c.id===childId)) {
      // fallback - go back
    }
  },[]);

  const currentQ = QUESTIONS[index];
  const options = useMemo(() => ["Never","Rarely","Sometimes","Often","Always"], []);

  function choose(i: number) {
    const next = [...answers];
    next[index] = i;
    setAnswers(next);
  }

  function submit() {
    if (answers.some(a => a < 0)) {
      alert("Please answer all questions.");
      return;
    }
    const models = simulateModels(answers);
    const report: Report = {
      id: uuidv4(),
      childId: childId!,
      date: new Date().toISOString(),
      answers,
      modelScores: { rf: models.rf, lr: models.lr, svm: models.svm },
      risk: models.risk
    };
    const reports = storage.getReports(phone);
    const next = [report, ...reports];
    storage.saveReports(phone, next);

    const children = storage.getChildren(phone).map(c => {
      if (c.id === childId) {
        c.reports = c.reports ? [report.id, ...c.reports] : [report.id];
      }
      return c;
    });
    storage.saveChildren(phone, children);

    nav(`/results/${report.id}`);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="card">
        <h3>{t("assessment.title")}</h3>
        <div className="questions">
          <div className="small">{t("assessment.question", { index: index + 1, total: QUESTIONS.length })}</div>
          <p>{currentQ}</p>

          <div style={{ display: "flex", gap: 8 }}>
            {options.map((opt, i) => {
              const selected = answers[index] === i;
              return (
                <button
                  key={i}
                  className="btn"
                  style={{ background: selected ? "var(--accent)" : undefined }}
                  onClick={() => choose(i)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
          <button disabled={index === 0} className="btn" onClick={() => setIndex((s) => s - 1)}>{t("assessment.prev")}</button>
          {index < QUESTIONS.length - 1 ? (
            <button className="btn" onClick={() => setIndex((s) => s + 1)}>{t("assessment.next")}</button>
          ) : (
            <button className="btn" onClick={submit}>{t("assessment.submit")}</button>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <div className="progress">
            <span style={{ width: `${((answers.filter(a => a >= 0).length) / QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
