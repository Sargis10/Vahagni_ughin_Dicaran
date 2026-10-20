import { EVIDENCE } from '../evidence.js';

// Original characters and concepts created for the game. They are labelled as fiction everywhere.
export const fictionalEntries = [
  {
    id: 'storyteller',
    slug: 'patmogh',
    kind: 'character',
    name: 'Ծեր պատմողը',
    evidenceType: EVIDENCE.FICTIONAL,
    summary:
      'Խաղի համար ստեղծված կերպար՝ ծովափնյա օջախի մոտ ապրող պատմող, որը խաղացողին ուղեկցում է առաջին գլխում։',
    claims: [
      {
        id: 'storyteller-role',
        text: 'Նա պատմական կամ դիցաբանական կերպար չէ։ Նրա խոսքերը գրված են խաղի համար և նշված են որպես գեղարվեստական։',
        evidenceType: EVIDENCE.FICTIONAL,
        sourceIds: [],
      },
    ],
    relatedIds: ['apprentice', 'song-fragments'],
    chapterIds: ['chapter-1'],
  },
  {
    id: 'apprentice',
    slug: 'ashakert',
    kind: 'character',
    name: 'Աշակերտ մատենագիրը',
    evidenceType: EVIDENCE.FICTIONAL,
    summary:
      'Խաղացողի կերպարը՝ երիտասարդ մատենագիր, որը սովորում է տարբերել աղբյուրի վկայությունը հետագա մեկնաբանությունից։',
    claims: [
      {
        id: 'apprentice-role',
        text: 'Կերպարը ստեղծված է խաղի համար և չունի պատմական նախատիպ։',
        evidenceType: EVIDENCE.FICTIONAL,
        sourceIds: [],
      },
    ],
    relatedIds: ['storyteller'],
    chapterIds: ['chapter-1'],
  },
  {
    id: 'song-fragments',
    slug: 'ergi-bekorner',
    kind: 'concept',
    name: 'Երգի բեկորները',
    evidenceType: EVIDENCE.FICTIONAL,
    summary:
      'Խաղային մեխանիկա․ ափին ցրված լուսավոր քարեր, որոնցից յուրաքանչյուրը բացում է աղբյուրներով ստուգված մեկ տեղեկություն։',
    claims: [
      {
        id: 'song-fragments-mechanic',
        text: 'Քարերն իրենք հորինված են։ Ճշմարիտ է միայն այն տեղեկությունը, որը նրանք բացում են, և այն միշտ ունի իր աղբյուրը։',
        evidenceType: EVIDENCE.FICTIONAL,
        sourceIds: [],
      },
    ],
    relatedIds: ['storyteller'],
    chapterIds: ['chapter-1'],
  },
];
