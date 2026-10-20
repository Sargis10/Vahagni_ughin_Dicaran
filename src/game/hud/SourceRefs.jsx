import { sourcesById } from '../../content/sources.js';
import { paths } from '../../app/navigation.js';

/** Compact list of source references; links open the sources page in a new tab. */
export function SourceRefs({ refs, label = 'Աղբյուր' }) {
  if (!refs?.length) return null;
  return (
    <p className="hud-refs">
      <span className="hud-refs__label">{label}՝ </span>
      {refs.map((ref, index) => {
        const source = sourcesById[ref.sourceId];
        if (!source) return null;
        return (
          <span key={`${ref.sourceId}-${index}`}>
            {index > 0 && '; '}
            <a href={`${paths.sources}#source-${ref.sourceId}`} target="_blank" rel="noopener noreferrer">
              {source.shortName}
            </a>
            {ref.locator && `, ${ref.locator}`}
          </span>
        );
      })}
    </p>
  );
}
