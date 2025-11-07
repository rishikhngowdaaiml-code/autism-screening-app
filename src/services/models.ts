export function simulateModels(answers: number[]) {
  const sum = answers.reduce((a, b) => a + b, 0);
  const max = answers.length * 4;
  const base = (sum / max) * 100;
  const noise = (Math.sin(sum * 7.13) + 1) * 2.5;
  const rf = Math.min(100, Math.max(0, base * 1.05 + noise * 0.8));
  const lr = Math.min(100, Math.max(0, base * 0.95 + noise * 0.6));
  const svm = Math.min(100, Math.max(0, base * 1.0 + noise * 0.9));
  const ensemble = Math.round((rf * 0.45 + lr * 0.30 + svm * 0.25) * 10) / 10;
  return {
    rf: Math.round(rf * 10) / 10,
    lr: Math.round(lr * 10) / 10,
    svm: Math.round(svm * 10) / 10,
    risk: Math.round(ensemble * 10) / 10
  };
}
