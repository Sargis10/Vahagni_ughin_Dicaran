import { EVIDENCE } from '../../content/evidence.js';
import { storytellerSpot } from '../world/layout.js';

// Chapter 1 script. Every line carries an evidence type: the storyteller, the apprentice and
// the shore are fiction; lines that report what a source says cite it with a locator taken
// from internal/content-research.

const KH = 'khorenatsi-1913';

export const chapter1 = {
  id: 'chapter-1',
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
      sourceRefs: [{ sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85–86' }],
    },
    {
      id: 'labels',
      evidence: EVIDENCE.SCHOLARLY,
      title: 'Նայիր պիտակներին',
      text: 'Յուրաքանչյուր տողի կողքին կտեսնես պիտակ՝ սկզբնաղբյուր, գիտնականի տեսակետ կամ գեղարվեստական հորինվածք։ Այդպես միշտ կիմանաս, թե որն է աղբյուրը, և որը՝ պատմություն։',
      labelsDemo: true,
    },
  ],
  objectives: [
    {
      id: 'meet-storyteller',
      title: 'Գտիր ծեր պատմողին օջախի մոտ',
      target: 'storyteller',
      reward: { xp: 10 },
    },
  ],
  interactables: [
    {
      id: 'storyteller',
      kind: 'npc',
      name: 'Ծեր պատմողը',
      position: storytellerSpot,
      radius: 2.6,
      prompt: 'Խոսել պատմողի հետ',
      markerHeight: 2.3,
    },
  ],
  dialogues: {
    'storyteller-meet': {
      speaker: 'storyteller',
      lines: [
        {
          evidence: EVIDENCE.FICTIONAL,
          text: 'Ա՜, եկար, աշակերտ։ Մոտեցիր կրակին։ Այսօր քեզ մի հին երգի մասին եմ պատմելու։',
        },
        {
          evidence: EVIDENCE.PRIMARY,
          text: 'Մովսես Խորենացին իր «Հայոց պատմության» մեջ գրի է առել Վահագնի ծննդյան երգի մի հատված։',
          sourceRefs: [{ sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85–86' }],
        },
        {
          evidence: EVIDENCE.PRIMARY,
          text: 'Նա գրում է, որ իրենց ականջով լսել են, թե ինչպես ոմանք այս երգը երգում էին փանդիռով։',
          sourceRefs: [{ sourceId: KH, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 4–5' }],
        },
        {
          evidence: EVIDENCE.FICTIONAL,
          text: 'Ես ինքս հորինված պատմող եմ, իսկ այս ափը՝ հորինված վայր։ Բայց այն, ինչ ասում եմ աղբյուրից, կարող ես ստուգել. նայիր ամեն տողի պիտակին։',
        },
        {
          evidence: EVIDENCE.FICTIONAL,
          text: 'Շրջիր ափով, նայիր եղեգնուտին և ծովին։ Շուտով երգի հետքերը կփնտրենք միասին։',
        },
      ],
      onComplete: [{ type: 'complete-objective', objectiveId: 'meet-storyteller' }],
    },
    'storyteller-idle': {
      speaker: 'storyteller',
      lines: [
        {
          evidence: EVIDENCE.FICTIONAL,
          text: 'Ծովը այսօր ծիրանի է, աշակերտ։ Շրջիր ափով և վերադարձիր, երբ ուզես։',
        },
      ],
    },
  },
  speakers: {
    storyteller: { name: 'Ծեր պատմողը', evidence: EVIDENCE.FICTIONAL },
    apprentice: { name: 'Դու՝ աշակերտը', evidence: EVIDENCE.FICTIONAL },
  },
  /** Decides what interacting with something does in the current chapter state. */
  resolveInteraction(id, state) {
    if (id === 'storyteller') {
      return { type: 'dialogue', id: state.isDone('meet-storyteller') ? 'storyteller-idle' : 'storyteller-meet' };
    }
    return null;
  },
  isInteractableActive() {
    return true;
  },
};

export const chaptersScripts = { [chapter1.id]: chapter1 };
