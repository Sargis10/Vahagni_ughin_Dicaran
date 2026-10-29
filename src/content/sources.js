import { VERIFICATION } from './evidence.js';

/**
 * Central source registry, transcribed from the verified research notes
 * (internal/content-research/sources.json, checked 2026-10-20).
 *
 * `citation`, `rights` and `verificationNote` are kept exactly as researched.
 * `shortName` is the label used next to claims; `verification.status` summarises
 * the research note (verified = read from the edition itself).
 */
export const sources = [
  {
    id: 'khorenatsi-1913',
    kind: 'primary-edition',
    shortName: 'Խորենացի (Տփղիս, 1913)',
    title: 'Մովսիսի Խորենացւոյ Պատմութիւն Հայոց',
    citation:
      'Մովսիսի Խորենացւոյ Պատմութիւն Հայոց, աշխատասիրութեամբ Մ. Աբեղեանի եւ Ս. Յարութիւնեանի (Պատմագիրք Հայոց, հատ. Բ, գիրք Ա), Տփղիս, Տպարան Մնացական Մարտիրոսեանցի, 1913։',
    citationLatin: 'Movsēs Xorenacʻi, Patmutʻiwn Hayocʻ, ed. M. Abełean, S. Yarutʻiwnean, Tiflis, 1913.',
    language: 'գրաբար',
    rights: 'Հանրային սեփականություն (1913 թ. հրատարակություն)։ Թվային պատճենը՝ ՀՀ ԳԱԱ Հիմնարար գիտական գրադարան։',
    urls: {
      catalog: 'https://arar.sci.am/dlibra/publication/286451/edition/263035?language=hye',
      pdf: 'http://arar.sci.am/Content/263035/%D4%B9.pdf',
      mirror: 'https://archive.org/details/Xorenatsi1913Grabar',
    },
    verification: {
      status: VERIFICATION.VERIFIED,
      checkedOn: '2026-10-20',
      note: 'PDF-ը (463 էջ, սկանավորված պատկերներ, առանց տեքստային շերտի) ներբեռնվել է 2026-10-20-ին։ Ա գիրք, գլ. ԼԱ (ԼԲ)՝ տպագիր էջ 85–86 (PDF-ի 152–153-րդ էջեր), Բ գիրք, գլ. ԺԲ՝ էջ 122 (PDF 189), գլ. ԺԴ՝ էջ 127–128 (PDF 194–195) կարդացվել են անմիջապես էջերի պատկերներից։ archive.org-ի պատճենը էջ առ էջ չի համեմատվել։',
    },
  },
  {
    id: 'agathangelos-1983',
    kind: 'primary-edition',
    shortName: 'Ագաթանգեղոս (Երևան, 1983)',
    title: 'Ագաթանգեղոս, Հայոց պատմություն',
    citation:
      'Ագաթանգեղոս, Հայոց պատմություն․ քննական բնագիրը՝ Գ. Տեր-Մկրտչյանի և Ս. Կանայանցի, աշխարհաբար թարգմանությունը և ծանոթագրությունները՝ Ա. Տեր-Ղևոնդյանի, Երևան, 1983։',
    language: 'գրաբար + հայերեն',
    rights:
      'Գրաբար քննական բնագիրը (Տփղիս, 1909) հանրային սեփականություն է։ Ա. Տեր-Ղևոնդյանի 1983 թ. աշխարհաբար թարգմանությունը կարող է պաշտպանված լինել․ դրանից չմեջբերել։',
    urls: {
      item: 'https://archive.org/details/agathangelos11',
      ocrText: 'https://archive.org/download/agathangelos11/agathangelos11_djvu.txt',
    },
    verification: {
      status: VERIFICATION.PARTIAL,
      checkedOn: '2026-10-20',
      note: 'Ստուգվել է archive.org-ի OCR տեքստով (OCR-ը սխալներ ունի)։ Հղումները տրվում են պարագրաֆների համարներով (§)՝ §§ 48–49, 53, 127, 785, 786, 809։ Տպագիր էջերի համարները պատկերից չեն ստուգվել և չեն նշվում։ Հրատարակության մետատվյալները վերցված են archive.org-ի նկարագրությունից։',
    },
  },
  {
    id: 'petrosyan-2021',
    kind: 'scholarly-article',
    shortName: 'Ա. Պետրոսյան (2021)',
    author: 'Արմեն Պետրոսյան',
    title: '«„Վահագնի երգը“ և հայկական էպոսը»',
    citation:
      'Պետրոսյան Ա., «„Վահագնի երգը“ և հայկական էպոսը (Նոր տեսակետ հայկական էպոսի ծագման և ձևավորման վերաբերյալ)», Բանբեր հայագիտության, 2021, № 3 (27), էջ 146–166։ DOI: 10.52853/18294073-2021.3.27-147։',
    citationLatin:
      'Petrosyan A., “The Song of Vahagn” and the Armenian Epic (A Hypothesis on the Formation of the Armenian Epic), Banber Hayagitutʻyan / Review of Armenian Studies, 2021, no. 3 (27), pp. 146–166.',
    language: 'հայերեն (ռուս. և անգլ. ամփոփումներով)',
    rights: 'Ժամանակակից գիտական հոդված․ միայն ամփոփում, առանց երկար մեջբերումների։',
    urls: {
      catalog: 'https://arar.sci.am/dlibra/publication/314593/edition/289051?language=hye',
      pdf: 'http://arar.sci.am/Content/289051/147-167.pdf',
      doi: 'https://doi.org/10.52853/18294073-2021.3.27-147',
    },
    verification: {
      status: VERIFICATION.PARTIAL,
      checkedOn: '2026-10-20',
      note: 'Մետատվյալները՝ arar.sci.am-ի գրառումից։ Էջերը՝ PDF-ի տպագիր էջահամարներից (21 էջ, 146-ից մինչև 166)։ PDF-ի տեքստը վերծանվել է (տառատեսակի կոդավորման տեղաշարժ) և կարդացվել է հիմնականում էջ 146–150-ը։ DOI հղման վերահասցեավորումը չի ստուգվել։',
    },
  },
  {
    id: 'iranica-xorenaci',
    kind: 'encyclopedia',
    shortName: 'Ն. Գարսոյան, Encyclopaedia Iranica',
    author: 'Նինա Գարսոյան (Nina Garsoïan)',
    title: '«MOVSĒS XORENAC‘I»',
    citation:
      'Garsoïan N., «MOVSĒS XORENAC‘I», Encyclopaedia Iranica, online edition, published January 1, 2000, last updated May 14, 2018.',
    language: 'անգլերեն',
    rights: 'Հեղինակային իրավունքով պաշտպանված։',
    urls: {
      article: 'https://www.iranicaonline.org/articles/movses-xorenaci/',
      archived: 'http://web.archive.org/web/20260905234945/https://www.iranicaonline.org/articles/movses-xorenaci/',
    },
    verification: {
      status: VERIFICATION.PARTIAL,
      checkedOn: '2026-10-20',
      note: 'Ուղիղ կայքը Cloudflare-ով արգելափակված է (HTTP 403)։ Կարդացվել է Wayback Machine-ի 2026-09-05 պատճենը։',
    },
  },
  {
    id: 'iranica-anahid',
    kind: 'encyclopedia',
    shortName: 'Encyclopaedia Iranica, «ANĀHĪD»',
    title: '«ANĀHĪD»',
    citation:
      '«ANĀHĪD», Encyclopaedia Iranica, Vol. I, Fasc. 9, pp. 1003–1011, published December 15, 1989, last updated August 7, 2018.',
    language: 'անգլերեն',
    rights: 'Հեղինակային իրավունքով պաշտպանված։',
    urls: {
      article: 'https://www.iranicaonline.org/articles/anahid/',
      archived: 'http://web.archive.org/web/20261011190908/https://www.iranicaonline.org/articles/anahid/',
    },
    verification: {
      status: VERIFICATION.PARTIAL,
      checkedOn: '2026-10-20',
      note: 'Կարդացվել է միայն ընդհանուր էջը (Wayback, 2026-10-11)՝ մետատվյալներ և այն, որ հայերեն ձևը Anahit է։ Ենթաբաժինները (ii. The Cult and its Diffusion և այլն) ՉԵՆ կարդացվել։',
    },
  },
  {
    id: 'khorenatsi-1940',
    kind: 'modern-armenian-edition',
    shortName: 'Խորենացի (Երևան, 1940)',
    title: 'Մովսես Խորենացի, Հայոց պատմություն, գիրք առաջին',
    citation:
      'Մովսես Խորենացի, Հայոց պատմություն, գիրք առաջին (Հայ պատմագիրների մատենաշար աշխարհաբար թարգմանությամբ), Երևան, Հայպետհրատ, 1940, XCIV + 367 էջ։',
    language: 'հայերեն',
    rights: 'Թարգմանչի իրավունքի կարգավիճակը չի ստուգվել։',
    urls: {
      catalog: 'https://arar.sci.am/dlibra/publication/302556/edition/277023?language=hye',
      pdf: 'http://arar.sci.am/Content/277023/Movses%20Xorenaci.pdf',
    },
    verification: {
      status: VERIFICATION.UNVERIFIED,
      checkedOn: '2026-10-20',
      note: 'Ստուգվել են միայն գրադարանային մետատվյալները։ Թարգմանչի անունը մետատվյալներում չկա, բովանդակությունը չի կարդացվել։',
    },
  },
  {
    id: 'khorenatsi-thomson',
    kind: 'translation-en',
    shortName: 'Moses Khorenats‘i, tr. R. W. Thomson',
    title: 'History of the Armenians',
    citation:
      'Moses Khorenats‘i. History of the Armenians. Translation and commentary by Robert W. Thomson. Cambridge, Mass.: Harvard University Press, 1978; revised edition: Ann Arbor, 2007.',
    language: 'անգլերեն',
    rights: 'Հեղինակային իրավունքով պաշտպանված․ մեջբերումներ չանել։',
    urls: {},
    verification: {
      status: VERIFICATION.UNVERIFIED,
      checkedOn: '2026-10-20',
      note: 'Մատենագիտական տվյալները վերցված են Encyclopaedia Iranica-ի «MOVSĒS XORENAC‘I» հոդվածից (ըստ որի՝ թարգմանված է 1913 թ. Թիֆլիսի քննական բնագրից)։ Թարգմանության տեքստը հասանելի չէր և ՉԻ ստուգվել։',
    },
  },
  {
    id: 'agathangelos-thomson',
    kind: 'translation-en',
    shortName: 'Agathangelos, tr. R. W. Thomson',
    title: 'History of the Armenians',
    citation:
      'Agathangelos. History of the Armenians. Translation and commentary by R. W. Thomson. Albany: State University of New York Press, 1976.',
    language: 'անգլերեն',
    rights: 'Հեղինակային իրավունքով պաշտպանված։',
    urls: { item: 'https://archive.org/details/agathangeloshist0000rwth' },
    verification: {
      status: VERIFICATION.UNVERIFIED,
      checkedOn: '2026-10-20',
      note: 'archive.org-ի որոնմամբ գտնվել է նույնացուցիչը (ամսաթիվ՝ 1976)։ Հրատարակիչը և տեքստը ՉԵՆ ստուգվել (փոխառու գրադարանի նյութ է)։',
    },
  },
];

export const sourcesById = Object.fromEntries(sources.map((source) => [source.id, source]));
