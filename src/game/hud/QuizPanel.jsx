import { useEffect, useRef, useState } from 'react';
import hy from '../../i18n/hy.js';
import { EvidenceBadge } from '../../components/ui/EvidenceBadge.jsx';
import { buildQuizRound, isCorrectOption, quizResult } from '../quiz/quiz.js';
import { SourceRefs } from './SourceRefs.jsx';

/**
 * The reed challenge. Each answer is reported through `onAnswer` as soon as it is chosen,
 * then the sourced explanation is shown. At the end `onFinish(result)` is called.
 */
export function QuizPanel({ questions, passScore, onAnswer, onFinish, onClose }) {
  const t = hy.play.quiz;
  const [attempt, setAttempt] = useState(0);
  const [round, setRound] = useState(() => buildQuizRound(questions));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(null);
  const heading = useRef(null);
  const nextButton = useRef(null);

  const question = round[index];
  const chosen = question ? answers[question.id] : null;

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [index, attempt, finished]);

  useEffect(() => {
    if (chosen) nextButton.current?.focus({ preventScroll: true });
  }, [chosen]);

  const choose = (optionId) => {
    if (chosen) return;
    setAnswers({ ...answers, [question.id]: optionId });
    onAnswer(question.id, optionId, isCorrectOption(optionId));
  };

  const next = () => {
    if (index < round.length - 1) {
      setIndex(index + 1);
      return;
    }
    const result = quizResult(answers, round.length, passScore);
    setFinished(result);
    onFinish(result);
  };

  const retry = () => {
    setAttempt(attempt + 1);
    setRound(buildQuizRound(questions));
    setIndex(0);
    setAnswers({});
    setFinished(null);
  };

  if (finished) {
    return (
      <div className="hud-overlay" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
        <section className="hud-quiz hud-panel">
          <p className="hud-fragment__kicker">{t.title}</p>
          <h2 id="quiz-title" ref={heading} tabIndex={-1}>
            {finished.passed ? t.passedTitle : t.failedTitle}
          </h2>
          <p className="hud-quiz__score">{t.score(finished.score, finished.total)}</p>
          <p className="muted">{finished.passed ? t.passedText : t.failedText(passScore)}</p>
          <div className="hud-quiz__actions">
            {finished.passed ? (
              <button type="button" className="button button--primary" onClick={onClose}>
                {t.continue}
              </button>
            ) : (
              <>
                <button type="button" className="button button--ghost" onClick={onClose}>
                  {t.later}
                </button>
                <button type="button" className="button button--primary" onClick={retry}>
                  {t.retry}
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="hud-overlay" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
      <section className="hud-quiz hud-panel">
        <header className="hud-quiz__header">
          <p className="hud-fragment__kicker">
            {t.title} · {t.progress(index + 1, round.length)}
          </p>
          <button type="button" className="hud-icon-button hud-icon-button--small" onClick={onClose} aria-label={t.close}>
            <span aria-hidden="true">✕</span>
          </button>
        </header>
        <ol className="hud-intro__steps" aria-hidden="true">
          {round.map((item, i) => (
            <li key={item.id} className={i <= index ? 'is-active' : ''} />
          ))}
        </ol>
        <h2 id="quiz-title" ref={heading} tabIndex={-1} className="hud-quiz__question">
          {question.question}
        </h2>
        <fieldset className="hud-quiz__options">
          <legend className="visually-hidden">{t.optionsLegend}</legend>
          {question.options.map((option) => {
            const state = !chosen
              ? ''
              : option.id === 'correct'
                ? ' is-correct'
                : option.id === chosen
                  ? ' is-wrong'
                  : ' is-dimmed';
            return (
              <button
                key={option.id}
                type="button"
                className={`hud-quiz__option${state}`}
                onClick={() => choose(option.id)}
                aria-pressed={chosen === option.id}
                disabled={Boolean(chosen) && chosen !== option.id && option.id !== 'correct'}
              >
                <span>{option.text}</span>
                {chosen && option.id === 'correct' && <span className="visually-hidden"> — {t.correctAnswer}</span>}
              </button>
            );
          })}
        </fieldset>
        {chosen && (
          <div className="hud-quiz__explanation" aria-live="polite">
            <p className={`hud-quiz__verdict${isCorrectOption(chosen) ? ' is-correct' : ' is-wrong'}`}>
              {isCorrectOption(chosen) ? t.right : t.wrong}
            </p>
            <EvidenceBadge type={question.evidenceType} />
            <p>{question.explanation}</p>
            <SourceRefs refs={question.sourceRefs} />
          </div>
        )}
        <div className="hud-quiz__actions">
          <button ref={nextButton} type="button" className="button button--primary" onClick={next} disabled={!chosen}>
            {index < round.length - 1 ? t.next : t.finish}
          </button>
        </div>
      </section>
    </div>
  );
}
