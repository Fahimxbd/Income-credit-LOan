"""Interactive Python CLI for the educational income and demo-score checker."""
from loan_core import check_eligibility, parse_income, parse_demo_score


def _prompt_valid(prompt, validator):
    while True:
        try:
            text = input(prompt)
        except EOFError:
            raise SystemExit("\nInput ended before calculation was complete.") from None
        try:
            return validator(text)
        except ValueError as exc:
            print(f"Invalid input: {exc}")


def main():
    print("=" * 52)
    print(" INCOME & CREDIT SCORE — EDUCATIONAL LOAN CHECKER")
    print("=" * 52)
    print("This exercise uses arbitrary DEMO criteria, NOT bank rules.")
    print("Annual income must exceed 1,000,000 (example BDT).")
    print("Demo score must be 1,000 or higher (range: 0 to 2,000).")
    print("The demo score is NOT a FICO, CIB, or bureau score.\n")

    try:
        income = _prompt_valid("Enter annual income (BDT): ", parse_income)
        score = _prompt_valid("Enter demo score (0-2000): ", parse_demo_score)
    except KeyboardInterrupt:
        print("\nCancelled.")
        return 130

    result = check_eligibility(income, score)
    print("\n" + "-" * 52)
    print(f"Annual income: {result.annual_income:,.2f} BDT")
    print(f"Demo credit score: {result.demo_score} / 2000")
    print("Income criterion: " + ("MET" if result.meets_income_rule else "NOT MET"))
    print("Score criterion: " + ("MET" if result.meets_score_rule else "NOT MET"))
    print("Demo result: " + ("Meets both practice criteria" if result.meets_demo_rules else "Does not meet both practice criteria"))
    print("No real loan approval is granted or predicted.")
    print("-" * 52)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
