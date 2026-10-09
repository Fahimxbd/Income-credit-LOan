import test from "node:test";
import assert from "node:assert/strict";
import { evaluate, formatMoney } from "../web/loan-rules.mjs";

test("original exercise example meets both demo criteria", () => {
  assert.deepEqual(evaluate("1200000", "1100").meets, { income: true, score: true, all: true });
});
test("income threshold is exclusive and score threshold inclusive", () => {
  assert.equal(evaluate("1000000", "1000").meets.all, false);
  assert.equal(evaluate("1000000.01", "1000").meets.all, true);
  assert.equal(evaluate("1000001", "999").meets.all, false);
});
test("zero values are valid but fail demo rules", () => {
  assert.equal(evaluate("0", "0").meets.all, false);
});
test("inputs are validated without implicit coercion", () => {
  for (const income of ["", " ", "-3", "NaN", "Infinity", "abc", null]) {
    assert.throws(() => evaluate(income, 1100), { name: "RangeError" });
  }
  for (const score of ["", " ", "-1", "1000.2", "2001", "NaN", null]) {
    assert.throws(() => evaluate(1200000, score), { name: "RangeError" });
  }
});
test("formatting is safe", () => {
  assert.equal(typeof formatMoney(1200000), "string");
});
