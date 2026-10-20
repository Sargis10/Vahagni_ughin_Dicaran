// Chapter metadata used by the map and the game. Gameplay details live in `src/game/chapters/`.
export const chapters = [
  {
    id: 'chapter-1',
    number: 1,
    title: 'Երգի հետքերով',
    subtitle: 'Վահագնի ծննդյան ավանդությունը',
    relatedEntryIds: ['vahagn', 'vahagn-birth-tradition'],
    startLocationId: 'hearth',
  },
];

export const chaptersById = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter]));
