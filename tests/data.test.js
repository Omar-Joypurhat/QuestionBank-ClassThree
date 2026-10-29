import test from "node:test";
import assert from "node:assert/strict";
import { passages, questions, topics } from "../src/data.js";

const unitIds = new Set(topics.map(({ id }) => id));

test("book-aligned bank covers all eight Class 3 English for Today units", () => {
  assert.equal(questions.length, 40);
  assert.equal(topics.length, 8);
  for (const unit of topics) {
    const unitQuestions = questions.filter((question) => question.topic === unit.id);
    assert.equal(unitQuestions.length, 5, `${unit.name} should have five starter questions`);
  }
});

test("question IDs are unique and every question maps to a unit and lesson", () => {
  const ids = questions.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length, "question IDs must be unique");
  for (const question of questions) {
    assert.ok(unitIds.has(question.topic), `${question.id} refers to an unknown unit`);
    assert.ok(question.lesson, `${question.id} should carry its lesson reference`);
    if (question.passageId) assert.ok(passages[question.passageId], `${question.id} refers to an unknown passage`);
  }
});

test("multiple-choice answers point to an available option", () => {
  for (const question of questions.filter(({ type }) => type === "choice")) {
    assert.ok(Array.isArray(question.options) && question.options.length >= 2, `${question.id} needs answer options`);
    assert.ok(Number.isInteger(question.answer), `${question.id} needs an integer answer index`);
    assert.ok(question.answer >= 0 && question.answer < question.options.length, `${question.id} answer index is out of range`);
    assert.ok(question.explanation, `${question.id} needs a learning explanation`);
  }
});

test("writing prompts include a sample response and a helpful tip", () => {
  const writingQuestions = questions.filter(({ type }) => type === "writing");
  assert.equal(writingQuestions.length, 4);
  for (const question of writingQuestions) {
    assert.ok(question.sampleAnswer, `${question.id} needs a sample response`);
    assert.ok(question.tip, `${question.id} needs a writing tip`);
  }
});
