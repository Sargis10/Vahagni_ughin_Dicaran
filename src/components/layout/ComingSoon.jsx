import hy from '../../i18n/hy.js';
import { paths } from '../../app/navigation.js';
import { Badge } from '../ui/Badge.jsx';
import { ButtonLink } from '../ui/Button.jsx';
import { Card } from '../ui/Card.jsx';
import { PageTitle } from '../ui/PageTitle.jsx';
import { Rosette } from '../ui/Ornament.jsx';

export function ComingSoon({ content, showPrinciplesLink = true }) {
  const { pageTitle, eyebrow, title, lead, phase, planned } = content;

  return (
    <>
      <PageTitle title={pageTitle} />
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container container--narrow page-hero__inner">
          <Rosette size={56} className="page-hero__mark" />
          <span className="eyebrow">{eyebrow}</span>
          <h1 id="page-title">{title}</h1>
          <p className="lead">{lead}</p>
          <div className="page-hero__badges">
            <Badge tone="research">{hy.comingSoon.badge}</Badge>
            <Badge tone="neutral">
              {hy.comingSoon.phasePrefix} {phase}
            </Badge>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="planned-title">
        <div className="container container--narrow">
          <Card variant="outlined">
            <h2 id="planned-title" className="card__title">
              {hy.comingSoon.plannedTitle}
            </h2>
            <ul className="check-list" role="list">
              {planned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <div className="button-row">
            <ButtonLink to={paths.home} variant="secondary">
              {hy.comingSoon.backHome}
            </ButtonLink>
            {showPrinciplesLink && (
              <ButtonLink to={paths.sources} variant="ghost">
                {hy.comingSoon.readPrinciples}
              </ButtonLink>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
