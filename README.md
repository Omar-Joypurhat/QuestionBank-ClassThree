# BrightSteps — Class 3 English for Today

A small question-bank app for the **NCTB Class 3 English for Today (2026 edition)**. It is designed to help check how well an English teacher is prepared with the book, while also keeping a unit-organised set of learner questions.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL. The home page contains the question bank; use **Teacher readiness** to open the timed assessment. To build and preview for production:

```bash
npm run build
npm run preview
```

Run the data checks with `npm test`.

## Free hosting

The repository includes a GitHub Actions workflow that runs the tests and deploys this static site to GitHub Pages when the current deployment branch is updated. The expected public URL is <https://omar-joypurhat.github.io/QuestionBank-ClassThree/>. GitHub Pages must be enabled with **Settings → Pages → Build and deployment → Source: GitHub Actions**. The repository and the question-bank/Word documents will be publicly accessible when hosted this way.

## Included

- 40 starter questions arranged across the book's eight units, with lesson references and short reading passages.
- Search, unit filters, pagination, answer feedback, writing samples, saved questions, and five-question practice.
- A printable **30-minute, 30-mark teacher readiness check**, with a timer, auto-scored multiple choice, answer key, and marking rubric.
- Separate Word downloads for the questions-only paper and answer key, linked from the Teacher Readiness page (`public/downloads/`).
- Browser storage for favourites, writing drafts, and practice totals.
- Data-first question content in `src/data.js` so more units and question sets can be added later.

## Source and alignment note

NCTB's official site lists *English For Today* in the 2026 Class 3 textbook list: <https://nctb.gov.bd/pages/static-pages/695b9980c4774958d7b70591>. The official listing was accessible, but its PDF download itself was not extractable in this browsing session. I checked the unit sequence and lesson themes against a publicly readable Class Three text transcription, labelled 2024, and the question wording is original but follows those book activities. Please cross-check the specific 2026 PDF or printed copy before using this as a formal teacher evaluation; if you provide that PDF, the items can be verified page by page.
