"""Standard-library tests, runnable with python -m unittest discover -s tests -v."""
import math
import unittest
from decimal import Decimal
from loan_core import check_eligibility, parse_income, parse_demo_score


class LoanEligibilityTests(unittest.TestCase):
    def test_original_example_qualifies(self):
        result = check_eligibility("1200000", "1100")
        self.assertTrue(result.meets_demo_rules)
        self.assertTrue(result.meets_income_rule)
        self.assertTrue(result.meets_score_rule)

    def test_income_must_be_strictly_greater_than_one_million(self):
        self.assertFalse(check_eligibility("1000000", "1000").meets_demo_rules)
        self.assertTrue(check_eligibility("1000000.01", "1000").meets_demo_rules)

    def test_score_threshold_is_inclusive(self):
        self.assertTrue(check_eligibility("1000001", "1000").meets_demo_rules)
        self.assertFalse(check_eligibility("1000001", "999").meets_demo_rules)

    def test_both_criteria_needed(self):
        self.assertFalse(check_eligibility("100", "500").meets_demo_rules)
        self.assertFalse(check_eligibility("1000001", "0").meets_demo_rules)

    def test_zero_income_is_valid_but_ineligible(self):
        self.assertEqual(parse_income("0"), Decimal("0"))
        self.assertFalse(check_eligibility("0", "1500").meets_demo_rules)

    def test_integer_score_limits(self):
        self.assertEqual(parse_demo_score("0"), 0)
        self.assertEqual(parse_demo_score("2000"), 2000)
        for invalid in ["", "2.5", "-1", "2001", "Infinity", "1e3", True, None]:
            with self.subTest(invalid=invalid):
                with self.assertRaises(ValueError):
                    parse_demo_score(invalid)

    def test_income_validation(self):
        for invalid in ["", "-0.5", "NaN", "Infinity", "-Infinity", "hello", "1e999999", True, None]:
            with self.subTest(invalid=invalid):
                with self.assertRaises(ValueError):
                    parse_income(invalid)

    def test_large_but_bounded_values(self):
        self.assertFalse(check_eligibility("1e15", "999").meets_demo_rules)
        with self.assertRaises(ValueError):
            parse_income("1000000000000001")


if __name__ == "__main__":
    unittest.main()
