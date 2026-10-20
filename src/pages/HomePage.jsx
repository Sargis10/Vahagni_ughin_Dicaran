import { Link } from 'react-router';
import hy from '../i18n/hy.js';
import { paths } from '../app/navigation.js';
import { chapters } from '../content/chapters.js';
import { SONG_QUOTE } from '../content/entries/mythology.js';
import { sourcesById } from '../content/sources.js';
import { getEntryById } from '../content/index.js';
import { useProgress } from '../progress/ProgressContext.jsx';
import { HeroArt } from '../components/home/HeroArt.jsx';
import { EntryCard } from '../components/archive/EntryCard.jsx';
import { ProgressSummary } from '../components/progress/ProgressSummary.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { EvidenceBadge } from '../components/ui/EvidenceBadge.jsx';
import { EvidenceTypeList } from '../components/ui/EvidenceTypeList.jsx';
import { OrnamentDivider } from '../components/ui/Ornament.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';

const pillarIcons = {
  archive: 'M6 5h12v14H6z M9 9h6 M9 12h6 M9 15h4',
  game: 'M12 3l7 4v10l-7 4-7-4V7z M12 3v18 M5 7l7 4 7-4',
  map: 'M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z M9 4v14 M15 6v14',
  progress: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z',
};

const featuredEntryIds = ['vahagn-birth-tradition', 'vahagn', 'tigran-yervandyan'];

function PillarIcon({ id }) {
  return (
    <svg className="pillar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d={pillarIcons[id]} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {
  const t = hy.home.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroArt />
      <div className="container hero__content">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__title-main">{hy.site.title}</span>
          <span className="hero__title-sub">{hy.site.subtitle}</span>
        </h1>
        <p className="lead hero__lead">{t.lead}</p>
        <div className="button-row">
          <ButtonLink to={paths.game} size="lg">
            {t.primaryCta}
          </ButtonLink>
          <ButtonLink to={paths.archive} variant="secondary" size="lg">
            {t.secondaryCta}
          </ButtonLink>
        </div>
        <p className="hero__note">
          <Badge tone="verified">{t.noteBadge}</Badge>
          <span>{t.note}</span>
        </p>
      </div>
    </section>
  );
}

function Pillars() {
  const t = hy.home.pillars;
  return (
    <section className="section" aria-labelledby="pillars-title">
      <div className="container">
        <SectionHeading id="pillars-title" eyebrow={t.eyebrow} title={t.title} />
        <ul className="grid grid--2 grid--4" role="list">
          {t.items.map((item) => (
            <li key={item.id}>
              <Card className="pillar pillar--link">
                <PillarIcon id={item.id} />
                <h3>
                  <Link to={item.to} className="pillar__link">
                    {item.title}
                  </Link>
                </h3>
                <p className="muted">{item.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AdventurePreview() {
  const t = hy.home.adventure;
  const { progress } = useProgress();
  const chapter = chapters[0];
  const done = progress.completedChapters.includes(chapter.id);
  const started = progress.completedObjectives.some((key) => key.startsWith(`${chapter.id}:`));
  const source = sourcesById[SONG_QUOTE.sourceId];
  const to = `${paths.game}?chapter=${chapter.id}${done ? '&restart=1' : ''}`;

  return (
    <section className="section section--raised" aria-labelledby="adventure-title">
      <div className="container split">
        <div className="split__text stack">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 id="adventure-title">
            {t.title} {done && <Badge tone="verified">{t.done}</Badge>}
          </h2>
          <p className="lead">{t.text}</p>
          <figure className="home-quote">
            <blockquote lang={SONG_QUOTE.lang}>«{SONG_QUOTE.text}»</blockquote>
            <figcaption>
              {t.quoteCaption} · {source?.shortName}, {SONG_QUOTE.locator}
            </figcaption>
          </figure>
          <div className="chapter-card__badges">
            <EvidenceBadge type="primary-source" />
            <EvidenceBadge type="scholarly-interpretation" />
            <EvidenceBadge type="fictional" />
          </div>
          <div className="button-row">
            <ButtonLink to={to} size="lg">
              {done ? t.ctaReplay : started ? t.ctaContinue : t.cta}
            </ButtonLink>
          </div>
        </div>
        <Card variant="outlined" className="split__aside adventure-card">
          <img
            className="adventure-card__image"
            src="/images/chapter-1-preview.webp"
            width="1280"
            height="720"
            alt={t.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <h3 className="card__title">{t.featuresTitle}</h3>
          <ul className="check-list" role="list">
            {t.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

function ArchivePreview() {
  const t = hy.home.characters;
  const { progress } = useProgress();
  const featured = featuredEntryIds.map(getEntryById).filter(Boolean);
  return (
    <section className="section" aria-labelledby="characters-title">
      <div className="container">
        <SectionHeading id="characters-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <ul className="grid grid--3" role="list">
          {featured.map((entry) => (
            <li key={entry.id}>
              <EntryCard entry={entry} discovered={progress.discoveredEntries.includes(entry.id)} />
            </li>
          ))}
        </ul>
        <div className="button-row">
          <ButtonLink to={paths.archive} variant="secondary">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function EvidencePreview() {
  const t = hy.home.evidence;
  return (
    <section className="section section--raised" aria-labelledby="evidence-title">
      <div className="container">
        <SectionHeading id="evidence-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <EvidenceTypeList />
        <div className="button-row">
          <ButtonLink to={paths.sources} variant="ghost">
            {t.link}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ProgressPreview() {
  const t = hy.home.progress;
  return (
    <section className="section" aria-labelledby="progress-title">
      <div className="container container--narrow">
        <SectionHeading id="progress-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="center" />
        <Card variant="outlined">
          <ProgressSummary />
          <div className="button-row button-row--center home-progress__cta">
            <ButtonLink to={paths.progress} variant="secondary">
              {t.cta}
            </ButtonLink>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <PageTitle title={hy.home.pageTitle} />
      <Hero />
      <Pillars />
      <AdventurePreview />
      <ArchivePreview />
      <EvidencePreview />
      <OrnamentDivider className="page-divider" />
      <ProgressPreview />
    </>
  );
}
