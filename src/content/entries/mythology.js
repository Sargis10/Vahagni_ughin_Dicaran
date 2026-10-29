import { EVIDENCE } from '../evidence.js';

// Factual entries, transcribed from internal/content-research/archive-entries.json
// (checked 2026-10-20; verification patch 2026-10-29). Claim text, evidence types and
// locators follow the research notes. Prefer chapter locators as «Ա, գլ. ԼԱ (= 31)».

const K1913 = 'khorenatsi-1913';
const AG1983 = 'agathangelos-1983';
const PETROSYAN = 'petrosyan-2021';
const IRANICA_III = 'iranica-armenia-iii';
const TITUS = 'titus-khorenatsi';

/** The only verbatim quotation used on the site. */
export const SONG_QUOTE = {
  text: 'Երկնէր երկին, երկնէր երկիր, երկնէր և ծովն ծիրանի',
  lang: 'xcl',
  sourceId: K1913,
  locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 17',
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
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 17 – էջ 86, տող 4' }],
        quote: SONG_QUOTE,
        note: 'Ուղղագրությունը՝ ինչպես տպված է 1913 թ. հրատարակությունում (դասական ուղղագրություն, «և» գրանշանով)։ Երգի մնացած մասը ներկայացվում է միայն վերապատմությամբ։',
      },
      {
        id: 'birth-song-sons',
        text: 'Խորենացին թվարկում է Տիգրանի որդիներին՝ Բաբ, Տիրան, Վահագն, և ասում, որ Վահագնի մասին «առասպելներ» են պատմում այս երկրում։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 16' }],
      },
      {
        id: 'birth-song-pandir',
        text: 'Խորենացին գրում է, որ իրենց ականջով լսել են, թե ինչպես ոմանք այս երգը երգում էին փանդիռով (լարային նվագարան)։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 4–5' }],
      },
      {
        id: 'birth-song-dragons',
        text: 'Երգերում պատմվում էր նրա՝ վիշապների դեմ կռվելու և հաղթելու մասին, և նրա սխրանքները համեմատվում էին Հերակլեսի սխրանքների հետ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 5–7' }],
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
      'Ինչու է տպագրության մեջ երբեմն նշվում «ԼԱ (ԼԲ)». Abełean/TITUS-ում գլ. 31 = ԼԱ և գլ. 32 = ԼԲ առանձին գլուխներ են, բայց փակագծային ձևի խմբագրական պատճառը առաջաբանում չի ստուգվել։',
      'Ա. Պետրոսյանի անագրամի վարկածի ընդունումը կամ քննադատությունը այլ գիտնականների կողմից։',
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
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 16' }],
      },
      {
        id: 'vahagn-birth-song',
        text: 'Ծննդյան երգում երկնում են երկինքը, երկիրը և ծիրանի ծովը, եղեգի փողից ծուխ ու բոց է ելնում, և բոցից վազում է պատանին, որի մազերը հուր են, մորուքը՝ բոց, իսկ աչուկները՝ արեգակներ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 17 – էջ 86, տող 4' }],
        quote: SONG_QUOTE,
      },
      {
        id: 'vahagn-pandir',
        text: 'Խորենացին գրում է, որ իրենց ականջով լսել են, թե ինչպես ոմանք այս երգը երգում էին փանդիռով։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 4–5' }],
      },
      {
        id: 'vahagn-dragons',
        text: 'Երգերում պատմվում էր նրա՝ վիշապների դեմ կռվելու և հաղթելու մասին, և նրա սխրանքները համեմատվում էին Հերակլեսի սխրանքների հետ։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 5–7' }],
      },
      {
        id: 'vahagn-statue-georgia',
        text: 'Ասում էին, որ նա աստվածացվել է, և Վրաց աշխարհում նրա հասակի չափով արձան էր կանգնեցված, որին պատվում էին զոհերով։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 7–8' }],
      },
      {
        id: 'vahagn-vahnuni',
        text: 'Վահագնից է սերում Վահունիների տոհմը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 8–9' }],
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
        id: 'vahagn-royal-sacrifice',
        text: 'Ագաթանգեղոսի համաձայն՝ Աշտիշատի Վահևանյան մեհյանը Հայոց թագավորների զոհատեղի էր։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: AG1983, locator: '§ 809' }],
        note: 'Հատուկ տոնի անուն կամ օրացույցային օր չի հաստատվել. չգրել «Վահագնի տոնը…»։',
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
        text: 'Գիտնականները (օր.՝ Ա. Պետրոսյան, 2021) Վահագնին բնորոշում են որպես ամպրոպի և պատերազմի աստված։ Խորենացու ծննդյան երգում այդ բառերը չկան։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: PETROSYAN, locator: 'էջ 146–150' },
          { sourceId: IRANICA_III, locator: 'Vahagn / Vərəθraγna' },
        ],
        note: 'Միայն գիտական բնորոշում. սկզբնաղբյուրում ուղղակի չի գրված։',
      },
    ],
    disagreements: [
      'Երգի ծագումը՝ Iranica-ի հոդվածը (Ն. Գարսոյան) երգը համարում է «կորած պարսկական օրհներգի» հատված, իսկ Ա. Պետրոսյանը այն դիտում է որպես հին հայկական հեթանոսական երգ, որն ունի հնդեվրոպական պոեզիայի առանձնահատկություններ։ Երկու տեսակետն էլ ընդունում են, որ անունը իրանական ծագում ունի, բայց տարբեր կերպ են բացատրում, թե որքանով է կերպարն ինքը տեղական։',
      'Խորենացու երկի թվագրումը՝ Iranica-ի համաձայն՝ չի լուծված, թե երկը գրվել է 5-րդ դարում, թե ավելի ուշ (մինչև 8-րդ դար)։ Սա կարևոր է, որովհետև այն որոշում է, թե որքան հին է մեզ հասած երգի գրառումը։',
      'Ա. Պետրոսյանի վարկածը, թե երգում «երկու» բառը և Ծովինարի անունը անագրամի ձևով «թաքնված» են, նրա անձնական նոր տեսակետն է։ Այլ գիտնականների արձագանքը չի ուսումնասիրվել։',
    ],
    openQuestions: [
      'Ինչու է տպագրության մեջ երբեմն նշվում «ԼԱ (ԼԲ)»։',
      'Վահագնի հատուկ տոնի կամ ծեսի մանրամասներ (բացի Աշտիշատի զոհատեղի լինելուց)։',
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
        text: 'Գիտնականները Աստղիկին համարում են Վահագնի զուգակիցը՝ հիմնվելով «Վահագնի սենյակ» անվան և Աֆրոդիտեի նույնացման վրա։ Սկզբնաղբյուրում ուղղակի «կին» չի գրված։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: AG1983, locator: '§ 809' },
          { sourceId: 'iranica-agathangelos', locator: 'Asṭłik, spouse of Vahagn' },
          { sourceId: IRANICA_III, locator: 'Vahagn shared his temple with Asṭłik' },
        ],
        note: 'Ստուգված է որպես գիտական մեկնաբանություն, 2026-10-29։',
      },
      {
        id: 'astghik-etymology',
        text: 'Գիտնականները Աստղիկ անունը բացատրում են որպես «փոքր աստղ» (ասորերեն kaukabtā-ի թարգմանություն)։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: IRANICA_III, locator: 'Asṭłik / kaukabtā' }],
      },
      {
        id: 'astghik-vardavar',
        text: 'Ժամանակակից ազգագրական ավանդույթում Վարդավառը հաճախ կապում են Աստղիկի (և երբեմն Անահիտի) հետ։ Սա ազգագրական մեկնաբանություն է, ոչ Ագաթանգեղոսի ուղղակի վկայություն։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: 'melik-pashayan-1963', locator: 'Astłik / Ashtishat' }],
        note: 'Որպես հնագույն փաստ չներկայացնել։ Նախաքրիստոնեական սկզբնաղբյուր դեռ պետք է առանձին փնտրել։',
      },
    ],
    disagreements: [
      'Աստղիկի մասին հին տեղեկությունները քիչ են։ Սիրո/ջրի/աստղերի գործառույթները և Վարդավառի կապը գալիս են գիտական ու ազգագրական գրականությունից, ոչ ուղղակի սկզբնաղբյուրից։',
    ],
    openQuestions: ['Վարդավառ–Աստղիկ կապի նախաքրիստոնեական սկզբնաղբյուր (եթե կա)։'],
    relatedIds: ['vahagn', 'ashtishat'],
  },
  {
    id: 'anahit',
    slug: 'anahit',
    kind: 'deity',
    name: 'Անահիտ',
    altNames: [
      'Մեծ Անահիտ տիկին (Ագաթանգեղոս, § 53)',
      'Ոսկեմայր Ոսկեծին (?) — գիտական նույնացում § 809-ի հետ',
    ],
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
      {
        id: 'anahit-oskemayr',
        text: 'Ագաթանգեղոսը Աշտիշատի երկրորդ բագինը կոչում է «Ոսկեմայր Ոսկեծին», առանց Անահիտ անունը նշելու։ Գիտնականները (Encyclopaedia Iranica) այդ մակդիրը վերագրում են Անահիտին։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: AG1983, locator: '§ 809' },
          { sourceId: IRANICA_III, locator: 'oskemayr, Agathangelos 809' },
          { sourceId: 'iranica-agathangelos', locator: 'golden mother / golden-born goddess' },
        ],
      },
    ],
    disagreements: [
      'Անահիտի անունը և պաշտամունքը իրանական ծագում ունեն (Iranica)։ Թե որքանով էր նա հայկական միջավայրում վերաիմաստավորված, գիտնականներից պետք է առանձին ուսումնասիրել, քանի որ Iranica-ի մանրամասն բաժինը չի կարդացվել։',
      '«Ոսկեմայր Ոսկեծին» = Անահիտ նույնացումը գիտական մեկնաբանություն է (Iranica). § 809-ում Անահիտ անունը չկա։',
    ],
    openQuestions: [
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
        text: 'Խորենացին գրում է, որ Արամազդ անունով մեկից ավելին են եղել, և հիշում է «Կունդ ոմն Արամազդ»։ Գիտնականները *կունդ*-ը բացատրում են որպես «ճաղատ»։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [
          { sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 9–11' },
          { sourceId: TITUS, locator: 'Book 1, ch. 31' },
          { sourceId: IRANICA_III, locator: 'kund ‘bald’ Aramazd (1.31)' },
        ],
        note: 'Տեքստը սկզբնաղբյուր է. «ճաղատ» իմաստը՝ գիտական մեկնաբանություն (Iranica)։',
      },
      {
        id: 'aramazd-etymology',
        text: 'Գիտնականների համաձայն՝ «Արամազդ» անունը ծագում է իրանական Ահուրա Մազդա աստծու անունից (պարթև. Aramazd / հին պարսկ. Auramazdā)։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: IRANICA_III, locator: 'Aramazd' },
          { sourceId: 'iranica-armenia-iv', locator: 'Aramazd from Old Pers. Auramazdā' },
          { sourceId: 'iranica-ahura-mazda', locator: 'Parth. Aramazd' },
        ],
        note: 'Ստուգված է որպես ընդունված գիտական ստուգաբանություն, 2026-10-29։',
      },
    ],
    disagreements: [
      'Ագաթանգեղոսը Արամազդին նույնացնում է հունական Զևսի հետ («Զևս Արամազդ»), իսկ Խորենացին Անիում հիշում է «Ոլիմպիական Զևսի» արձանը (Բ, ԺԴ, էջ 127)։ Թե այս հունական նույնացումները ինչ չափով են արտացոլում հայկական պաշտամունքը, և ինչ չափով՝ հեղինակների հելլենիստական կրթությունը, գիտական քննարկման հարց է, որն այստեղ չի ուսումնասիրվել։',
    ],
    openQuestions: [],
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
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 12–15' }],
      },
      {
        id: 'tigran-sons',
        text: 'Նրա որդիներն են Բաբը, Տիրանը և Վահագնը։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [{ sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85, տող 16' }],
      },
      {
        id: 'tigran-transfer',
        text: 'Տիգրան Երվանդյանի կերպարի վրա «փոխադրված» են Տիգրան Մեծի կերպարի գծեր, իսկ Աժդահակը իրանական առասպելաբանության Աժի Դահական է։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [{ sourceId: PETROSYAN, locator: 'էջ 150' }],
      },
      {
        id: 'tigran-legendary',
        text: 'Գիտնականները Տիգրան Երվանդյանին դիտում են որպես լեգենդար/վիպական կերպար Խորենացու պատմության մեջ (պատմվում է Կյուրոսի ու Մարաստանի Աժդահակի համատեքստում)։ Ճշգրիտ թագավորության տարիներ չենք նշում։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: PETROSYAN, locator: 'էջ 150' },
          { sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 85' },
        ],
      },
    ],
    disagreements: [
      'Պատմականությունը վիճելի է. կայքում տարեթիվ չի նշվում։',
    ],
    openQuestions: ['Ճշգրիտ թագավորության տարեթվեր (եթե երբևէ ապահով աղբյուր գտնվի)։'],
    relatedIds: ['vahagn', 'vahagn-birth-tradition'],
    chapterIds: ['chapter-1'],
  },
  {
    id: 'vahnuni-clan',
    slug: 'vahnuniner',
    kind: 'clan',
    name: 'Վահունիներ',
    altNames: ['Վահունիք (Խորենացի, Ա, ԼԱ և Բ, ԺԲ/ԺԴ)'],
    evidenceType: EVIDENCE.PRIMARY,
    summary:
      'Ըստ Խորենացու՝ Վահագնից սերած տոհմ է (Վահունիք), որի անդամները քրմեր էին և Աշտիշատում կանգնեցրին Հերակլես-Վահագնի արձանը։',
    claims: [
      {
        id: 'vahnuni-descent',
        text: 'Վահագնի սերունդներն են Վահունիները։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [
          { sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 8–9' },
          { sourceId: TITUS, locator: 'Book 1, ch. 31: Վահունիք' },
        ],
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
      {
        id: 'vahnuni-genealogy',
        text: 'Խորենացու ԼԱ գլխի վերջում Վահագնից հետո թվարկվում են Վահունիքը, կրտսեր որդի Առավանից Առավենեանքը, ապա Ներսեհ–Զարեհ–Զարեհավանից գիծը, և Արմոգ–Բագամ–Վահան–Վահե շարքը. Վահեն մեռնում է Ալեքսանդր Մակեդոնացու դեմ ընդվզելով։',
        evidenceType: EVIDENCE.PRIMARY,
        sourceRefs: [
          { sourceId: K1913, locator: 'Ա, գլ. ԼԱ (= 31), էջ 86, տող 9–13' },
          { sourceId: TITUS, locator: 'Book 1, ch. 31, p. 86' },
        ],
      },
    ],
    disagreements: [
      'Նախորդ նշումի «Վահնունի» ձևը սխալ ընթերցում էր. Abełean 1913 / TITUS բնագրում ամենուր Վահունիք է։',
    ],
    openQuestions: [],
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
      {
        id: 'ashtishat-modern-location',
        text: 'Ժամանակակից գիտական/հանրագիտարանային գրականությունը Աշտիշատը տեղադրում է պատմական Տարոնում (այժմ՝ Մուշի մարզի շրջակայք, Թուրքիա)։ Ճշգրիտ հնագիտական կոորդինատ այս աշխատանքում չի ստուգվել։',
        evidenceType: EVIDENCE.SCHOLARLY,
        sourceRefs: [
          { sourceId: AG1983, locator: '§ 809 (պատմական տեղը)' },
          { sourceId: IRANICA_III, locator: 'temple at Aštišat' },
          { sourceId: 'melik-pashayan-1963', locator: 'Ashtishat, Taron, Mt. Qarqe' },
        ],
        note: 'Քարտեզի վրա չդնել ճշգրիտ կետ. պահել սխեմատիկ «պատմական Տարոն»։',
      },
    ],
    disagreements: [
      'Պատմական տեղը՝ Տարոն, Եփրատի մոտ (սկզբնաղբյուր)։ Ժամանակակից ճշգրիտ կետը միայն գիտական/երկրորդային է և չպետք է քարտեզին կոորդինատով դրվի մինչև հնագիտական հրապարակման ստուգումը։',
    ],
    openQuestions: ['Աշտիշատի ճշգրիտ հնագիտական կոորդինատ և պեղումների հրապարակում։'],
    relatedIds: ['vahagn', 'astghik', 'vahnuni-clan'],
  },
];
