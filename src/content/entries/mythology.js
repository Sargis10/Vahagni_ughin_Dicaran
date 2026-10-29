import { EVIDENCE } from '../evidence.js';

// Factual entries, transcribed from internal/content-research/archive-entries.json and
// khorenatsi-book-1-ch-31.md (checked 2026-10-20). Claim text, evidence types and locators
// are kept as researched. `requiresCheck` marks claims listed in unverified-claims.md: they
// keep their evidence type but are also shown as «Պահանջում է ստուգում».

const K1913 = 'khorenatsi-1913';
const AG1983 = 'agathangelos-1983';
const PETROSYAN = 'petrosyan-2021';

/** The only verbatim quotation used on the site. */
export const SONG_QUOTE = {
  text: 'Երկնէր երկին, երկնէր երկիր, երկնէր և ծովն ծիրանի',
  lang: 'xcl',
  sourceId: K1913,
  locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 17',
};

export const mythologyEntries = [
  {
    id: 'vahagn-birth-tradition',
    slug: 'vahagni-tsnund',
    kind: 'story',
    name: 'Վահագնի ծննդյան ավանդությունը',
    altNames: ['Վահագնի երգը'],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Մովսես Խորենացին «Հայոց պատմության» Ա գրքի ԼԱ գլխում թվարկում է Տիգրան Երվանդյանի որդիներին՝ Բաբ, Տիրան, Վահագն, և ասում, որ Վահագնի մասին առասպելներ են պատմում։ Այնուհետև բերում է երգի հատվածը՝ երկնում էին երկինքը, երկիրը և ծիրանի ծովը, ծովում երկունք ուներ նաև կարմիր եղեգնիկը, եղեգի փողից ծուխ ու բոց էր ելնում, և բոցից վազում էր շիկահեր մի պատանի։ Նա հուր ուներ որպես մազ, բոց՝ որպես մորուք, իսկ նրա աչուկները արեգակներ էին։',
    claims: [
      {
        id: 'birth-song-text',
        text: 'Ծննդյան երգում երկնում են երկինքը, երկիրը և ծիրանի ծովը, եղեգի փողից ծուխ ու բոց է ելնում, և բոցից վազում է պատանին, որի մազերը հուր են, մորուքը՝ բոց, իսկ աչուկները՝ արեգակներ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 17 – էջ 86, տող 4' }],
        quote: SONG_QUOTE,
        note: 'Ուղղագրությունը՝ ինչպես տպված է 1913 թ. հրատարակությունում (դասական ուղղագրություն, «և» գրանշանով)։ Երգի մնացած մասը ներկայացվում է միայն վերապատմությամբ։',
      },
      {
        id: 'birth-song-sons',
        text: 'Խորենացին թվարկում է Տիգրանի որդիներին՝ Բաբ, Տիրան, Վահագն, և ասում, որ Վահագնի մասին «առասպելներ» են պատմում այս երկրում։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 16' }],
      },
      {
        id: 'birth-song-pandir',
        text: 'Խորենացին գրում է, որ իրենց ականջով լսել են, թե ինչպես ոմանք այս երգը երգում էին փանդիռով (լարային նվագարան)։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 4–5' }],
      },
      {
        id: 'birth-song-dragons',
        text: 'Երգերում պատմվում էր նրա՝ վիշապների դեմ կռվելու և հաղթելու մասին, և նրա սխրանքները համեմատվում էին Հերակլեսի սխրանքների հետ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 5–7' }],
      },
      {
        id: 'birth-song-iranica',
        text: 'Encyclopaedia Iranica-ի «MOVSĒS XORENAC‘I» հոդվածը (Ն. Գարսոյան) երգը համարում է «կորած պարսկական օրհներգի» հատված։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: 'iranica-xorenaci' }],
      },
      {
        id: 'birth-song-petrosyan-tradition',
        text: 'Արմեն Պետրոսյանը (2021) երգը դիտում է որպես հին հայկական հեթանոսական երգ, որն ունի հնդեվրոպական պոեզիայի առանձնահատկություններ։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: PETROSYAN }],
      },
      {
        id: 'birth-song-petrosyan-twins',
        text: 'Արմեն Պետրոսյանը (2021) առաջարկում է, որ երգի առաջին տողերում «երկ-» վանկի բազմակի կրկնությունը «երկու» բառի, այսինքն՝ երկվության և երկվորյակների գաղափարի ակնարկ է։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: PETROSYAN, locator: 'էջ 148' }],
      },
      {
        id: 'birth-song-petrosyan-tsovinar',
        text: 'Արմեն Պետրոսյանը (2021) առաջարկում է, որ «ծով ծիրանի» արտահայտությունը պարունակում է Ծովինարի՝ «Սասնա ծռերի» երկվորյակների մոր անվան հնչյունները։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: PETROSYAN, locator: 'էջ 148–149' }],
        note: 'Խորենացու տեքստում Ծովինարը չի հիշատակվում։ Հեղինակն ինքն այս միտքն անվանում է «նոր տեսակետ»։',
      },
      {
        id: 'birth-song-petrosyan-sanasar',
        text: 'Արմեն Պետրոսյանը (2021) եզրակացնում է, որ «Սասնա ծռերի» ավագ երկվորյակ Սանասարի կերպարը սերում է Վահագնից։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: PETROSYAN, locator: 'ամփոփում (arar.sci.am)' }],
      },
    ],
    disagreements: [
      'Երգի ծագումը՝ Iranica-ի հոդվածը (Ն. Գարսոյան) երգը համարում է «կորած պարսկական օրհներգի» հատված, իսկ Ա. Պետրոսյանը այն դիտում է որպես հին հայկական հեթանոսական երգ, որն ունի հնդեվրոպական պոեզիայի առանձնահատկություններ։',
      'Խորենացու երկի թվագրումը՝ Iranica-ի համաձայն՝ չի լուծված, թե երկը գրվել է 5-րդ դարում, թե ավելի ուշ (մինչև 8-րդ դար)։ Սա կարևոր է, որովհետև այն որոշում է, թե որքան հին է մեզ հասած երգի գրառումը։',
      'Ա. Պետրոսյանի վարկածը, թե երգում «երկու» բառը և Ծովինարի անունը անագրամի ձևով «թաքնված» են, նրա անձնական նոր տեսակետն է։ Այլ գիտնականների արձագանքը չի ուսումնասիրվել։',
    ],
    openQuestions: [
      'Գլխի «ԼԱ (ԼԲ)» կրկնակի համարակալման բացատրությունը։',
      'Ա. Պետրոսյանի անագրամի վարկածի ընդունումը կամ քննադատությունը այլ գիտնականների կողմից։',
      'Խորենացու ԼԱ գլխի վերջին հատվածի տոհմաբանական մանրամասները (էջ 86, տող 9–13)։',
    ],
    relatedIds: ['vahagn', 'tigran-yervandyan', 'vahnuni-clan'],
    chapterIds: ['chapter-1'],
  },
  {
    id: 'vahagn',
    slug: 'vahagn',
    kind: 'deity',
    name: 'Վահագն',
    altNames: ['Վիշապաքաղ Վահագն (Ագաթանգեղոս, § 809)'],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Վահագնը հայ հին հավատալիքների աստվածներից է։ Խորենացին նրան ներկայացնում է որպես Տիգրան Երվանդյանի որդի և պահպանում է նրա ծննդյան երգի հատվածը՝ ծովում երկնող եղեգի փողից ծուխ ու բոց է ելնում, և բոցից վազում է շիկահեր պատանին։ Ագաթանգեղոսը նրան կոչում է «Վիշապաքաղ» և նշում նրա մեհյանը Աշտիշատում։',
    claims: [
      {
        id: 'vahagn-son-of-tigran',
        text: 'Խորենացու մոտ Վահագնը Տիգրանի որդին է՝ Բաբի և Տիրանի եղբայրը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 16' }],
      },
      {
        id: 'vahagn-birth-song',
        text: 'Ծննդյան երգում երկնում են երկինքը, երկիրը և ծիրանի ծովը, եղեգի փողից ծուխ ու բոց է ելնում, և բոցից վազում է պատանին, որի մազերը հուր են, մորուքը՝ բոց, իսկ աչուկները՝ արեգակներ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 17 – էջ 86, տող 4' }],
        quote: SONG_QUOTE,
      },
      {
        id: 'vahagn-pandir',
        text: 'Խորենացին գրում է, որ իրենց ականջով լսել են, թե ինչպես ոմանք այս երգը երգում էին փանդիռով։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 4–5' }],
      },
      {
        id: 'vahagn-dragons',
        text: 'Երգերում պատմվում էր նրա՝ վիշապների դեմ կռվելու և հաղթելու մասին, և նրա սխրանքները համեմատվում էին Հերակլեսի սխրանքների հետ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 5–7' }],
      },
      {
        id: 'vahagn-statue-georgia',
        text: 'Ասում էին, որ նա աստվածացվել է, և Վրաց աշխարհում նրա հասակի չափով արձան էր կանգնեցված, որին պատվում էին զոհերով։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 7–8' }],
      },
      {
        id: 'vahagn-vahnuni',
        text: 'Վահագնից է սերում Վահնունիների տոհմը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 8–9' }],
      },
      {
        id: 'vahagn-edict',
        text: 'Տրդատի հրովարտակում բոլոր հայերին մաղթվում է քաջություն «քաջ Վահագնից»։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 127' }],
      },
      {
        id: 'vahagn-temple',
        text: 'Ագաթանգեղոսը Աշտիշատի Վահևանյան մեհյանը նկարագրում է որպես պաշտամունքի ութերորդ հռչակավոր վայր, որը կոչվում էր «Վիշապաքաղ Վահագնի» անունով։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 809' }],
      },
      {
        id: 'vahagn-heracles-statue',
        text: 'Վահունի տոհմի քրմերը Հերակլեսի արձանը կանգնեցրին Աշտիշատում՝ այն համարելով իրենց նախահայր Վահագնը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Բ, գլ. ԺԲ, էջ 122, տող 11–16' }],
      },
      {
        id: 'vahagn-name-origin',
        text: '«Վահագն» անունը ծագում է պարթևական Varhragn ձևից (իրան. Vərəθraγna)։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: PETROSYAN, locator: 'էջ 149–150' },
          { sourceId: 'iranica-xorenaci', locator: '«Vahagn/Vereθraγna»' },
        ],
      },
      {
        id: 'vahagn-thunder-war',
        text: 'Վահագնը ամպրոպի և պատերազմի աստված է։',
        evidenceType: EVIDENCE.SCHOLARLY,
        requiresCheck: true,
        sourceRefs: [{ sourceId: PETROSYAN, locator: 'ամփոփում, էջ 146–150' }],
        note: 'Խորենացու ԼԱ գլխում «ամպրոպ» կամ «պատերազմի աստված» բառեր չկան։ Սա գիտական բնորոշում է։',
      },
    ],
    disagreements: [
      'Երգի ծագումը՝ Iranica-ի հոդվածը (Ն. Գարսոյան) երգը համարում է «կորած պարսկական օրհներգի» հատված, իսկ Ա. Պետրոսյանը այն դիտում է որպես հին հայկական հեթանոսական երգ, որն ունի հնդեվրոպական պոեզիայի առանձնահատկություններ։ Երկու տեսակետն էլ ընդունում են, որ անունը իրանական ծագում ունի, բայց տարբեր կերպ են բացատրում, թե որքանով է կերպարն ինքը տեղական։',
      'Խորենացու երկի թվագրումը՝ Iranica-ի համաձայն՝ չի լուծված, թե երկը գրվել է 5-րդ դարում, թե ավելի ուշ (մինչև 8-րդ դար)։ Սա կարևոր է, որովհետև այն որոշում է, թե որքան հին է մեզ հասած երգի գրառումը։',
      'Ա. Պետրոսյանի վարկածը, թե երգում «երկու» բառը և Ծովինարի անունը անագրամի ձևով «թաքնված» են, նրա անձնական նոր տեսակետն է։ Այլ գիտնականների արձագանքը չի ուսումնասիրվել։',
    ],
    openQuestions: [
      'Գլխի «ԼԱ (ԼԲ)» կրկնակի համարակալման բացատրությունը։',
      'Վահագնի տոնի կամ ծեսերի մասին ցանկացած պնդում․ այս հետազոտության մեջ ստուգված չէ։',
    ],
    relatedIds: ['vahagn-birth-tradition', 'tigran-yervandyan', 'astghik', 'vahnuni-clan', 'ashtishat'],
    chapterIds: ['chapter-1'],
  },
  {
    id: 'astghik',
    slug: 'astghik',
    kind: 'deity',
    name: 'Աստղիկ',
    altNames: [],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Աստղիկը աստվածուհի է։ Ագաթանգեղոսը նրա մեհյանը նշում է Աշտիշատում և ասում, որ այն կոչվում էր «Վահագնի սենյակ» և հունարեն համապատասխանում է Աֆրոդիտեին։',
    claims: [
      {
        id: 'astghik-temple',
        text: 'Աշտիշատում կար Աստղիկ աստվածուհու մեհյանը, որ կոչվում էր «Սենյակ Վահագնի»։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 809' }],
      },
      {
        id: 'astghik-aphrodite',
        text: 'Ըստ Ագաթանգեղոսի՝ Աստղիկը հունական ավանդույթում համապատասխանում է Աֆրոդիտեին։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 809' }],
      },
      {
        id: 'astghik-khorenatsi-aphrodite',
        text: 'Խորենացու մոտ Տիգրանը Աֆրոդիտեի արձանը, որպես Հերակլեսի սիրուհու, կանգնեցնել է տալիս Հերակլեսի արձանի մոտ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Բ, գլ. ԺԴ, էջ 127, տող 16–17 – էջ 128, տող 1' }],
        note: 'Խորենացին այստեղ «Աստղիկ» անունը չի նշում, միայն «Աֆրոդիտե»։',
      },
      {
        id: 'astghik-beloved',
        text: 'Աստղիկը Վահագնի սիրեցյալն է կամ զուգակիցը։',
        evidenceType: EVIDENCE.SCHOLARLY,
        requiresCheck: true,
        sourceRefs: [
          { sourceId: AG1983, locator: '§ 809' },
          { sourceId: K1913, locator: 'Բ, գլ. ԺԴ, էջ 127–128' },
        ],
        note: 'Սա եզրակացություն է երկու տվյալից՝ «Վահագնի սենյակ» անվանումից (Ագաթանգեղոս) և Վահագն = Հերակլես, Աֆրոդիտե = Հերակլեսի սիրուհի զուգադրությունից (Խորենացի)։ Սկզբնաղբյուրներում ուղղակիորեն այդպես գրված չէ։',
      },
    ],
    disagreements: [
      'Աստղիկի մասին հին տեղեկությունները շատ քիչ են։ Ժամանակակից հանրամատչելի պնդումները (օրինակ՝ որ նա սիրո, ջրի կամ աստղերի աստվածուհի էր, կամ Վարդավառի տոնի հետ կապը) այս հետազոտության մեջ չեն ստուգվել։ Մինչև ստուգելը դրանք պետք է նշել որպես «պահանջում է ստուգում»։',
    ],
    openQuestions: [
      'Աստղիկի գործառույթների (սեր, գեղեցկություն, ջուր և այլն) գիտական աղբյուրներ։',
      'Վարդավառի հետ կապի մասին պնդումների աղբյուրներ։',
    ],
    relatedIds: ['vahagn', 'ashtishat'],
  },
  {
    id: 'anahit',
    slug: 'anahit',
    kind: 'deity',
    name: 'Անահիտ',
    altNames: ['Մեծ Անահիտ տիկին (Ագաթանգեղոս, § 53)'],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Անահիտը աստվածուհի է, որին Ագաթանգեղոսում Տրդատ արքան անվանում է «մեծ տիկին», ազգի փառքն ու կյանք տվողը և Արամազդի զավակը։ Նրա գլխավոր մեհյանը գտնվում էր Եկեղյաց գավառի Երիզա (Երեզ) ավանում, որտեղ կար նրա ոսկե արձանը։',
    claims: [
      {
        id: 'anahit-yeriza',
        text: 'Տրդատի թագավորության առաջին տարում արքան և իր մարդիկ գնացին Եկեղյաց գավառի Երիզա գյուղը՝ Անահիտի մեհյանը, զոհ մատուցելու։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 48' }],
      },
      {
        id: 'anahit-gregory',
        text: 'Տրդատը Գրիգորին հրամայեց պսակներ և ծառի թավ ճյուղեր նվիրաբերել Անահիտի արձանի բագինին, իսկ Գրիգորը հրաժարվեց։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 49' }],
      },
      {
        id: 'anahit-great-lady',
        text: 'Տրդատը Անահիտին անվանում է «մեծ տիկին», մեր ազգի փառքն ու կեցուցիչը, ամենայն զգաստության մայրը, մարդկային բնության բարերարը և «մեծ ու արի Արամազդի ծնունդը»։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 53' }],
      },
      {
        id: 'anahit-edict',
        text: 'Տրդատի հրովարտակում «խնամակալություն» մաղթվում է Անահիտ տիկնոջից։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 127' }],
      },
      {
        id: 'anahit-destroyed',
        text: 'Քրիստոնեության ընդունումից հետո Երեզ ավանի Անահիտի մեհյանը քանդվեց, և նրա ոսկե արձանը փշրվեց։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 786' }],
      },
      {
        id: 'anahit-equivalents',
        text: 'Անահիտը համապատասխանում է իրանական Անահիտային և հունական Արտեմիսին։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: 'iranica-anahid', locator: 'գլխավոր էջ. «Armenian Anahit»' },
          { sourceId: PETROSYAN, locator: 'էջ 149' },
          { sourceId: K1913, locator: 'Բ, գլ. ԺԴ, էջ 127, տող 15–16 (Արտեմիսի արձան Երիզայում)' },
        ],
        note: 'Խորենացին Երիզայում դնում է «Արտեմիսի» արձանը, իսկ Ագաթանգեղոսը նույն վայրում նշում է Անահիտի մեհյանը։ Անահիտ = Արտեմիս նույնացումը արվում է այս համընկնումից և գիտական գրականությունից։',
      },
    ],
    disagreements: [
      'Անահիտի անունը և պաշտամունքը իրանական ծագում ունեն (Iranica)։ Թե որքանով էր նա հայկական միջավայրում վերաիմաստավորված, գիտնականներից պետք է առանձին ուսումնասիրել, քանի որ Iranica-ի մանրամասն բաժինը չի կարդացվել։',
      'Աշտիշատի երկրորդ բագինը Ագաթանգեղոսը կոչում է «Ոսկեմայր Ոսկեծին դից», առանց Անահիտ անունը նշելու։ Այն Անահիտի հետ նույնացնելը մեկնաբանություն է։ 1983 թ. հրատարակության ծանոթագրություններում կա այդ մասին հիշատակում, բայց այն մանրամասն չի ստուգվել։',
    ],
    openQuestions: [
      '«Ոսկեմայր» բագինի նույնացումը Անահիտի հետ (§ 809)։',
      'Iranica «ANĀHĪD», ii. The Cult and its Diffusion բաժնի բովանդակությունը Հայաստանի մասին։',
    ],
    relatedIds: ['aramazd', 'ashtishat'],
  },
  {
    id: 'aramazd',
    slug: 'aramazd',
    kind: 'deity',
    name: 'Արամազդ',
    altNames: ['Զևս Արամազդ (Ագաթանգեղոս, § 785)'],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Արամազդը Ագաթանգեղոսում «բոլոր աստվածների հայր» կոչված աստվածն է։ Նրա բագինը գտնվում էր Անի ամրոցում՝ Հայոց արքաների գերեզմանատան մոտ։ Անահիտը կոչվում է նրա զավակը, Նանեն՝ դուստրը, Միհրը՝ որդին։',
    claims: [
      {
        id: 'aramazd-ani',
        text: 'Անի ամրոցում, որտեղ Հայոց թագավորների գերեզմաններն էին, քանդվեց «Զևս աստված Արամազդի» բագինը, որին կոչում էին բոլոր աստվածների հայր։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 785' }],
      },
      {
        id: 'aramazd-edict',
        text: 'Տրդատի հրովարտակում «պարարտ լիություն» մաղթվում է «արի Արամազդից»։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 127' }],
      },
      {
        id: 'aramazd-children',
        text: 'Անահիտը կոչվում է Արամազդի ծնունդ, Նանեն՝ Արամազդի դուստր (մեհյանը Թիլ ավանում), Միհրը՝ Արամազդի որդի (մեհյանը Բագայառիճում)։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [
          { sourceId: AG1983, locator: '§ 53 (Անահիտ)' },
          { sourceId: AG1983, locator: '§ 786 (Նանե)' },
          { sourceId: AG1983, locator: '§ 790 (Միհր)' },
        ],
      },
      {
        id: 'aramazd-kund',
        text: 'Խորենացին, անունների կրկնության մասին խոսելիս, նշում է, որ Արամազդ անունով մեկից ավելին են եղել, և հիշում է «Կունդ ոմն Արամազդ»։',
        evidenceType: EVIDENCE.PRIMARY,
        requiresCheck: true,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 9–11' }],
        note: 'Հատվածը դժվար է մեկնաբանել․ ամփոփումը զգույշ է։ Ճշգրիտ իմաստը պետք է ստուգել թարգմանության կամ մեկնաբանության հետ։',
      },
      {
        id: 'aramazd-etymology',
        text: 'Արամազդ անունը ծագում է իրանական Ահուրա Մազդա աստծու անունից։',
        evidenceType: EVIDENCE.NEEDS_RESEARCH,
        sourceRefs: [],
        note: 'Լայնորեն ընդունված տեսակետ է, բայց այս աշխատանքում կոնկրետ աղբյուրով չի ստուգվել։',
      },
    ],
    disagreements: [
      'Ագաթանգեղոսը Արամազդին նույնացնում է հունական Զևսի հետ («Զևս Արամազդ»), իսկ Խորենացին Անիում հիշում է «Ոլիմպիական Զևսի» արձանը (Բ, ԺԴ, էջ 127)։ Թե այս հունական նույնացումները ինչ չափով են արտացոլում հայկական պաշտամունքը, և ինչ չափով՝ հեղինակների հելլենիստական կրթությունը, գիտական քննարկման հարց է, որն այստեղ չի ուսումնասիրվել։',
    ],
    openQuestions: ['Արամազդ – Ահուրա Մազդա ստուգաբանության աղբյուրը։'],
    relatedIds: ['anahit'],
  },
  {
    id: 'tigran-yervandyan',
    slug: 'tigran-yervandyan',
    kind: 'legendary-king',
    name: 'Տիգրան Երվանդյան',
    altNames: ['Երուանդեան Տիգրան (Խորենացի)'],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Խորենացու պատմության մեջ Տիգրան Երվանդյանը Հայկազունների տոհմի արքա է, որը սպանեց Մարաստանի Աժդահակին։ Նա Վահագնի հայրն է։',
    claims: [
      {
        id: 'tigran-azhdahak',
        text: 'Հայկազուններից այս Տիգրանն է, որ սպանեց Աժդահակին և գերի տարավ նրա ընտանիքը, այդ թվում՝ «վիշապների մայր» Անույշին։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 12–15' }],
      },
      {
        id: 'tigran-sons',
        text: 'Նրա որդիներն են Բաբը, Տիրանը և Վահագնը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 85, տող 16' }],
      },
      {
        id: 'tigran-transfer',
        text: 'Տիգրան Երվանդյանի կերպարի վրա «փոխադրված» են Տիգրան Մեծի կերպարի գծեր, իսկ Աժդահակը իրանական առասպելաբանության Աժի Դահական է։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: PETROSYAN, locator: 'էջ 150' }],
      },
    ],
    disagreements: [
      'Տիգրան Երվանդյանի պատմականությունը և ժամանակաշրջանը վիճելի են։ Այս աշխատանքում թվականներ չեն ստուգվել, ուստի ոչ մի տարեթիվ չի նշվում։',
    ],
    openQuestions: ['Տիգրան Երվանդյանի թվագրում և պատմականություն։'],
    relatedIds: ['vahagn', 'vahagn-birth-tradition'],
    chapterIds: ['chapter-1'],
  },
  {
    id: 'vahnuni-clan',
    slug: 'vahnuniner',
    kind: 'clan',
    name: 'Վահնունիներ / Վահունիներ',
    altNames: ['Վահնունիք (Խորենացի, Ա, ԼԱ)', 'Վահունիք (Խորենացի, Բ, ԺԲ, ԺԴ)'],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Ըստ Խորենացու՝ Վահագնից սերած տոհմ է, որի անդամները քրմեր էին և Աշտիշատում կանգնեցրին Հերակլես-Վահագնի արձանը։',
    claims: [
      {
        id: 'vahnuni-descent',
        text: 'Վահագնի սերունդներն են Վահնունիները։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (ԼԲ), էջ 86, տող 8–9' }],
      },
      {
        id: 'vahnuni-statue',
        text: 'Վահունիների տոհմից քրմապետները Հերակլեսի արձանը կանգնեցրին իրենց Աշտիշատ գյուղում՝ այն համարելով իրենց նախահայր Վահագնը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Բ, գլ. ԺԲ, էջ 122, տող 11–16' }],
      },
      {
        id: 'vahnuni-deprived',
        text: 'Տիգրանը զայրացավ Վահունիների վրա, զրկեց նրանց քրմությունից, իսկ գյուղը վերցրեց արքունիքին։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Բ, գլ. ԺԴ, էջ 128, տող 1–4' }],
      },
    ],
    disagreements: [
      'Անվան երկու ձևերը (Վահնունի և Վահունի) այս հրատարակությունում հանդիպում են տարբեր գլուխներում։ Թե որն է նախնականը, և արդյոք դա միևնույն տոհմն է, պետք է ստուգել տարընթերցումների ծանոթագրություններում։',
    ],
    openQuestions: [
      'Էջ 86, տող 9-ի և էջ 122, տող 11-ի ճշգրիտ ուղղագրությունը և տարընթերցումները (պատկերի որակը սահմանափակ է)։',
    ],
    relatedIds: ['vahagn', 'ashtishat'],
  },
  {
    id: 'ashtishat',
    slug: 'ashtishat',
    kind: 'place',
    name: 'Աշտիշատ',
    altNames: [],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Աշտիշատը պաշտամունքային վայր էր Տարոնում։ Ագաթանգեղոսի համաձայն՝ այնտեղ կային երեք բագիններ՝ Վահևանյան մեհյանը (Վիշապաքաղ Վահագնի), Ոսկեմայր Ոսկեծին աստվածուհու բագինը և Աստղիկի մեհյանը («Վահագնի սենյակ»)։',
    claims: [
      {
        id: 'ashtishat-location',
        text: 'Աշտիշատը գտնվում էր Տարոնում, Քարքե լեռան լանջին, Եփրատ գետի վրա, Տավրոս մեծ լեռան դիմաց։ Անունը, ըստ Ագաթանգեղոսի, կապված է այնտեղ հաճախակի կատարվող պաշտամունքի հետ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 809' }],
        note: '«Աշտիշատ» անվան ստուգաբանությունը Ագաթանգեղոսինն է՝ ժողովրդական ստուգաբանություն։ Լեզվաբանորեն ստուգված չէ։',
      },
      {
        id: 'ashtishat-three-altars',
        text: 'Այնտեղ կային երեք բագիններ՝ Վահևանյան մեհյանը, Ոսկեմայր Ոսկեծին աստվածուհու բագինը և Աստղիկի մեհյանը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 809' }],
      },
      {
        id: 'ashtishat-vahuni-village',
        text: 'Խորենացու մոտ Աշտիշատը Վահունիների սեփական գյուղն է, որտեղ կանգնեցվեց Հերակլես-Վահագնի արձանը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Բ, գլ. ԺԲ, էջ 122, տող 14–16' }],
      },
    ],
    disagreements: [
      'Աշտիշատի ճշգրիտ ժամանակակից տեղադրությունը այս աշխատանքում չի ստուգվել։ Քարտեզի վրա այն կարելի է ցույց տալ միայն որպես «պատմական Տարոն, Եփրատի մոտ», առանց ճշգրիտ կետի, մինչև ստուգելը։',
    ],
    openQuestions: ['Ժամանակակից տեղադրություն և հնագիտական տվյալներ։'],
    relatedIds: ['vahagn', 'astghik', 'vahnuni-clan'],
  },
];
