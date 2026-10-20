// Pure quiz helpers: building a shuffled round and scoring it.

/** Fisher–Yates shuffle with an injectable random source (for deterministic tests). */
export function shuffle(list, random = Math.random) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Turns question data into a round with shuffled options. The correct option id is "correct". */
export function buildQuizRound(questions, random = Math.random) {
  return questions.map((question) => ({
    ...question,
    options: shuffle(
      [
        { id: 'correct', text: question.correct },
        ...question.distractors.map((text, index) => ({ id: `d${index}`, text })),
      ],
      random,
    ),
  }));
}

export function isCorrectOption(optionId) {
  return optionId === 'correct';
}

export function scoreRound(answers) {
  return Object.values(answers).filter(isCorrectOption).length;
}

export function quizResult(answers, total, passScore) {
  const score = scoreRound(answers);
  return { score, total, passed: score >= passScore, perfect: score === total };
}
