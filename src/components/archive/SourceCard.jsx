import { Link } from 'react-router';
import hy, { languageLabels, sourceKindLabels, sourceUrlLabels } from '../../i18n/hy.js';
import { VerificationBadge } from '../ui/EvidenceBadge.jsx';

export function SourceCard({ source, citedBy, headingLevel = 3, compact = false }) {
  const Heading = `h${headingLevel}`;
  const t = hy.sourceCard;
  const links = Object.entries(source.urls ?? {});

  return (
    <article className={`source-card${compact ? ' source-card--compact' : ''}`} id={`source-${source.id}`}>
      <header className="source-card__header">
        <p className="source-card__kind">{sourceKindLabels[source.kind] ?? source.kind}</p>
        <Heading className="source-card__title">{source.shortName}</Heading>
        <VerificationBadge status={source.verification.status} />
      </header>

      <p className="source-card__citation">{source.citation}</p>
      {!compact && source.citationLatin && (
        <p className="source-card__citation source-card__citation--latin" lang="en">
          {source.citationLatin}
        </p>
      )}

      <dl className="meta-list meta-list--inline">
        {source.author && (
          <div>
            <dt>{t.author}</dt>
            <dd>{source.author}</dd>
          </div>
        )}
        {source.language && (
          <div>
            <dt>{t.language}</dt>
            <dd>{languageLabels[source.language] ?? source.language}</dd>
          </div>
        )}
        {!compact && source.rights && (
          <div>
            <dt>{t.rights}</dt>
            <dd>{source.rights}</dd>
          </div>
        )}
      </dl>

      <p className="source-card__note">
        <strong>{t.checked}՝ </strong>
        {source.verification.checkedOn}։ {source.verification.note}
      </p>

      <div className="source-card__links">
        <p className="source-card__cited-label">{t.links}</p>
        {links.length === 0 ? (
          <p className="muted">{t.noLinks}</p>
        ) : (
          <ul className="tag-list" role="list">
            {links.map(([key, url]) => (
              <li key={key}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="source-card__link">
                  {sourceUrlLabels[key] ?? key}
                  <span className="visually-hidden"> {t.linkNote}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {citedBy && (
        <div className="source-card__cited">
          <p className="source-card__cited-label">{t.citedBy}</p>
          {citedBy.length === 0 ? (
            <p className="muted">{t.notCited}</p>
          ) : (
            <ul className="tag-list" role="list">
              {citedBy.map((entry) => (
                <li key={entry.id}>
                  <Link to={`/archive/${entry.slug}`}>{entry.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
