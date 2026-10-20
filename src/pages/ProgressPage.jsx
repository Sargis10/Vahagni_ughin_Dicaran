import { useState } from 'react';
import hy from '../i18n/hy.js';
import { paths } from '../app/navigation.js';
import { badges } from '../content/badges.js';
import { chapters } from '../content/chapters.js';
import { entries, getEntryById } from '../content/index.js';
import { getChapterState } from '../game/chapters/chapterState.js';
import { chaptersScripts, getQuizQuestions } from '../game/chapters/chapter1.js';
import { useProgress } from '../progress/ProgressContext.jsx';
import { BadgeMedal } from '../components/progress/BadgeMedal.jsx';
import { ProgressSummary } from '../components/progress/ProgressSummary.jsx';
import { EntryCard } from '../components/archive/EntryCard.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button, ButtonLink } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';

function BadgeGrid({ earnedIds }) {
  const t = hy.progressPage;
  return (
    <ul className="badge-grid" role="list">
      {badges.map((badge) => {
        const earned = earnedIds.includes(badge.id);
        return (
          <li key={badge.id} className={`badge-tile${earned ? ' badge-tile--earned' : ''}`}>
            <BadgeMedal badge={badge} earned={earned} size={64} />
            <div className="badge-tile__text">
              <h3>{badge.name}</h3>
              <p className="muted">{badge.description}</p>
              <Badge tone={earned ? 'verified' : 'neutral'}>{earned ? t.earned : t.locked}</Badge>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ChapterProgress({ chapter, progress }) {
  const t = hy.progressPage;
  const script = chaptersScripts[chapter.id];
  const state = getChapterState(script, progress);
  const done = state.isComplete;
  const objectivesDone = state.objectives.filter((objective) => objective.done).length;
  const started = objectivesDone > 0;
  const choiceId = progress.choices[`${chapter.id}:${script.choice.key}`];
  const choice = script.choice.options.find((option) => option.id === choiceId);
  const questions = getQuizQuestions();
  const correct = questions.filter((q) => progress.rewardsGranted.includes(`quiz:${chapter.id}:${q.id}`));

  const status = done ? t.chapterDone : started ? t.chapterStarted : t.chapterNew;
  const to = `${paths.game}?chapter=${chapter.id}${done ? '&restart=1' : ''}`;

  return (
    <Card variant="outlined" className="chapter-progress">
      <div className="card__header">
        <div>
          <p className="eyebrow">{hy.map.chapterLabel(chapter.number)}</p>
          <h3 className="card__title">{chapter.title}</h3>
          <p className="muted">{chapter.subtitle}</p>
        </div>
        <Badge tone={done ? 'verified' : started ? 'research' : 'neutral'}>{status}</Badge>
      </div>

      <ol className="objective-list" role="list">
        {state.objectives.map((objective) => (
          <li key={objective.id} className={objective.done ? 'is-done' : ''}>
            <span className="objective-list__mark" aria-hidden="true">
              {objective.done ? '✓' : '○'}
            </span>
            <span>
              {objective.title}
              {objective.parts && ` (${objective.doneCount}/${objective.parts.length})`}
            </span>
            <span className="visually-hidden">
              {' — '}
              {objective.done ? hy.play.objectiveDone : hy.play.objectiveOpen}
            </span>
          </li>
        ))}
      </ol>
      <p className="muted">{t.objectivesCount(objectivesDone, state.objectives.length)}</p>
      {choice && <p>{t.choiceMade(choice.title)}</p>}

      <div className="quiz-summary">
        <h4>{t.quizTitle}</h4>
        <p className="muted">{t.quizCount(correct.length, questions.length)}</p>
        <ul className="quiz-summary__list" role="list">
          {questions.map((question) => {
            const ok = correct.includes(question);
            return (
              <li key={question.id} className={ok ? 'is-correct' : ''}>
                <span aria-hidden="true">{ok ? '✓' : '·'}</span>
                <span>{question.question}</span>
                <span className="visually-hidden"> — {ok ? t.quizCorrectLabel : t.quizOpenLabel}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="button-row">
        <ButtonLink to={to}>{done ? t.replay : started ? t.continue : t.play}</ButtonLink>
      </div>
    </Card>
  );
}

function ResetPanel({ onReset }) {
  const t = hy.progressPage;
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <Card variant="outlined" className="reset-panel">
      <h3 className="card__title">{t.resetTitle}</h3>
      <p className="muted">{t.resetText}</p>
      {confirming ? (
        <div className="reset-panel__confirm" role="alertdialog" aria-labelledby="reset-question">
          <p id="reset-question">
            <strong>{t.resetQuestion}</strong>
          </p>
          <div className="button-row">
            <Button
              variant="primary"
              onClick={() => {
                onReset();
                setConfirming(false);
                setDone(true);
              }}
            >
              {t.resetConfirm}
            </Button>
            <Button variant="ghost" onClick={() => setConfirming(false)} autoFocus>
              {t.resetCancel}
            </Button>
          </div>
        </div>
      ) : (
        <div className="button-row">
          <Button
            variant="secondary"
            onClick={() => {
              setDone(false);
              setConfirming(true);
            }}
          >
            {t.reset}
          </Button>
        </div>
      )}
      <p role="status" className="reset-panel__status">
        {done ? t.resetDone : ''}
      </p>
    </Card>
  );
}

export function ProgressPage() {
  const t = hy.progressPage;
  const { progress, dispatch } = useProgress();
  const discovered = progress.discoveredEntries.map(getEntryById).filter(Boolean);

  return (
    <>
      <PageTitle title={t.pageTitle} />
      <section className="page-hero page-hero--start" aria-labelledby="page-title">
        <div className="container page-hero__inner">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 id="page-title">{t.title}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="summary-title">
        <div className="container">
          <h2 id="summary-title" className="visually-hidden">
            {t.summaryTitle}
          </h2>
          <Card variant="outlined">
            <ProgressSummary />
          </Card>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="badges-title">
        <div className="container">
          <SectionHeading id="badges-title" title={t.badgesTitle} lead={t.badgesLead} />
          <BadgeGrid earnedIds={progress.badges} />
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="chapters-title">
        <div className="container">
          <SectionHeading id="chapters-title" title={t.chaptersTitle} />
          <div className="stack">
            {chapters.map((chapter) =>
              chaptersScripts[chapter.id] ? <ChapterProgress key={chapter.id} chapter={chapter} progress={progress} /> : null,
            )}
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="discovered-title">
        <div className="container">
          <SectionHeading
            id="discovered-title"
            title={t.discoveredTitle}
            lead={t.discoveredLead(discovered.length, entries.length)}
          />
          {discovered.length ? (
            <ul className="grid grid--2 grid--3" role="list">
              {discovered.map((entry) => (
                <li key={entry.id}>
                  <EntryCard entry={entry} discovered />
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">{t.discoveredNone}</p>
          )}
          <div className="button-row">
            <ButtonLink to={paths.archive} variant="secondary">
              {t.openArchive}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="reset-title">
        <div className="container container--narrow">
          <h2 id="reset-title" className="visually-hidden">
            {t.resetTitle}
          </h2>
          <ResetPanel onReset={() => dispatch({ type: 'reset', silent: true })} />
        </div>
      </section>
    </>
  );
}
