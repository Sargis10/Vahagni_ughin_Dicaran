import { VERIFICATION } from './evidence.js';

/**
 * Central source registry. Every factual claim in the app points here by `id`.
 *
 * Shape:
 * {
 *   id, kind: 'primary' | 'secondary',
 *   title, author, year?, publication?, url?, doi?, language,
 *   verification: { status, checkedOn, note },
 *   description,
 * }
 *
 * Only bibliographic data that was actually checked is recorded. Unknown fields are omitted,
 * never guessed.
 */
export const sources = [
  {
    id: 'khorenatsi-history',
    kind: 'primary',
    title: '«Հայոց պատմություն»',
    author: 'Մովսես Խորենացի',
    language: 'grabar',
    verification: {
      status: VERIFICATION.UNVERIFIED,
      checkedOn: '2026-10-20',
      note: 'Կոնկրետ հատվածը դեռ չի ստուգվել ընտրված հրատարակության մեջ։ Էջահամարներ չեն նշվում։',
    },
    description:
      'Հայ պատմագրության հիմնական երկերից մեկը։ Թվագրումը գիտական վեճի առարկա է, իսկ ճշգրիտ հատվածները պետք է ստուգել կոնկրետ հրատարակությամբ։',
  },
  {
    id: 'iranica-movses-xorenaci',
    kind: 'secondary',
    title: '«MOVSĒS XORENAC‘I»',
    author: 'Nina Garsoïan',
    year: 2000,
    publication: 'Encyclopaedia Iranica (թարմացված՝ 2018-05-14)',
    url: 'https://www.iranicaonline.org/articles/movses-xorenaci/',
    language: 'en',
    verification: {
      status: VERIFICATION.PARTIAL,
      checkedOn: '2026-10-20',
      note: 'Կայքն ուղղակիորեն չբացվեց (HTTP 403)։ Բովանդակությունը կարդացվել է Wayback Machine-ի պատճենից։',
    },
    description:
      'Հանրագիտարանային հոդված Մովսես Խորենացու, նրա երկի կառուցվածքի, աղբյուրների և թվագրման վեճի մասին։',
  },
  {
    id: 'petrosyan-vahagn-song',
    kind: 'secondary',
    title:
      '«„Վահագնի երգը“ և հայկական էպոսը. Նոր տեսակետ հայկական էպոսի ծագման և ձևավորման վերաբերյալ»',
    author: 'Արմեն Պետրոսյան',
    year: 2021,
    publication: 'ՀՀ ԳԱԱ «Գիտություն» հրատարակչություն, Երևան',
    url: 'https://arar.sci.am/dlibra/publication/314593/edition/289051?language=hye',
    doi: '10.52853/18294073-2021.3.27-147',
    language: 'hy',
    verification: {
      status: VERIFICATION.PARTIAL,
      checkedOn: '2026-10-20',
      note: 'Էջը և PDF-ը հասանելի են։ Էջերի միջակայքը մետատվյալներում և ֆայլի անվան մեջ տարբեր է, ուստի էջեր չեն նշվում։',
    },
    description:
      'Գիտական հոդված, որն առաջարկում է «Վահագնի երգի» և հայկական էպոսի կապի մասին վարկած։ Ներկայացվում է որպես մեկնաբանություն, ոչ թե փաստ։',
  },
];

export const sourcesById = Object.fromEntries(sources.map((source) => [source.id, source]));
