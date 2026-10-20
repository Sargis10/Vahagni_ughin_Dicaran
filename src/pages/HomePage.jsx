import hy, { evidenceTypes } from '../i18n/hy.js';
import { paths } from '../app/navigation.js';
import { HeroArt } from '../components/home/HeroArt.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { EvidenceTypeList } from '../components/ui/EvidenceTypeList.jsx';
import { OrnamentDivider, Rosette } from '../components/ui/Ornament.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';

const pillarIcons = {
  archive: 'M6 5h12v14H6z M9 9h6 M9 12h6 M9 15h4',
  game: 'M12 3l7 4v10l-7 4-7-4V7z M12 3v18 M5 7l7 4 7-4',
  map: 'M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z M9 4v14 M15 6v14',
  progress: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z',
};

const needsResearchLabel = evidenceTypes.find((type) => type.id === 'needs-research').label;

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
          <Badge tone="research">{hy.site.status}</Badge>
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
              <Card className="pillar">
                <PillarIcon id={item.id} />
                <h3>{item.title}</h3>
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
  return (
    <section className="section section--raised" aria-labelledby="adventure-title">
      <div className="container split">
        <div className="split__text stack">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 id="adventure-title">{t.title}</h2>
          <p className="lead">{t.text}</p>
          <div className="button-row">
            <ButtonLink to={paths.game} variant="secondary">
              {t.cta}
            </ButtonLink>
          </div>
        </div>
        <Card variant="outlined" className="split__aside">
          <div className="card__header">
            <h3 className="card__title">{t.featuresTitle}</h3>
            <Badge tone="neutral">{t.status}</Badge>
          </div>
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

function CharactersPreview() {
  const t = hy.home.characters;
  return (
    <section className="section" aria-labelledby="characters-title">
      <div className="container">
        <SectionHeading id="characters-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="split split--cards">
          <figure className="sample-card">
            <Card className="character-card">
              <div className="character-card__portrait" aria-hidden="true">
                <Rosette size={72} />
              </div>
              <div className="character-card__body">
                <h3 className="character-card__name">{t.sampleName}</h3>
                <Badge tone="research">{needsResearchLabel}</Badge>
                <p className="muted">{t.sampleText}</p>
                <dl className="meta-list">
                  <div>
                    <dt>{t.sampleEvidenceLabel}</dt>
                    <dd>{t.sampleEvidenceValue}</dd>
                  </div>
                  <div>
                    <dt>{t.sampleSourcesLabel}</dt>
                    <dd>{t.sampleSourcesValue}</dd>
                  </div>
                </dl>
              </div>
            </Card>
            <figcaption className="sample-card__caption">{t.sampleCaption}</figcaption>
          </figure>
          <Card variant="outlined">
            <h3 className="card__title">{t.anatomyTitle}</h3>
            <ol className="number-list">
              {t.anatomy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <div className="button-row">
              <ButtonLink to={paths.archive} variant="secondary">
                {t.cta}
              </ButtonLink>
            </div>
          </Card>
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
        <SectionHeading id="progress-title" eyebrow={t.eyebrow} title={t.title} align="center" />
        <Card variant="outlined" className="progress-preview">
          <ul className="progress-preview__list" role="list">
            {t.items.map((item) => (
              <li key={item}>
                <span className="progress-preview__dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="progress-preview__footer">
            <Badge tone="neutral">{t.status}</Badge>
            <p className="muted">{t.note}</p>
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
      <CharactersPreview />
      <EvidencePreview />
      <OrnamentDivider className="page-divider" />
      <ProgressPreview />
    </>
  );
}
