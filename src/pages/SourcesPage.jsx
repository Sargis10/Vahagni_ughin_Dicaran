import hy from '../i18n/hy.js';
import { getEntriesCitingSource, sources } from '../content/index.js';
import { SourceCard } from '../components/archive/SourceCard.jsx';
import { Card } from '../components/ui/Card.jsx';
import { EvidenceTypeList } from '../components/ui/EvidenceTypeList.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';
import { Rosette } from '../components/ui/Ornament.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';

export function SourcesPage() {
  const t = hy.sources;

  return (
    <>
      <PageTitle title={t.pageTitle} />
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container container--narrow page-hero__inner">
          <Rosette size={56} className="page-hero__mark" />
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 id="page-title">{t.title}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="principles-title">
        <div className="container container--narrow">
          <Card variant="outlined">
            <h2 id="principles-title" className="card__title">
              {t.principlesTitle}
            </h2>
            <ul className="check-list" role="list">
              {t.principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="section section--raised" aria-labelledby="evidence-title">
        <div className="container">
          <SectionHeading id="evidence-title" title={t.evidenceTitle} />
          <EvidenceTypeList />
        </div>
      </section>

      <section className="section" aria-labelledby="source-list-title">
        <div className="container container--narrow stack">
          <SectionHeading id="source-list-title" title={t.listTitle} lead={t.listLead} />
          <Card variant="outlined">
            <h3 className="card__title">{t.verificationTitle}</h3>
            <p className="muted">{t.verificationLead}</p>
          </Card>
          <ul className="stack source-list" role="list">
            {sources.map((source) => (
              <li key={source.id}>
                <SourceCard source={source} citedBy={getEntriesCitingSource(source.id)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
