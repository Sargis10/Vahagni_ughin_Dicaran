import hy from '../../i18n/hy.js';

export function ObjectiveTracker({ chapter, state }) {
  const t = hy.play;
  const visible = state.objectives.filter((objective) => objective.done || objective.unlocked);
  return (
    <section className="hud-objectives hud-panel" aria-labelledby="objectives-title">
      <p className="hud-objectives__chapter">{hy.map.chapterLabel(chapter.number)} · {chapter.title}</p>
      <h2 id="objectives-title" className="visually-hidden">
        {t.objectivesTitle}
      </h2>
      <ul role="list" aria-live="polite">
        {visible.map((objective) => (
          <li key={objective.id} className={objective.done ? 'is-done' : 'is-current'}>
            <span className="hud-objectives__mark" aria-hidden="true">
              {objective.done ? '✓' : '◆'}
            </span>
            <span>
              {objective.title}
              {objective.parts && ` (${objective.doneCount}/${objective.parts.length})`}
              <span className="visually-hidden"> — {objective.done ? t.objectiveDone : t.objectiveOpen}</span>
            </span>
          </li>
        ))}
        {state.allObjectivesDone && <li className="is-done">{t.allDone}</li>}
      </ul>
    </section>
  );
}
