import { objectiveKey } from '../../progress/rules.js';

/** Pure view of a chapter's progress, derived from the saved progress state. */
export function getChapterState(chapter, progress) {
  const isDone = (objectiveId) => progress.completedObjectives.includes(objectiveKey(chapter.id, objectiveId));

  const objectives = chapter.objectives.map((objective) => {
    const parts = objective.parts?.map((partId) => ({ id: partId, done: isDone(partId) })) ?? null;
    const done = parts ? parts.every((part) => part.done) : isDone(objective.id);
    return { ...objective, parts, done, doneCount: parts ? parts.filter((p) => p.done).length : done ? 1 : 0 };
  });

  const isUnlocked = (objective) => (objective.requires ?? []).every((id) => objectives.find((o) => o.id === id)?.done);
  const current = objectives.find((objective) => !objective.done && isUnlocked(objective)) ?? null;

  return {
    objectives: objectives.map((objective) => ({ ...objective, unlocked: isUnlocked(objective) })),
    current,
    isDone,
    allObjectivesDone: objectives.every((objective) => objective.done),
    isComplete: progress.completedChapters.includes(chapter.id),
  };
}
