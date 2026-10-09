import { evaluate, RULES, formatMoney } from "./loan-rules.mjs";

const get = (id) => document.getElementById(id);
const form = get("eligibility-form");
const incomeField = get("income");
const scoreField = get("score");
const resultLabel = get("result-label");
const resultTitle = get("result-title");
const resultDescription = get("result-description");
const resultCard = get("result-card");
let currentResult = null;

function setStatus(id, passed, labelWhenPassed, labelWhenFailed) {
  const el = get(id);
  el.textContent = passed ? labelWhenPassed : labelWhenFailed;
  el.className = "rule-status " + (passed ? "pass" : "fail");
}

function showPlaceholder(message) {
  currentResult = null;
  resultCard.dataset.status = "empty";
  resultLabel.textContent = "READY WHEN YOU ARE";
  resultTitle.textContent = "Your assessment appears here";
  resultDescription.textContent = message;
  get("status-icon").textContent = "↗";
  get("income-rule").textContent = "Awaiting input";
  get("score-rule").textContent = "Awaiting input";
  get("income-rule").className = get("score-rule").className = "rule-status";
  get("result-income").textContent = "—";
  get("result-score").textContent = "—";
  get("copy-result").disabled = true;
  get("print-result").disabled = true;
}

function display(result) {
  currentResult = result;
  resultCard.dataset.status = result.meets.all ? "pass" : "fail";
  resultLabel.textContent = "DEMO ASSESSMENT COMPLETE";
  resultTitle.textContent = result.meets.all ? "Both rules satisfied." : "Not all rules are met.";
  resultDescription.textContent = result.meets.all
    ? "The example income and score requirements are satisfied. This does not indicate real loan eligibility or approval."
    : "One or more practice criteria were not satisfied. This is only a learning exercise, not a lender assessment.";
  get("status-icon").textContent = result.meets.all ? "✓" : "!";
  setStatus("income-rule", result.meets.income, "Requirement met", "Not met");
  setStatus("score-rule", result.meets.score, "Requirement met", "Not met");
  get("result-income").textContent = "৳ " + formatMoney(result.income);
  get("result-score").textContent = formatMoney(result.score) + " / " + RULES.scoreMax;
  get("copy-result").disabled = false;
  get("print-result").disabled = false;
}

function recalculate(event) {
  if (event) event.preventDefault();
  get("form-error").textContent = "";
  incomeField.removeAttribute("aria-invalid");
  scoreField.removeAttribute("aria-invalid");
  try {
    display(evaluate(incomeField.value, scoreField.value));
  } catch (error) {
    const field = !incomeField.value.trim() ? incomeField
      : !scoreField.value.trim() ? scoreField
      : /score/i.test(error.message) ? scoreField : incomeField;
    field.setAttribute("aria-invalid", "true");
    get("form-error").textContent = error.message;
    showPlaceholder("Correct the highlighted field, then calculate again.");
    field.focus();
  }
}

form.addEventListener("submit", recalculate);
get("use-example").addEventListener("click", () => {
  incomeField.value = "1200000";
  scoreField.value = "1100";
  recalculate();
});
get("reset-form").addEventListener("click", () => {
  form.reset();
  get("form-error").textContent = "";
  incomeField.removeAttribute("aria-invalid");
  scoreField.removeAttribute("aria-invalid");
  showPlaceholder("Enter the values to see a detailed explanation of each sample rule.");
  incomeField.focus();
});
get("copy-result").addEventListener("click", async () => {
  if (!currentResult) return;
  const r = currentResult;
  const report = [
    "Income & Credit Loan — educational demonstration",
    "Annual income (example BDT): " + formatMoney(r.income),
    "Demo score (0–2000): " + r.score,
    "Income rule (>1,000,000): " + (r.meets.income ? "met" : "not met"),
    "Score rule (>=1,000): " + (r.meets.score ? "met" : "not met"),
    "Overall: " + (r.meets.all ? "both practice criteria satisfied" : "one or more practice criteria not satisfied"),
    "NOT a real credit assessment or loan approval."
  ].join("\n");
  try {
    await navigator.clipboard.writeText(report);
    const button = get("copy-result");
    button.textContent = "Copied ✓";
    setTimeout(() => { button.textContent = "Copy summary"; }, 1500);
  } catch {
    get("form-error").textContent = "Clipboard access is unavailable in this browser. Use Print instead.";
  }
});
get("print-result").addEventListener("click", () => {
  if (currentResult) window.print();
});
get("theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const light = root.dataset.theme !== "light";
  root.dataset.theme = light ? "light" : "dark";
  get("theme-toggle").textContent = light ? "☾" : "☀";
  get("theme-toggle").setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
});
showPlaceholder("Enter the values to see a detailed explanation of each sample rule.");
