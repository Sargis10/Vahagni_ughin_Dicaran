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

Պահանջվում է **Node.js ≥ 22.12** (տես՝ `.nvmrc` և `package.json` → `engines`), **Git**, և WebGL աջակցող զննարկիչ։  
`package-lock.json`-ը commit արված է․ նախընտրելի է `npm ci` (մաքուր, կրկնելի տեղադրում)։

```bash
git clone https://github.com/Sargis10/Vahagni_ughin_Dicaran.git
cd Vahagni_ughin_Dicaran
npm ci
npm run dev       # http://localhost:5173
```

Ստուգումներ (ըստ ցանկության)՝

```bash
npm test          # Vitest թեստեր
npm run lint      # ESLint
npm run build     # արտադրական հավաքում dist/ թղթապանակում
npm run preview   # հավաքված տարբերակի դիտում՝ http://localhost:4173
```

Եթե Node-ը սխալ տարբերակ է, `npm ci`-ն կկանգնի `engines` սխալով (տես `.npmrc` → `engine-strict`)։ Տեղադրեք Node ≥ 22.12, ապա կրկնեք։

LAN ցուցադրության համար (ըստ ցանկության)՝ `npm run dev -- --host`։ Սովորական տեղային աշխատանքի համար host պետք չէ։

### Windows (PowerShell) — կարևոր

Երբեմն PowerShell-ը արգելում է `npm.ps1`-ը (`ExecutionPolicy`)՝ սխալի տեսքով՝  
`npm.ps1 cannot be loaded because running scripts is disabled on this system`։

**Լուծում A (արագ, առանց քաղաքականություն փոխելու) — օգտագործեք `npm.cmd`.**

```powershell
git clone https://github.com/Sargis10/Vahagni_ughin_Dicaran.git
cd Vahagni_ughin_Dicaran
npm.cmd ci
npm.cmd run dev
```

Բացեք զննարկիչում՝ `http://localhost:5173` (գլխավոր) և `http://localhost:5173/play` (խաղ)։

**Լուծում B — թույլատրել սկրիպտներ միայն այս օգտատիրոջ համար.**

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Փակեք և նորից բացեք PowerShell-ը, ապա օգտագործեք սովորական `npm`՝

```powershell
npm ci
npm run dev
```

Node ներբեռնեք [nodejs.org](https://nodejs.org/) (LTS 22.x կամ ավելի նոր ≥ 22.12)։ Git՝ [git-scm.com](https://git-scm.com/)։

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

Requires Node ≥ 22.12, Git, and a WebGL-capable browser. Preferred: `npm ci` then `npm run dev` → http://localhost:5173.

**Windows PowerShell:** if `npm.ps1` is blocked by ExecutionPolicy, use `npm.cmd ci` / `npm.cmd run dev`, or run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once, then reopen PowerShell.
