import "./teacher-test.css";

const form = document.querySelector("#assessmentForm");
const timerDisplay = document.querySelector("#timerDisplay");
const startButton = document.querySelector("#startTimer");
const resultPanel = document.querySelector("#testResults");
const answerKey = document.querySelector("#markingGuide");
const correctAnswers = {
  a1: "a",
  a2: "b",
  a3: "a",
  a4: "a",
  a5: "b",
  a6: "a",
  a7: "a",
  a8: "a",
};

let secondsLeft = 30 * 60;
let timer = null;
let submitted = false;

function updateClock() {
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
  timerDisplay.classList.toggle("time-low", secondsLeft <= 5 * 60);
}

function startTimer() {
  if (timer || submitted) return;
  startButton.disabled = true;
  startButton.textContent = "Timer running";
  startButton.closest(".timer-card")?.querySelector("small")?.replaceChildren("The timer will submit at 00:00.");
  timer = window.setInterval(() => {
    secondsLeft -= 1;
    updateClock();
    if (secondsLeft <= 0) submitAssessment(true);
  }, 1000);
}

function scoreMultipleChoice() {
  const data = new FormData(form);
  let score = 0;
  for (const [name, correct] of Object.entries(correctAnswers)) {
    if (data.get(name) === correct) score += 1;
  }
  return score;
}

function submitAssessment(timeExpired = false) {
  if (submitted) return;
  submitted = true;
  if (timer) window.clearInterval(timer);
  timer = null;
  const score = scoreMultipleChoice();
  document.querySelector("#autoScore").textContent = `${score}/8`;
  resultPanel.hidden = false;
  answerKey.open = true;
  form.querySelectorAll("input, textarea, button[type='submit']").forEach((control) => {
    control.disabled = true;
  });
  startButton.disabled = true;
  startButton.textContent = timeExpired ? "Time is up" : "Assessment submitted";
  const note = document.querySelector(".manual-score-note");
  note.textContent = timeExpired
    ? `Time is up. Your auto-marked multiple-choice score is ${score}/8. Score the remaining open responses using the rubric below.`
    : `Your auto-marked multiple-choice score is ${score}/8. Score the remaining open responses using the rubric below.`;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

startButton.addEventListener("click", startTimer);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitAssessment(false);
});
document.querySelector("#printTest").addEventListener("click", () => window.print());
document.querySelector("#resetTest").addEventListener("click", () => window.location.reload());
document.querySelector("#retakeTest").addEventListener("click", () => window.location.reload());

updateClock();
