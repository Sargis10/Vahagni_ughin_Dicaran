# Վահագնի ուղին․ Դիցաշխարհ

Հայկական դիցաբանության կրթական վեբ նախագիծ՝ աղբյուրների վրա հիմնված դիցաբանական արխիվ և եռաչափ արկածային խաղ՝ մեկ միասնական հավելվածում։

> **Կարգավիճակ.** Նախագիծը մշակման փուլում է (Փուլ 2՝ դիզայն համակարգ և գլխավոր էջ)։ Արխիվը, քարտեզը և խաղը դեռ պատրաստ չեն․ դրանց էջերը ազնվորեն նշում են, թե երբ կավելանան։

## Սկզբունքներ

- Պատմական փաստեր, մեջբերումներ, աղբյուրներ և թվականներ չեն հորինվում։
- Յուրաքանչյուր գրառում կունենա վկայության տեսակի պիտակ՝ սկզբնաղբյուրի վկայություն, գիտական մեկնաբանություն, գեղարվեստական հորինվածք կամ «պահանջում է ուսումնասիրություն»։
- Խաղի համար ստեղծված ամեն ինչ նշվում է որպես գեղարվեստական։

## Տեխնոլոգիաներ

- [Vite](https://vite.dev/) 8 + [React](https://react.dev/) 19.3 (JavaScript)։ React-ը չպետք է թարմացվի մինչև 19.4, քանի դեռ React Three Fiber-ը չի աջակցում դրան։
- [React Router](https://reactrouter.com/) 7
- Վիճակի կառավարում՝ React Context (կավելանա, երբ անհրաժեշտ լինի)
- Տառատեսակներ՝ Noto Serif Armenian և Noto Sans Armenian, ինքնահոսթ, SIL OFL 1.1 ([`public/fonts/LICENSES.md`](public/fonts/LICENSES.md))

Backend չկա։ Ապագայում առաջընթացը կպահվի զննարկչի `localStorage`-ում։

## Աշխատեցնել տեղում

Պահանջվում է Node.js ≥ 22.12 (տես՝ `.nvmrc`)։

```bash
npm install
npm run dev       # մշակման սերվեր՝ http://localhost:5173
npm run build     # արտադրական հավաքում dist/ թղթապանակում
npm run preview   # հավաքված տարբերակի դիտում
npm run lint      # ESLint ստուգում
```

## Կառուցվածք

```text
public/fonts/            ինքնահոսթ տառատեսակներ և դրանց լիցենզիաները
src/
  main.jsx               մուտքի կետ
  app/                   երթուղիներ (router.jsx), ընդհանուր Layout, նավարկման ցանկ
  i18n/hy.js             UI-ի բոլոր հայերեն տեքստերը
  styles/                դիզայնի token-ներ, տառատեսակներ, ընդհանուր և էջերի ոճեր
  components/ui/         Button, Card, Badge, EvidenceTypeList, Ornament, PageTitle …
  components/layout/     Header, Footer, ComingSoon
  components/home/       գլխավոր էջի նկարազարդումը
  pages/                 Home, Archive, Map, Game, Sources, NotFound, RouteError
```

Երթուղիներ՝ `/` (գլխավոր), `/archive`, `/map`, `/play`, `/sources`։ Ցանկացած այլ հասցե բացում է 404 էջը։

---

## English (brief)

**Vahagni ughin · Ditsashkharh** («Vahagn's Path · World of Gods») is an educational web project about Armenian mythology: a source-backed mythology archive plus a 3D third-person adventure game in one app. The UI is in Armenian.

Current state: Phase 2 — design system, app shell, and home page. Archive, map, and game routes exist but show honest "coming in a later phase" pages.

Stack: Vite 8, React 19.3 (keep below 19.4 for React Three Fiber compatibility), React Router 7, plain JavaScript and CSS. Fonts: self-hosted Noto Serif/Sans Armenian under SIL OFL 1.1.

Run: `npm install`, then `npm run dev` / `build` / `preview` / `lint`. Requires Node ≥ 22.12.
