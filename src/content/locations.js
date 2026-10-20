/**
 * Locations on the world map. The map is a stylised game map: every location is invented
 * for the game (`isFictional: true`) unless explicitly documented otherwise, and none
 * of them depicts a real sacred place.
 *
 * Conditions (see progress/conditions.js):
 *   { always: true } | { chapter: id } | { objective: 'chapter:objective' } | { discovered: n }
 *   { all: [conditions] } | { any: [conditions] } | { never: true }
 */
export const locations = [
  {
    id: 'hearth',
    name: 'Պատմողի օջախ',
    isFictional: true,
    chapterId: 'chapter-1',
    position: { x: 45, y: 72 },
    description:
      'Ծովափնյա փոքր օջախ, որտեղ ծեր պատմողը սպասում է իր աշակերտին։ Այստեղից է սկսվում առաջին գլուխը։',
    unlockWhen: { always: true },
    completeWhen: { objective: 'chapter-1:meet-storyteller' },
    action: { type: 'chapter', chapterId: 'chapter-1' },
    connections: ['reed-shore', 'archive-hall'],
  },
  {
    id: 'reed-shore',
    name: 'Եղեգնուտի ափ',
    isFictional: true,
    inspiredByEntryId: 'vahagn-birth-tradition',
    chapterId: 'chapter-1',
    position: { x: 31, y: 45 },
    description:
      'Եղեգներով ծածկված ափ, որտեղ թաքնված են երգի բեկորները։ Վայրը հորինված է խաղի համար և ոգեշնչված է ծննդյան ավանդության պատկերներով։',
    unlockWhen: { objective: 'chapter-1:meet-storyteller' },
    completeWhen: { chapter: 'chapter-1' },
    action: { type: 'chapter', chapterId: 'chapter-1' },
    connections: ['future-1'],
  },
  {
    id: 'archive-hall',
    name: 'Աղբյուրների դարան',
    isFictional: true,
    position: { x: 55, y: 28 },
    description:
      'Մատենագիրների հորինված դարան, որը խաղում ներկայացնում է արխիվը։ Բացահայտեք առնվազն երեք գրառում՝ այս վայրը լրացնելու համար։',
    unlockWhen: { always: true },
    completeWhen: { discovered: 3 },
    action: { type: 'link', to: '/archive' },
    connections: [],
  },
  {
    id: 'future-1',
    name: 'Ապագա գլուխ',
    isFictional: true,
    isUnreleased: true,
    position: { x: 71, y: 60 },
    description: 'Այս գլուխը դեռ մշակված չէ։ Այն կավելանա հետագայում՝ նույնպես աղբյուրներով ստուգված բովանդակությամբ։',
    unlockWhen: { never: true },
    completeWhen: { never: true },
    connections: ['future-2'],
  },
  {
    id: 'future-2',
    name: 'Ապագա գլուխ',
    isFictional: true,
    isUnreleased: true,
    position: { x: 85, y: 30 },
    description: 'Այս գլուխը դեռ մշակված չէ։',
    unlockWhen: { never: true },
    completeWhen: { never: true },
    connections: [],
  },
];

export const locationsById = Object.fromEntries(locations.map((location) => [location.id, location]));
