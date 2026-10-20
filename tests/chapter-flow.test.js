import { describe, expect, it } from 'vitest';
import { getChapterState } from '../src/game/chapters/chapterState.js';
import { chapter1, getQuizQuestions } from '../src/game/chapters/chapter1.js';
import { buildQuizRound, isCorrectOption, quizResult, scoreRound, shuffle } from '../src/game/quiz/quiz.js';
import { chapter1Questions } from '../src/content/quiz/chapter1.js';
import { badgesById } from '../src/content/badges.js';
import { sourcesById } from '../src/content/sources.js';
import { getEntryBySlug } from '../src/content/index.js';
import { EVIDENCE } from '../src/content/evidence.js';
import { createInitialProgress, reduceProgress } from '../src/progress/rules.js';

function seeded(seed = 1) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const ID = chapter1.id;

function complete(progress, objectiveId) {
  const objective = chapter1.objectives.find((o) => o.id === objectiveId);
  const parent = chapter1.objectives.find((o) => o.parts?.includes(objectiveId));
  return reduceProgress(progress, {
    type: 'complete-objective',
    chapterId: ID,
    objectiveId,
    reward: objective?.reward ?? parent?.partReward,
  });
}

function runEffects(progress, effects = []) {
  let next = progress;
  for (const effect of effects) {
    if (effect.type === 'complete-objective') next = complete(next, effect.objectiveId);
    if (effect.type === 'complete-chapter') {
      next = reduceProgress(next, { type: 'complete-chapter', chapterId: ID, reward: chapter1.rewards.chapter });
    }
  }
  return next;
}

function answerAll(progress, correctCount) {
  let next = progress;
  getQuizQuestions().forEach((question, index) => {
    const isCorrect = index < correctCount;
    next = reduceProgress(next, {
      type: 'answer-question',
      questionKey: `${ID}:${question.id}`,
      optionId: isCorrect ? 'correct' : 'd0',
      isCorrect,
      reward: chapter1.rewards.quizCorrect,
    });
  });
  return next;
}

function playToChoice(perfect = true) {
  let progress = createInitialProgress();
  progress = runEffects(progress, chapter1.dialogues['storyteller-meet'].onComplete);
  for (const fragment of chapter1.fragments) progress = complete(progress, fragment.id);
  const total = getQuizQuestions().length;
  progress = answerAll(progress, perfect ? total : chapter1.quiz.passScore);
  progress = complete(progress, 'reed-challenge');
  if (perfect) {
    progress = reduceProgress(progress, {
      type: 'grant-reward',
      rewardId: `${ID}:perfect-quiz`,
      reward: chapter1.rewards.perfectQuiz,
    });
  }
  return progress;
}

function choose(progress, optionId) {
  const option = chapter1.choice.options.find((o) => o.id === optionId);
  const next = reduceProgress(progress, {
    type: 'make-choice',
    choiceKey: `${ID}:${chapter1.choice.key}`,
    optionId,
    reward: { badge: option.badge },
  });
  return runEffects(next, chapter1.dialogues[option.ending].onComplete);
}

describe('quiz helpers', () => {
  it('shuffles without losing or duplicating items', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const result = shuffle(list, seeded(7));
    expect([...result].sort()).toEqual(list);
    expect(list).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('builds a round with one correct option per question', () => {
    const round = buildQuizRound(getQuizQuestions(), seeded(3));
    for (const question of round) {
      expect(question.options).toHaveLength(question.distractors.length + 1);
      expect(question.options.filter((o) => isCorrectOption(o.id))).toHaveLength(1);
      expect(question.options.find((o) => o.id === 'correct').text).toBe(question.correct);
    }
  });

  it('scores and decides pass and perfect', () => {
    const answers = { a: 'correct', b: 'd1', c: 'correct', d: 'correct', e: 'correct', f: 'd0' };
    expect(scoreRound(answers)).toBe(4);
    expect(quizResult(answers, 6, 4)).toEqual({ score: 4, total: 6, passed: true, perfect: false });
    expect(quizResult({ a: 'd2' }, 6, 4).passed).toBe(false);
    expect(quizResult({ a: 'correct', b: 'correct' }, 2, 2).perfect).toBe(true);
  });
});

describe('chapter 1 quiz content', () => {
  it('uses only questions from the research set', () => {
    const ids = new Set(chapter1Questions.map((q) => q.id));
    for (const id of chapter1.quiz.questionIds) expect(ids.has(id), id).toBe(true);
    expect(getQuizQuestions().every(Boolean)).toBe(true);
  });

  it('gives every question an explanation, an evidence type and known sources', () => {
    for (const question of chapter1Questions) {
      expect(question.explanation.length).toBeGreaterThan(20);
      expect(Object.values(EVIDENCE)).toContain(question.evidenceType);
      expect(question.distractors.length).toBeGreaterThanOrEqual(2);
      expect(question.distractors).not.toContain(question.correct);
      expect(question.sourceRefs.length).toBeGreaterThan(0);
      for (const ref of question.sourceRefs) expect(sourcesById[ref.sourceId], ref.sourceId).toBeDefined();
    }
  });

  it('can be passed and is not trivially passed', () => {
    const total = getQuizQuestions().length;
    expect(chapter1.quiz.passScore).toBeGreaterThan(total / 2);
    expect(chapter1.quiz.passScore).toBeLessThanOrEqual(total);
  });
});

describe('chapter 1 fragments, choice and rewards', () => {
  it('labels fragments and cites known sources and entries', () => {
    for (const fragment of chapter1.fragments) {
      expect(fragment.evidence).not.toBe(EVIDENCE.FICTIONAL);
      expect(fragment.sourceRefs.length).toBeGreaterThan(0);
      for (const ref of fragment.sourceRefs) {
        expect(sourcesById[ref.sourceId]).toBeDefined();
        expect(ref.locator).toBeTruthy();
      }
      expect(getEntryBySlug(fragment.entrySlug), fragment.entrySlug).toBeTruthy();
    }
  });

  it('marks the scholarly fragment with an author name', () => {
    const scholarly = chapter1.fragments.filter((f) => f.evidence === EVIDENCE.SCHOLARLY);
    expect(scholarly.length).toBeGreaterThan(0);
    for (const fragment of scholarly) expect(fragment.text).toMatch(/Պետրոսյան/);
  });

  it('refers only to existing badges, dialogues, entries and sources', () => {
    const badgeIds = [chapter1.rewards.chapter.badge, chapter1.rewards.perfectQuiz.badge, ...chapter1.choice.options.map((o) => o.badge)];
    for (const id of badgeIds) expect(badgesById[id], id).toBeDefined();
    for (const option of chapter1.choice.options) expect(chapter1.dialogues[option.ending]).toBeDefined();
    for (const slug of chapter1.completion.learnedEntrySlugs) expect(getEntryBySlug(slug), slug).toBeTruthy();
    for (const id of chapter1.completion.sourceIds) expect(sourcesById[id], id).toBeDefined();
  });
});

describe('chapter 1 playthrough', () => {
  it('walks objectives in order: storyteller, fragments, reed, choice', () => {
    let progress = createInitialProgress();
    let state = getChapterState(chapter1, progress);
    expect(chapter1.resolveInteraction('red-reed', state)).toBeNull();
    expect(chapter1.isInteractableActive('fragment-1', state)).toBe(false);

    progress = runEffects(progress, chapter1.dialogues['storyteller-meet'].onComplete);
    state = getChapterState(chapter1, progress);
    expect(state.current.id).toBe('collect-fragments');
    expect(chapter1.markerTargets(state)).toHaveLength(chapter1.fragments.length);
    expect(chapter1.resolveInteraction('fragment-2', state)).toEqual({ type: 'fragment', id: 'fragment-2' });

    for (const fragment of chapter1.fragments) progress = complete(progress, fragment.id);
    state = getChapterState(chapter1, progress);
    expect(state.current.id).toBe('reed-challenge');
    expect(chapter1.markerTargets(state)).toEqual(['red-reed']);
    expect(chapter1.resolveInteraction('fragment-2', state)).toBeNull();
    expect(chapter1.resolveInteraction('storyteller', state).id).toBe('storyteller-to-reed');
    expect(chapter1.resolveInteraction('red-reed', state)).toEqual({ type: 'quiz' });

    progress = complete(progress, 'reed-challenge');
    state = getChapterState(chapter1, progress);
    expect(chapter1.resolveInteraction('red-reed', state).id).toBe('reed-after');
    expect(chapter1.resolveInteraction('storyteller', state).id).toBe('storyteller-choice');
    expect(chapter1.dialogues['storyteller-choice'].onComplete).toEqual([{ type: 'open-choice' }]);
  });

  it('completes the chapter with the expected rewards', () => {
    const progress = choose(playToChoice(true), 'source-only');
    const state = getChapterState(chapter1, progress);
    expect(state.allObjectivesDone).toBe(true);
    expect(state.isComplete).toBe(true);
    expect(progress.completedChapters).toContain(ID);
    expect(progress.badges).toEqual(expect.arrayContaining(['song-keeper', 'sharp-eye', 'careful-chronicler']));
    expect(progress.badges).not.toContain('storyteller');
    // 10 meet + 4×10 fragments + 6×5 quiz + 20 reed + 40 chapter
    expect(progress.xp).toBe(140);
    expect(chapter1.resolveInteraction('storyteller', state).id).toBe('storyteller-done');
  });

  it('gives the other badge and no sharp-eye when the quiz is only passed', () => {
    const progress = choose(playToChoice(false), 'retell');
    expect(progress.badges).toContain('storyteller');
    expect(progress.badges).not.toContain('sharp-eye');
    expect(progress.badges).not.toContain('careful-chronicler');
  });

  it('keeps rewards and completion on replay but never pays twice', () => {
    const first = choose(playToChoice(true), 'source-only');
    const reset = reduceProgress(first, { type: 'reset-chapter', chapterId: ID });
    const state = getChapterState(chapter1, reset);
    expect(state.current.id).toBe('meet-storyteller');
    expect(reset.completedChapters).toContain(ID);
    expect(reset.choices).toEqual({});

    const second = choose(
      (() => {
        let progress = runEffects(reset, chapter1.dialogues['storyteller-meet'].onComplete);
        for (const fragment of chapter1.fragments) progress = complete(progress, fragment.id);
        progress = answerAll(progress, getQuizQuestions().length);
        return complete(progress, 'reed-challenge');
      })(),
      'retell',
    );
    expect(second.xp).toBe(first.xp);
    expect(second.badges).toEqual(expect.arrayContaining(['careful-chronicler', 'storyteller']));
  });
});
