import { EVIDENCE } from '../../content/evidence.js';
import { SONG_QUOTE } from '../../content/entries/mythology.js';
import { chapter1QuestionsById } from '../../content/quiz/chapter1.js';
import { fragmentSpots, redReed, storytellerSpot } from '../world/layout.js';

// Chapter 1 script. Every line carries an evidence type: the storyteller, the apprentice, the
// shore and the glowing stones are fiction; lines that report what a source says cite it with
// a locator taken from internal/content-research.

const KH = 'khorenatsi-1913';
const PETROSYAN = 'petrosyan-2021';
const SONG = { sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85–86' };

export const CHAPTER_ID = 'chapter-1';
export const QUIZ_PASS_SCORE = 4;

export const fragments = [
  {
    id: 'fragment-1',
    position: fragmentSpots[1],
    title: 'Երկնում էին երեքը',
    evidence: EVIDENCE.PRIMARY,
    text: 'Երգում երկնում էին երկինքը, երկիրը և ծիրանի ծովը։ «Երկնել» նշանակում է ծննդաբերության ցավեր ունենալ։',
    quote: SONG_QUOTE,
    sourceRefs: [{ sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 17' }],
    entrySlug: 'vahagni-tsnund',
  },
  {
    id: 'fragment-2',
    position: fragmentSpots[0],
    title: 'Կարմիր եղեգնիկը',
    evidence: EVIDENCE.PRIMARY,
    text: 'Ծովում երկունք ուներ նաև կարմիր եղեգնիկը։ Եղեգի փողից ծուխ էր ելնում, բոց էր ելնում, և բոցից վազում էր շիկահեր մի պատանի։',
    sourceRefs: [{ sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 1–3' }],
    entrySlug: 'vahagni-tsnund',
  },
  {
    id: 'fragment-3',
    position: fragmentSpots[2],
    title: 'Հրե պատանին',
    evidence: EVIDENCE.PRIMARY,
    text: 'Պատանին հուր ուներ որպես մազ, բոց՝ որպես մորուք, իսկ նրա աչուկները արեգակներ էին։',
    sourceRefs: [{ sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 3–4' }],
    entrySlug: 'vahagn',
  },
  {
    id: 'fragment-4',
    position: fragmentSpots[3],
    title: 'Ծովը և Ծովինարը',
    evidence: EVIDENCE.SCHOLARLY,
    text: 'Արմեն Պետրոսյանը (2021) առաջարկում է, որ «ծով ծիրանի» արտահայտությունը պարունակում է Ծովինարի՝ «Սասնա ծռերի» երկվորյակների մոր անվան հնչյունները։',
    note: 'Սա գիտնականի վարկած է, ոչ թե Խորենացու տեքստում գրված փաստ։ Ծովինարը երգում չի հիշատակվում։',
    sourceRefs: [{ sourceId: PETROSYAN, locator: 'էջ 148–149' }],
    entrySlug: 'vahagni-tsnund',
  },
];

export const quizQuestionIds = ['q1-source', 'q2-three-in-labor', 'q3-reed', 'q4-appearance', 'q6-how-known', 'q8-evidence-type'];

export const choice = {
  key: 'record-song',
  question: 'Ինչպե՞ս ես գրի առնում երգը քո մատյանում։',
  evidence: EVIDENCE.FICTIONAL,
  options: [
    {
      id: 'source-only',
      title: 'Գրել միայն այն, ինչ ասում է աղբյուրը',
      text: 'Խորենացու երգը՝ որպես սկզբնաղբյուր, իսկ գիտնականների տեսակետները՝ առանձին, հեղինակի անունով։',
      badge: 'careful-chronicler',
      ending: 'ending-careful',
    },
    {
      id: 'retell',
      title: 'Վերապատմել երգը իմ բառերով',
      text: 'Պատմել երգը գեղարվեստորեն, բայց լուսանցքում հստակ նշել, թե որն է իմ հորինվածքը։',
      badge: 'storyteller',
      ending: 'ending-retell',
    },
  ],
};

const objectives = [
  {
    id: 'meet-storyteller',
    title: 'Գտիր ծեր պատմողին օջախի մոտ',
    target: 'storyteller',
    reward: { xp: 10 },
  },
  {
    id: 'collect-fragments',
    title: 'Գտիր երգի բեկորները ափին',
    parts: fragments.map((fragment) => fragment.id),
    partReward: { xp: 10 },
    requires: ['meet-storyteller'],
    target: 'fragments',
  },
  {
    id: 'reed-challenge',
    title: 'Կարմիր եղեգի մոտ պատասխանիր հարցերին',
    requires: ['collect-fragments'],
    target: 'red-reed',
    reward: { xp: 20 },
  },
  {
    id: 'record-song',
    title: 'Վերադարձիր պատմողի մոտ և գրի առ երգը',
    requires: ['reed-challenge'],
    target: 'storyteller',
  },
];

const interactables = [
  {
    id: 'storyteller',
    kind: 'npc',
    position: storytellerSpot,
    radius: 2.6,
    prompt: 'Խոսել պատմողի հետ',
    markerHeight: 2.3,
  },
  ...fragments.map((fragment, index) => ({
    id: fragment.id,
    kind: 'fragment',
    position: fragment.position,
    radius: 2,
    prompt: `Զննել լուսավոր քարը (${index + 1}/${fragments.length})`,
    markerHeight: 2.4,
  })),
  {
    id: 'red-reed',
    kind: 'reed',
    position: redReed,
    radius: 2.4,
    prompt: 'Մոտենալ կարմիր եղեգին',
    markerHeight: 3.2,
  },
];

const fiction = (text) => ({ evidence: EVIDENCE.FICTIONAL, text });

const dialogues = {
  'storyteller-meet': {
    speaker: 'storyteller',
    lines: [
      fiction('Ա՜, եկար, աշակերտ։ Մոտեցիր կրակին։ Այսօր քեզ մի հին երգի մասին եմ պատմելու։'),
      {
        evidence: EVIDENCE.PRIMARY,
        text: 'Մովսես Խորենացին իր «Հայոց պատմության» մեջ գրի է առել Վահագնի ծննդյան երգի մի հատված։',
        sourceRefs: [SONG],
      },
      {
        evidence: EVIDENCE.PRIMARY,
        text: 'Նա գրում է, որ իրենց ականջով լսել են, թե ինչպես ոմանք այս երգը երգում էին փանդիռով։',
        sourceRefs: [{ sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 4–5' }],
      },
      fiction('Ես ինքս հորինված պատմող եմ, իսկ այս ափը՝ հորինված վայր։ Բայց այն, ինչ ասում եմ աղբյուրից, կարող ես ստուգել․ նայիր ամեն տողի պիտակին։'),
      fiction('Երգը ցրվել է այս ափով, ինչպես կայծերը կրակից։ Չորս լուսավոր քար կգտնես, և ամեն մեկը մի բեկոր է պահում։ Գնա՛, աշակերտ։'),
    ],
    onComplete: [{ type: 'complete-objective', objectiveId: 'meet-storyteller' }],
  },
  'storyteller-hint': {
    speaker: 'storyteller',
    lines: [
      fiction('Բեկորները ցրված են ափով՝ եղեգնուտում, ավերակ սյուների մոտ և ժայռերի կողքին։ Նայիր լուսավոր քարերին։'),
    ],
  },
  'storyteller-to-reed': {
    speaker: 'storyteller',
    lines: [
      fiction('Չորս բեկորն էլ գտար։ Հիմա գնա կարմիր եղեգի մոտ՝ ջրի եզրին։ Այնտեղ կստուգես՝ ինչ ես հիշում։'),
    ],
  },
  'reed-after': {
    speaker: 'narrator',
    lines: [fiction('Կարմիր եղեգը լուռ օրորվում է քամուց։ Պատմողը քեզ սպասում է օջախի մոտ։')],
  },
  'storyteller-choice': {
    speaker: 'storyteller',
    lines: [
      fiction('Դու լավ ես լսել, աշակերտ։ Հիմա քո հերթն է՝ երգը գրի առնել մատյանում։'),
      fiction('Մատենագիրը կարող է գրել միայն այն, ինչ ասում է աղբյուրը։ Կամ կարող է վերապատմել՝ իր բառերով։ Երկու ճանապարհն էլ ազնիվ է, եթե պարզ նշում ես, թե որն ինչ է։'),
    ],
    onComplete: [{ type: 'open-choice' }],
  },
  'ending-careful': {
    speaker: 'storyteller',
    lines: [
      fiction('Իմաստուն ընտրություն։ Քո մատյանում ամեն տող ունի իր տեղը՝ Խորենացու երգը՝ որպես սկզբնաղբյուր, Պետրոսյանի միտքը՝ որպես գիտնականի տեսակետ։'),
      {
        evidence: EVIDENCE.PRIMARY,
        text: `Իսկ երգն ինքը սկսվում է այսպես՝ «${SONG_QUOTE.text}»։`,
        sourceRefs: [{ sourceId: SONG_QUOTE.sourceId, locator: SONG_QUOTE.locator }],
      },
      fiction('Ով կարդա քո մատյանը, կկարողանա ստուգել ամեն բառ։ Սա է մատենագրի պատիվը։'),
    ],
    onComplete: [{ type: 'complete-objective', objectiveId: 'record-song' }, { type: 'complete-chapter' }],
  },
  'ending-retell': {
    speaker: 'storyteller',
    lines: [
      fiction('Ուրեմն դու էլ ես պատմող։ Գրիր քո պատմությունը, բայց լուսանցքում նշիր՝ «Սա իմ հորինվածքն է»։'),
      {
        evidence: EVIDENCE.PRIMARY,
        text: `Իսկ իսկական երգից պահիր գոնե առաջին տողը, որ ընթերցողը գտնի աղբյուրը՝ «${SONG_QUOTE.text}»։`,
        sourceRefs: [{ sourceId: SONG_QUOTE.sourceId, locator: SONG_QUOTE.locator }],
      },
      fiction('Պատմողները երգը կենդանի են պահում, իսկ մատենագիրները՝ ճշմարիտ։ Լավ է, երբ մեկը մյուսին չի խառնում։'),
    ],
    onComplete: [{ type: 'complete-objective', objectiveId: 'record-song' }, { type: 'complete-chapter' }],
  },
  'storyteller-done': {
    speaker: 'storyteller',
    lines: [
      fiction('Երգը գրի է առնված։ Եթե ուզում ես, շրջիր ափով, իսկ ընտրացանկից կարող ես գլուխը սկսել նորից։'),
    ],
  },
};

export const chapter1 = {
  id: CHAPTER_ID,
  intro: [
    {
      id: 'frame',
      evidence: EVIDENCE.FICTIONAL,
      title: 'Ծովափնյա օջախը',
      text: 'Դու աշակերտ մատենագիր ես։ Ծեր պատմողը քեզ սպասում է ծովափին՝ իր օջախի մոտ։ Այս ափը, պատմողն ու աշակերտը հորինված են խաղի համար։',
    },
    {
      id: 'song',
      evidence: EVIDENCE.PRIMARY,
      title: 'Երգը իրական է',
      text: 'Վահագնի ծննդյան երգի հատվածը պահպանել է Մովսես Խորենացին «Հայոց պատմության» Ա գրքում։ Խաղում այդ մասին ամեն տեղեկություն ունի իր աղբյուրը։',
      sourceRefs: [SONG],
    },
    {
      id: 'labels',
      evidence: EVIDENCE.SCHOLARLY,
      title: 'Նայիր պիտակներին',
      text: 'Յուրաքանչյուր տողի կողքին կտեսնես պիտակ՝ սկզբնաղբյուր, գիտնականի տեսակետ կամ գեղարվեստական հորինվածք։ Այդպես միշտ կիմանաս, թե որն է աղբյուրը, և որն է՝ խաղի հորինվածք։',
      labelsDemo: true,
    },
  ],
  objectives,
  interactables,
  dialogues,
  fragments,
  choice,
  quiz: { questionIds: quizQuestionIds, passScore: QUIZ_PASS_SCORE },
  rewards: {
    chapter: { xp: 40, badge: 'song-keeper' },
    quizCorrect: { xp: 5 },
    perfectQuiz: { badge: 'sharp-eye' },
  },
  speakers: {
    storyteller: { name: 'Ծեր պատմողը' },
    narrator: { name: 'Պատմության ձայնը' },
  },
  completion: {
    learnedEntrySlugs: ['vahagni-tsnund', 'vahagn', 'tigran-yervandyan'],
    sourceIds: [KH, PETROSYAN],
  },

  /** Decides what interacting with something does in the current chapter state. */
  resolveInteraction(id, state) {
    if (id === 'storyteller') {
      if (!state.isDone('meet-storyteller')) return { type: 'dialogue', id: 'storyteller-meet' };
      if (state.isComplete && state.isDone('record-song')) return { type: 'dialogue', id: 'storyteller-done' };
      if (state.isDone('reed-challenge')) return { type: 'dialogue', id: 'storyteller-choice' };
      if (objectiveDone(state, 'collect-fragments')) return { type: 'dialogue', id: 'storyteller-to-reed' };
      return { type: 'dialogue', id: 'storyteller-hint' };
    }
    if (id === 'red-reed') {
      if (state.isDone('reed-challenge')) return { type: 'dialogue', id: 'reed-after' };
      if (objectiveDone(state, 'collect-fragments')) return { type: 'quiz' };
      return null;
    }
    if (fragments.some((fragment) => fragment.id === id) && !state.isDone(id)) {
      return { type: 'fragment', id };
    }
    return null;
  },

  isInteractableActive(id, state) {
    if (id === 'storyteller') return true;
    if (id === 'red-reed') return objectiveDone(state, 'collect-fragments');
    return state.isDone('meet-storyteller') && !state.isDone(id);
  },

  /** The 3D position the objective marker should hover over, if any. */
  markerTargets(state) {
    const current = state.current;
    if (!current) return [];
    if (current.target === 'fragments') return fragments.filter((f) => !state.isDone(f.id)).map((f) => f.id);
    return [current.target];
  },
};

function objectiveDone(state, objectiveId) {
  return state.objectives.find((objective) => objective.id === objectiveId)?.done ?? false;
}

export function getQuizQuestions() {
  return quizQuestionIds.map((id) => chapter1QuestionsById[id]);
}

export const chaptersScripts = { [chapter1.id]: chapter1 };
