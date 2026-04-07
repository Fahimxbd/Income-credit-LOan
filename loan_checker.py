income = float(input("Enter your annual income: "))

if income > 1000000:
    has_high_income = True
else:
    has_high_income = False

credit_score = int(input("Enter your credit score: "))

if credit_score >= 1000:
    has_good_credit = True
else:
    has_good_credit = False

if has_high_income and has_good_credit:
    print("Eligible for loan")
else:
    print("Not eligible for loan")
