import hy from '../../i18n/hy.js';
import { LOCATION_STATUS } from '../../progress/conditions.js';
import { MapArt } from './MapArt.jsx';
import { StatusIcon } from './StatusIcon.jsx';

export function WorldMap({ locations, locationsById, statuses, selectedId, onSelect }) {
  const t = hy.map;
  const routes = locations.flatMap((from) =>
    from.connections.map((toId) => {
      const to = locationsById[toId];
      return { from, to, open: statuses[to.id] !== LOCATION_STATUS.LOCKED };
    }),
  );

  return (
    <div>
      <div className="world-map-scroll">
        <div className="world-map" role="group" aria-label={t.mapLabel}>
          <MapArt routes={routes} />
          {locations.map((location) => {
            const status = statuses[location.id];
            const selected = selectedId === location.id;
            return (
              <button
                key={location.id}
                type="button"
                className={`map-node map-node--${status}${selected ? ' map-node--selected' : ''}`}
                style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
                aria-pressed={selected}
                aria-label={`${location.name}՝ ${t.status[status]}`}
                onClick={() => onSelect(location.id)}
              >
                <span className="map-node__marker">
                  <StatusIcon status={status} />
                </span>
                <span className="map-node__label" aria-hidden="true">
                  {location.name}
                </span>
              </button>
            );
          })}
          <p className="world-map__note">{t.schematicNote}</p>
        </div>
      </div>
      <p className="world-map-scroll__hint">{t.scrollHint}</p>
    </div>
  );
}
