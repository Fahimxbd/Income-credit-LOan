"""Pure educational loan-rule calculator (not a lender decision).

The original beginner project required income > 1,000,000 and credit score
>= 1,000. We preserve those exact exercise criteria. The score is on an
arbitrary demo scale of 0 to 2,000, not a real FICO or bureau score.
"""
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation

MIN_ANNUAL_INCOME_EXCLUSIVE = Decimal("1000000")
MIN_DEMO_SCORE = 1000
MAX_DEMO_SCORE = 2000


@dataclass(frozen=True)
class Eligibility:
    annual_income: Decimal
    demo_score: int
    meets_income_rule: bool
    meets_score_rule: bool

    @property
    def meets_demo_rules(self) -> bool:
        return self.meets_income_rule and self.meets_score_rule


def parse_income(raw: object) -> Decimal:
    if isinstance(raw, bool):
        raise ValueError("Annual income must be a valid nonnegative number.")
    if isinstance(raw, str) and not raw.strip():
        raise ValueError("Annual income is required.")
    try:
        amount = Decimal(str(raw).strip())
    except (InvalidOperation, TypeError, ValueError):
        raise ValueError("Annual income must be a valid nonnegative number.") from None
    if not amount.is_finite() or amount < 0 or amount > Decimal("1000000000000000"):
        raise ValueError("Annual income must be between 0 and 1 quadrillion.")
    return amount


def parse_demo_score(raw: object) -> int:
    if isinstance(raw, bool):
        raise ValueError("Demo credit score must be a whole number from 0 to 2000.")
    text = str(raw).strip()
    if not text or not text.isdecimal():
        raise ValueError("Demo credit score must be a whole number from 0 to 2000.")
    score = int(text)
    if score < 0 or score > MAX_DEMO_SCORE:
        raise ValueError("Demo credit score must be a whole number from 0 to 2000.")
    return score


def check_eligibility(annual_income: object, demo_score: object) -> Eligibility:
    income = parse_income(annual_income)
    score = parse_demo_score(demo_score)
    return Eligibility(
        annual_income=income,
        demo_score=score,
        meets_income_rule=income > MIN_ANNUAL_INCOME_EXCLUSIVE,
        meets_score_rule=score >= MIN_DEMO_SCORE,
    )
