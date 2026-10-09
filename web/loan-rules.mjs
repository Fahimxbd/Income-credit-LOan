/** Shared browser-side educational rules; mirrors loan_core.py. */
export const RULES = Object.freeze({
  incomeExclusive: 1_000_000,
  scoreInclusive: 1000,
  scoreMax: 2000,
  incomeMax: 1_000_000_000_000_000
});

function parseIncome(value) {
  if (value === null || value === undefined || typeof value === "boolean" || String(value).trim() === "") {
    throw new RangeError("Enter your annual income.");
  }
  const raw = String(value).trim();
  if (!/^\d+(?:\.\d+)?(?:e\+?\d+)?$/i.test(raw)) {
    throw new RangeError("Annual income must be a nonnegative number.");
  }
  const number = Number(raw);
  if (!Number.isFinite(number) || number < 0 || number > RULES.incomeMax) {
    throw new RangeError("Annual income must be between 0 and 1 quadrillion.");
  }
  return number;
}

function parseScore(value) {
  if (value === null || value === undefined || typeof value === "boolean") {
    throw new RangeError("Enter your demo credit score.");
  }
  const raw = String(value).trim();
  if (!/^\d+$/.test(raw)) {
    throw new RangeError("Demo score must be a whole number between 0 and 2000.");
  }
  const number = Number(raw);
  if (!Number.isSafeInteger(number) || number < 0 || number > RULES.scoreMax) {
    throw new RangeError("Demo score must be a whole number between 0 and 2000.");
  }
  return number;
}

export function evaluate(incomeInput, scoreInput) {
  const income = parseIncome(incomeInput);
  const score = parseScore(scoreInput);
  const meetsIncome = income > RULES.incomeExclusive;
  const meetsScore = score >= RULES.scoreInclusive;
  return {
    income, score, meets: { income: meetsIncome, score: meetsScore, all: meetsIncome && meetsScore },
    incomeDifference: income - RULES.incomeExclusive,
    scoreDifference: score - RULES.scoreInclusive
  };
}

export function formatMoney(value) {
  if (!Number.isFinite(value)) throw new RangeError("Amount must be finite.");
  return new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(value);
}
