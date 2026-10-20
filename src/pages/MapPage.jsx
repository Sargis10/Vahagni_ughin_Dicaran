import { useState } from 'react';
import { Link } from 'react-router';
import hy from '../i18n/hy.js';
import { paths } from '../app/navigation.js';
import { locations, locationsById } from '../content/locations.js';
import { chaptersById } from '../content/chapters.js';
import { getEntryById } from '../content/index.js';
import { LOCATION_STATUS, getLocationStatus } from '../progress/conditions.js';
import { useProgress } from '../progress/ProgressContext.jsx';
import { StatusIcon } from '../components/map/StatusIcon.jsx';
import { WorldMap } from '../components/map/WorldMap.jsx';
import { ProgressSummary } from '../components/progress/ProgressSummary.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';

function LocationAction({ location, status }) {
  const t = hy.map;
  if (status === LOCATION_STATUS.LOCKED || !location.action) return null;
  if (location.action.type === 'chapter') {
    const chapter = chaptersById[location.action.chapterId];
    const label = status === LOCATION_STATUS.COMPLETED ? t.replayChapter : t.startChapter;
    return (
      <ButtonLink to={`${paths.game}?chapter=${chapter.id}${status === LOCATION_STATUS.COMPLETED ? '&restart=1' : ''}`}>
        {label}
      </ButtonLink>
    );
  }
  return (
    <ButtonLink to={location.action.to} variant="secondary">
      {t.openArchive}
    </ButtonLink>
  );
}

function LocationDetails({ location, status, headingId }) {
  const t = hy.map;
  const chapter = location.chapterId ? chaptersById[location.chapterId] : null;
  const inspiration = location.inspiredByEntryId ? getEntryById(location.inspiredByEntryId) : null;

  return (
    <div className="location-details">
      <div className="location-details__badges">
        <span className={`status-pill status-pill--${status}`}>
          <StatusIcon status={status} />
          {t.status[status]}
        </span>
        {location.isFictional && <Badge tone="fictional">{t.fictionalPlace}</Badge>}
      </div>
      <h2 id={headingId} className="location-details__title">
        {location.name}
      </h2>
      {chapter && (
        <p className="location-details__chapter">
          {t.chapterLabel(chapter.number)}՝ «{chapter.title}»
        </p>
      )}
      <p className="muted">{location.description}</p>
      {inspiration && (
        <p className="location-details__inspiration">
          {t.inspiredBy}{' '}
          <Link to={`/archive/${inspiration.slug}`}>{inspiration.name}</Link>
        </p>
      )}
      {status === LOCATION_STATUS.LOCKED && !location.isUnreleased && (
        <p className="location-details__hint">{t.lockedHint}</p>
      )}
      <div className="button-row">
        <LocationAction location={location} status={status} />
      </div>
    </div>
  );
}

export function MapPage() {
  const t = hy.map;
  const { progress } = useProgress();
  const statuses = Object.fromEntries(locations.map((l) => [l.id, getLocationStatus(l, progress)]));
  const firstOpen =
    locations.find((l) => statuses[l.id] === LOCATION_STATUS.AVAILABLE && l.chapterId) ?? locations[0];
  const [selectedId, setSelectedId] = useState(firstOpen.id);
  const selected = locationsById[selectedId];

  return (
    <>
      <PageTitle title={t.pageTitle} />
      <section className="page-hero page-hero--start" aria-labelledby="page-title">
        <div className="container page-hero__inner">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 id="page-title">{t.title}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </section>

      <section className="section section--tight" aria-label={t.progressLabel}>
        <div className="container stack">
          <ProgressSummary />
          <div className="world-map-layout">
            <WorldMap
              locations={locations}
              locationsById={locationsById}
              statuses={statuses}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <aside className="world-map-layout__panel" aria-live="polite">
              <LocationDetails location={selected} status={statuses[selected.id]} headingId="location-title" />
            </aside>
          </div>

          <ul className="map-legend" aria-label={t.legendLabel}>
            {Object.values(LOCATION_STATUS).map((status) => (
              <li key={status} className={`status-pill status-pill--${status}`}>
                <StatusIcon status={status} />
                {t.status[status]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--raised" aria-labelledby="location-list-title">
        <div className="container">
          <h2 id="location-list-title" className="section-title">
            {t.listTitle}
          </h2>
          <ul className="grid grid--2 grid--3" role="list">
            {locations.map((location) => (
              <li key={location.id}>
                <article className={`location-card location-card--${statuses[location.id]}`}>
                  <LocationDetails location={location} status={statuses[location.id]} headingId={`loc-${location.id}`} />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
