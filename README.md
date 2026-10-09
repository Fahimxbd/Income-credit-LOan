# Income & Credit Loan — Python Checker + Cloudflare Website

A beginner-friendly loan-rule exercise transformed into a responsive website. The original Python entry points **credit.py** and **loan_checker.py** remain supported. The website runs entirely in the browser and deploys as **Cloudflare Workers Static Assets** without a Python server or database.

> **Education-only demonstration — NOT a real loan decision.** The original made-up rules require annual income **strictly above 1,000,000** and a custom score **at least 1,000**. The demo uses BDT as an example currency, with an artificial score scale of 0–2,000. This is NOT a FICO, CIB, or official credit score, and it does not represent lender criteria or approval.

## Live Cloudflare Workers website

**Cloudflare Workers website:** [**Open Income & Credit Loan →**](https://income-credit-loan.fahimprivateuser-d8a.workers.dev/)

Direct URL: https://income-credit-loan.fahimprivateuser-d8a.workers.dev/

## Features

- Mobile-first web UI with dark/light themes
- Explains both original Python demonstration conditions separately
- Example values, reset, copyable summary and print view
- Input validation for negative amounts, invalid values, missing fields and demo scores outside 0–2,000
- No account, database, browser data storage, credit bureau connection, or outbound form submission
- Python 3 terminal app for Windows, macOS, Linux and Android Termux
- GitHub Actions tests Python logic, JS logic and Cloudflare deployment packaging

## Educational calculation rules

1. Annual income must be greater than 1,000,000 (example BDT).
2. The demo score must be at least 1,000 out of 2,000.
3. Both rules must be true for the demo result to show "Both practice criteria satisfied."

Exactly 1,000,000 fails the income rule. Exactly 1,000 passes the score rule. These conditions are preserved from the original beginner-level project, not an official banking rule.

## Install on a computer — Terminal

Requirements: **Git**, **Python 3.10+**. No external Python packages are required.

~~~bash
git clone https://github.com/Fahimxbd/Income-credit-LOan.git
cd Income-credit-LOan
python credit.py
~~~

Alternative entry point:

~~~bash
python loan_checker.py
~~~

On Linux/macOS, use **python3** if **python** is unavailable. On Windows, use **py** if needed.

Example input:

~~~text
Enter annual income (BDT): 1200000
Enter demo score (0-2000): 1100
Demo result: Meets both practice criteria
~~~

### Preview website locally on a computer

From the repository folder:

~~~bash
python -m http.server 5173 --directory web
~~~

Then visit **http://127.0.0.1:5173/**. For Linux/macOS, use **python3 -m http.server 5173 --directory web** if needed. On Windows, **py -m http.server 5173 --directory web** also works. Press Ctrl+C to stop the local server.

## Android Termux — install and run

Install updated Termux from [F-Droid](https://f-droid.org/packages/com.termux/) or [official Termux GitHub releases](https://github.com/termux/termux-app/releases), and open it:

~~~bash
pkg update -y && pkg upgrade -y
pkg install -y git python
cd ~
git clone https://github.com/Fahimxbd/Income-credit-LOan.git
cd Income-credit-LOan
python credit.py
~~~

Alternatively run the other CLI:

~~~bash
python loan_checker.py
~~~

To serve the **website locally on the same Android phone**:

~~~bash
cd ~/Income-credit-LOan
python -m http.server 5173 --directory web
~~~

Open **http://127.0.0.1:5173/** in the phone's browser. Keep Termux running; press Ctrl+C to stop.

Update a clean checkout later:

~~~bash
cd ~/Income-credit-LOan
git pull --ff-only
python -m unittest discover -s tests -v
~~~

**Node.js is not required** for the Termux Python CLI or the local Python-hosted static website.

## Deploy to Cloudflare Workers

Use **Cloudflare Workers Static Assets**, not Cloudflare Pages. The **wrangler.jsonc** configuration serves the **web/** folder. **Python is not executed on Cloudflare**; the web calculator contains equivalent client-side rules.

Requires Node.js 22+ on a compatible computer, Git, and a Cloudflare account:

~~~bash
git clone https://github.com/Fahimxbd/Income-credit-LOan.git
cd Income-credit-LOan
npm install
npm test
npx wrangler login
npx wrangler deploy
~~~

The real HTTPS Workers URL will appear after a successful deployment. Add only that verified address to the Live Website section. Never commit Cloudflare credentials.

### Cloudflare dashboard + GitHub deployment

1. Cloudflare Dashboard → **Workers & Pages → Create → Import a repository** (menu names may change).
2. Connect **Fahimxbd/Income-credit-LOan** and choose production branch **main**.
3. Set root directory to the repository root.
4. Build/install command: **npm install** (no frontend build required).
5. Deploy command: **npx wrangler deploy**.
6. The worker name defined in **wrangler.jsonc** is **income-credit-loan-demo**.
7. Verify both desktop/mobile calculator behavior and the deployed URL, then insert the real URL into this README.

The GitHub Actions workflow includes a **Wrangler dry-run** that verifies deployment packaging but does not publish. Use one automatic deployment route to avoid duplicate builds.

**Termux caveat:** Wrangler's native dependencies may not work on Android. Use Termux for the Python program and local website; deploy to Cloudflare via a supported computer or GitHub-connected dashboard.

## Tests

Python standard-library tests:

~~~bash
python -m unittest discover -s tests -v
~~~

Browser-rule tests on Node.js 22+:

~~~bash
node --test tests/*.test.mjs
~~~

The GitHub CI also smoke-tests both original Python entry points and runs **npx wrangler deploy --dry-run**.

## Repository structure

~~~text
credit.py                    Original Python entry point (retained)
loan_checker.py              Alternative Python entry point (retained)
loan_cli.py                  Validated interactive terminal program
loan_core.py                 Pure Python calculation rules
web/index.html               Responsive browser interface
web/styles.css               Dark/light and mobile layouts
web/app.js                   Browser interactions
web/loan-rules.mjs           Browser-side logic
web/favicon.svg              Site icon
tests/test_loan_core.py      Python standard-library tests
tests/loan-rules.test.mjs    Node.js tests for browser logic
wrangler.jsonc               Cloudflare Workers Static Assets configuration
package.json                 Wrangler scripts
.github/workflows/ci.yml    Python, JS and Workers validation
~~~

## Privacy, safety and limitations

No financial information is sent by the app to a backend, submitted to a loan provider, or retained by app-controlled storage. The infrastructure hosting the HTML and JS can still receive standard HTTP metadata. The app does not process loan applications, check credit bureaus, issue real loan decisions, offer financial products, or provide regulated financial advice.

Originally created by Fahim Sikder as an exercise in Python conditional statements.
