# Վահագնի ուղին․ Դիցաշխարհ

Հայկական դիցաբանության կրթական վեբ նախագիծ՝ աղբյուրների վրա հիմնված դիցաբանական արխիվ և եռաչափ արկածային խաղ՝ մեկ միասնական հավելվածում։

## Ինչ կա կայքում

- **Արխիվ** (`/archive`)՝ աստվածներ, ավանդական արքաներ, տոհմ, վայր, պատմություն և խաղի կերպարներ։ Ամեն պնդում ունի վկայության տեսակ և աղբյուրի ճշգրիտ տեղ։ Որոնում և զտիչներ։
- **Քարտեզ** (`/map`)՝ հորինված, սխեմատիկ աշխարհ, որի վայրերը բացվում են առաջընթացի հետ։
- **Խաղ** (`/play`)՝ Գլուխ 1 «Երգի հետքերով» (Վահագնի ծննդյան ավանդությունը)։ Երրորդ դեմքի եռաչափ խաղ՝ ստեղնաշարով, մկնիկով կամ հպումով։ Ներառում է պատմողին, երգի չորս բեկոր, կարմիր եղեգի փորձությունը բացատրություններով, ընտրություն և պարգևներ։
- **Առաջընթաց** (`/progress`)՝ միավորներ, մակարդակ, կրծքանշաններ, գլուխներ, բացահայտված գրառումներ։ Ամեն ինչ պահվում է `localStorage`-ում։
- **Աղբյուրներ** (`/sources`)՝ մատենագիտություն, իրավունքներ, ստուգման կարգավիճակ և սահմանափակումներ։

## Սկզբունքներ

- Պատմական փաստեր, մեջբերումներ, աղբյուրներ և էջահամարներ չեն հորինվում։
- Վկայության չորս տեսակ՝ սկզբնաղբյուրի վկայություն, գիտնականի տեսակետ (միշտ հեղինակի անունով), գեղարվեստական հորինվածք և «պահանջում է ստուգում»։
- Խաղի համար ստեղծված ամեն ինչ (պատմողը, ափը, քարերը, կրծքանշանները) նշված է որպես գեղարվեստական։

## Տեխնոլոգիաներ

- [Vite](https://vite.dev/) 8 + [React](https://react.dev/) 19.3 (JavaScript)։ React-ը մինչև 19.4 չպետք է թարմացվի, քանի դեռ React Three Fiber-ը չի աջակցում դրան։
- [React Router](https://reactrouter.com/) 7, վիճակը՝ React Context
- three.js 0.186, @react-three/fiber 9, @react-three/drei 10
- Vitest 5, ESLint 10
- Տառատեսակներ՝ Noto Serif/Sans Armenian, SIL OFL 1.1 ([`public/fonts/LICENSES.md`](public/fonts/LICENSES.md))
- Եռաչափ մոդելներ՝ Kenney Mini Characters և Nature Kit, CC0 1.0 ([`public/models/LICENSES.md`](public/models/LICENSES.md))

Backend չկա։

## Աշխատեցնել տեղում

Պահանջվում է Node.js ≥ 22.12 (տես՝ `.nvmrc`) և WebGL աջակցող զննարկիչ։

```bash
npm install
npm run dev       # մշակման սերվեր՝ http://localhost:5173
npm test          # Vitest թեստեր
npm run lint      # ESLint
npm run build     # արտադրական հավաքում dist/ թղթապանակում
npm run preview   # հավաքված տարբերակի դիտում՝ http://localhost:4173
```

## Կառուցվածք

```text
public/fonts/, public/models/   տառատեսակներ, եռաչափ մոդելներ և դրանց լիցենզիաները
src/
  app/                 երթուղիներ, Layout, նավարկում
  i18n/hy.js           UI-ի բոլոր հայերեն տեքստերը
  content/             աղբյուրներ, արխիվի գրառումներ, վավերացում, քարտեզ, կրծքանշաններ, փորձության հարցեր
  progress/            առաջընթացի կանոններ, պահպանում և տարբերակների փոխակերպում, Context
  components/          UI, layout, archive, map, progress բաղադրիչներ
  pages/               Home, Archive, Entry, Map, Game, Progress, Sources, NotFound
  game/                եռաչափ խաղ՝ աշխարհ, տեսարան, կերպարներ, տեսախցիկ, մուտք, HUD, գլխի սցենար
tests/                 Vitest թեստեր
```

---

## English (brief)

**Vahagni ughin · Ditsashkharh** ("Vahagn's Path · World of Gods") is an educational web app about Armenian mythology. It combines a source-backed archive with a playable 3D chapter about the Vahagn birth tradition. The UI is in Armenian. Every claim is labelled as primary source, scholarly view (with author), fiction, or needs checking.

Run it with `npm install`, then `npm run dev`, `test`, `lint`, `build` or `preview`. Requires Node ≥ 22.12 and a WebGL-capable browser.
