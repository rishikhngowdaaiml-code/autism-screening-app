// Minimal demo backend for scoring + reports (for Render)
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.post("/api/score", (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers)) return res.status(400).json({ error: "answers array required" });

  const sum = answers.reduce((a, b) => a + (Number(b) || 0), 0);
  const max = Math.max(1, answers.length * 4);
  const base = (sum / max) * 100;
  const risk = Math.round(Math.min(100, Math.max(0, base)) * 10) / 10;

  res.json({
    modelScores: {
      rf: Math.round(risk * 1.02 * 10) / 10,
      lr: Math.round(risk * 0.98 * 10) / 10,
      svm: Math.round(risk * 1.0 * 10) / 10
    },
    risk
  });
});

// Simple in-memory reports store (demo only)
let reports = [];

app.post("/api/reports", (req, res) => {
  const report = { id: Date.now().toString(), ...req.body };
  reports.unshift(report);
  res.status(201).json(report);
});

app.get("/api/reports", (req, res) => res.json(reports));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));