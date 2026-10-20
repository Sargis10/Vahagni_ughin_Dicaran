import { Link } from 'react-router';
import hy, { kindLabels } from '../../i18n/hy.js';
import { getSourcesForEntry } from '../../content/index.js';
import { EvidenceBadge } from '../ui/EvidenceBadge.jsx';
import { EntryEmblem } from './EntryEmblem.jsx';

export function EntryCard({ entry, discovered = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const sourceCount = getSourcesForEntry(entry).length;

  return (
    <article className={`entry-card entry-card--${entry.evidenceType}`}>
      <div className="entry-card__emblem" aria-hidden="true">
        <EntryEmblem kind={entry.kind} />
      </div>
      <div className="entry-card__body">
        <p className="entry-card__kind">
          {kindLabels[entry.kind]?.one}
          {discovered && <span className="entry-card__discovered"> · {hy.archive.discovered}</span>}
        </p>
        <Heading className="entry-card__title">
          <Link to={`/archive/${entry.slug}`} className="entry-card__link">
            {entry.name}
          </Link>
        </Heading>
        <EvidenceBadge type={entry.evidenceType} />
        <p className="entry-card__summary">{entry.summary}</p>
        <p className="entry-card__meta">{hy.archive.sourcesCount(sourceCount)}</p>
      </div>
    </article>
  );
}
