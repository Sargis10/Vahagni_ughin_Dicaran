import { useId } from 'react';
import { useSearchParams } from 'react-router';
import hy, { evidenceTypes, kindLabels } from '../i18n/hy.js';
import { entries } from '../content/index.js';
import { ENTRY_KINDS, EVIDENCE_IDS } from '../content/evidence.js';
import { searchEntries } from '../content/search.js';
import { useProgress } from '../progress/ProgressContext.jsx';
import { EntryCard } from '../components/archive/EntryCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';

function readFilters(params) {
  const kind = params.get('kind');
  const evidence = (params.get('evidence') ?? '').split(',').filter((id) => EVIDENCE_IDS.includes(id));
  return {
    query: params.get('q') ?? '',
    kind: ENTRY_KINDS.includes(kind) ? kind : 'all',
    evidence,
  };
}

export function ArchivePage() {
  const t = hy.archive;
  const [params, setParams] = useSearchParams();
  const filters = readFilters(params);
  const { progress } = useProgress();
  const searchId = useId();

  const results = searchEntries(entries, filters);

  function update(next) {
    const merged = { ...filters, ...next };
    const nextParams = new URLSearchParams();
    if (merged.query) nextParams.set('q', merged.query);
    if (merged.kind !== 'all') nextParams.set('kind', merged.kind);
    if (merged.evidence.length) nextParams.set('evidence', merged.evidence.join(','));
    setParams(nextParams, { replace: true, preventScrollReset: true });
  }

  function toggleEvidence(id) {
    const evidence = filters.evidence.includes(id)
      ? filters.evidence.filter((value) => value !== id)
      : [...filters.evidence, id];
    update({ evidence });
  }

  const hasFilters = filters.query || filters.kind !== 'all' || filters.evidence.length > 0;
  const resetFilters = () => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true });

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

      <section className="section section--tight">
        <div className="container archive">
          <form className="archive-filters" role="search" onSubmit={(event) => event.preventDefault()}>
            <div className="field">
              <label htmlFor={searchId} className="field__label">
                {t.searchLabel}
              </label>
              <div className="search-input">
                <input
                  id={searchId}
                  type="search"
                  className="input"
                  value={filters.query}
                  placeholder={t.searchPlaceholder}
                  autoComplete="off"
                  onChange={(event) => update({ query: event.target.value })}
                />
              </div>
            </div>

            <fieldset className="filter-group">
              <legend className="field__label">{t.kindLegend}</legend>
              <div className="chip-row">
                {['all', ...ENTRY_KINDS].map((kind) => (
                  <label key={kind} className="chip">
                    <input
                      type="radio"
                      name="kind"
                      value={kind}
                      checked={filters.kind === kind}
                      onChange={() => update({ kind })}
                    />
                    <span>{kind === 'all' ? t.kindAll : kindLabels[kind].many}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="filter-group">
              <legend className="field__label">{t.evidenceLegend}</legend>
              <div className="chip-row">
                {evidenceTypes.map((type) => (
                  <label key={type.id} className={`chip chip--evidence chip--${type.id}`}>
                    <input
                      type="checkbox"
                      checked={filters.evidence.includes(type.id)}
                      onChange={() => toggleEvidence(type.id)}
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="archive-filters__footer">
              <p className="archive-filters__count" role="status" aria-live="polite">
                {t.results(results.length)}
              </p>
              {hasFilters && (
                <Button variant="ghost" onClick={resetFilters}>
                  {t.resetFilters}
                </Button>
              )}
            </div>
          </form>

          {results.length === 0 ? (
            <div className="empty-state">
              <h2>{t.emptyTitle}</h2>
              <p className="muted">{t.emptyText}</p>
              <Button variant="secondary" onClick={resetFilters}>
                {t.resetFilters}
              </Button>
            </div>
          ) : (
            <ul className="grid grid--2 grid--3 archive__results" role="list">
              {results.map((entry) => (
                <li key={entry.id}>
                  <EntryCard
                    entry={entry}
                    headingLevel={2}
                    discovered={progress.discoveredEntries.includes(entry.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
