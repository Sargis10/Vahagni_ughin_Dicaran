import { Link } from 'react-router';
import hy, { languageLabels, sourceKindLabels } from '../../i18n/hy.js';
import { VerificationBadge } from '../ui/EvidenceBadge.jsx';

export function SourceCard({ source, citedBy, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const t = hy.sourceCard;

  return (
    <article className="source-card" id={`source-${source.id}`}>
      <header className="source-card__header">
        <p className="source-card__kind">{sourceKindLabels[source.kind]}</p>
        <Heading className="source-card__title">{source.title}</Heading>
        <VerificationBadge status={source.verification.status} />
      </header>

      {source.description && <p className="muted">{source.description}</p>}

      <dl className="meta-list meta-list--inline">
        {source.author && (
          <div>
            <dt>{t.author}</dt>
            <dd>{source.author}</dd>
          </div>
        )}
        {source.year && (
          <div>
            <dt>{t.year}</dt>
            <dd>{source.year}</dd>
          </div>
        )}
        {source.publication && (
          <div>
            <dt>{t.publication}</dt>
            <dd>{source.publication}</dd>
          </div>
        )}
        {source.language && (
          <div>
            <dt>{t.language}</dt>
            <dd>{languageLabels[source.language] ?? source.language}</dd>
          </div>
        )}
        {source.doi && (
          <div>
            <dt>{t.doi}</dt>
            <dd>
              <a href={`https://doi.org/${source.doi}`} target="_blank" rel="noopener noreferrer">
                {source.doi}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <p className="source-card__note">
        <strong>{t.checked}՝ </strong>
        {source.verification.checkedOn}։ {source.verification.note}
      </p>

      {source.url && (
        <p>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-card__link">
            {t.link} <span className="visually-hidden">{t.linkNote}</span>
          </a>
        </p>
      )}

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
