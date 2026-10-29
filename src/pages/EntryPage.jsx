import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import hy, { kindLabels } from '../i18n/hy.js';
import { EVIDENCE } from '../content/evidence.js';
import { getEntryBySlug, getRelatedEntries, getSourcesForEntry, sourcesById } from '../content/index.js';
import { useProgress } from '../progress/ProgressContext.jsx';
import { EntryEmblem } from '../components/archive/EntryEmblem.jsx';
import { EntryCard } from '../components/archive/EntryCard.jsx';
import { SourceCard } from '../components/archive/SourceCard.jsx';
import { ButtonLink } from '../components/ui/Button.jsx';
import { EvidenceBadge } from '../components/ui/EvidenceBadge.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';
import { paths } from '../app/navigation.js';

const SCHOLARLY_SOURCE_KINDS = ['scholarly-article', 'scholarly-monograph', 'encyclopedia'];

function ClaimItem({ claim }) {
  const t = hy.entry;
  const refs = (claim.sourceRefs ?? [])
    .map((ref) => ({ ...ref, source: sourcesById[ref.sourceId] }))
    .filter((ref) => ref.source);
  const scholars =
    claim.evidenceType === EVIDENCE.SCHOLARLY
      ? [
          ...new Set(
            refs
              .filter((ref) => SCHOLARLY_SOURCE_KINDS.includes(ref.source.kind))
              .map((ref) => ref.source.shortName),
          ),
        ]
      : [];
  const quoteSource = claim.quote ? sourcesById[claim.quote.sourceId] : null;

  return (
    <li className={`claim claim--${claim.evidenceType}${claim.requiresCheck ? ' claim--flagged' : ''}`}>
      <div className="claim__head">
        <EvidenceBadge type={claim.evidenceType} />
        {scholars.length > 0 && (
          <span className="claim__scholar">
            {t.scholarlyBy} {scholars.join(', ')}
          </span>
        )}
        {claim.requiresCheck && <EvidenceBadge type={EVIDENCE.NEEDS_RESEARCH} />}
      </div>
      <p className="claim__text">{claim.text}</p>
      {claim.quote && (
        <figure className="claim__quote">
          <blockquote lang={claim.quote.lang}>«{claim.quote.text}»</blockquote>
          <figcaption>
            {t.quoteLabel}՝ <a href={`#source-${claim.quote.sourceId}`}>{quoteSource?.shortName}</a>,{' '}
            {claim.quote.locator}
          </figcaption>
        </figure>
      )}
      {claim.requiresCheck && <p className="claim__flag">{t.requiresCheckNote}</p>}
      {(refs.length > 0 || claim.note) && (
        <dl className="claim__meta">
          {refs.length > 0 && (
            <div>
              <dt>{t.claimSources}</dt>
              <dd>
                <ul className="claim__refs" role="list">
                  {refs.map((ref, index) => (
                    <li key={`${ref.sourceId}-${index}`}>
                      <a href={`#source-${ref.sourceId}`}>{ref.source.shortName}</a>
                      {ref.locator && <span className="claim__locator">{ref.locator}</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {claim.note && (
            <div>
              <dt>{t.claimNote}</dt>
              <dd>{claim.note}</dd>
            </div>
          )}
        </dl>
      )}
    </li>
  );
}

function NoteList({ id, title, lead, items, tone }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby={id} className={`stack note-list note-list--${tone}`}>
      <h2 id={id}>{title}</h2>
      {lead && <p className="muted">{lead}</p>}
      <ul role="list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function EntryPage() {
  const { slug } = useParams();
  const entry = getEntryBySlug(slug);
  const { dispatch } = useProgress();
  const t = hy.entry;

  useEffect(() => {
    if (entry) dispatch({ type: 'discover-entry', entryId: entry.id });
  }, [entry, dispatch]);

  if (!entry) {
    return (
      <>
        <PageTitle title={t.notFoundTitle} />
        <section className="page-hero page-hero--full" aria-labelledby="page-title">
          <div className="container container--narrow page-hero__inner">
            <h1 id="page-title">{t.notFoundTitle}</h1>
            <p className="lead">{t.notFoundText}</p>
            <div className="button-row button-row--center">
              <ButtonLink to={paths.archive}>{t.backToArchive}</ButtonLink>
            </div>
          </div>
        </section>
      </>
    );
  }

  const entrySources = getSourcesForEntry(entry);
  const related = getRelatedEntries(entry);
  const checkedClaims = entry.claims.filter((claim) => claim.evidenceType !== EVIDENCE.NEEDS_RESEARCH);
  const uncheckedClaims = entry.claims.filter((claim) => claim.evidenceType === EVIDENCE.NEEDS_RESEARCH);
  const notice =
    entry.evidenceType === EVIDENCE.FICTIONAL
      ? t.fictionalNotice
      : entry.evidenceType === EVIDENCE.NEEDS_RESEARCH
        ? t.researchNotice
        : null;

  return (
    <>
      <PageTitle title={entry.name} />
      <section className={`entry-hero entry-hero--${entry.evidenceType}`} aria-labelledby="page-title">
        <div className="container">
          <nav aria-label={t.breadcrumb} className="breadcrumb">
            <ol>
              <li>
                <Link to={paths.archive}>{hy.nav.archive}</Link>
              </li>
              <li aria-current="page">{entry.name}</li>
            </ol>
          </nav>
          <div className="entry-hero__inner">
            <div className="entry-hero__emblem" aria-hidden="true">
              <EntryEmblem kind={entry.kind} size={72} />
            </div>
            <div className="entry-hero__text">
              <p className="eyebrow">{kindLabels[entry.kind]?.one}</p>
              <h1 id="page-title">{entry.name}</h1>
              {entry.altNames?.length > 0 && <p className="muted">{entry.altNames.join(', ')}</p>}
              <EvidenceBadge type={entry.evidenceType} />
            </div>
          </div>
        </div>
      </section>

      <div className="section section--tight">
        <div className="container entry-layout">
          <div className="entry-layout__main stack">
            {notice && (
              <p className={`notice notice--${entry.evidenceType}`} role="note">
                {notice}
              </p>
            )}
            <section aria-labelledby="summary-title" className="stack">
              <h2 id="summary-title">{t.summaryTitle}</h2>
              <p className="lead">{entry.summary}</p>
            </section>

            <section aria-labelledby="claims-title" className="stack">
              <h2 id="claims-title">{t.claimsTitle}</h2>
              {checkedClaims.length === 0 ? (
                <p className="muted">{t.claimsEmpty}</p>
              ) : (
                <ul className="claim-list" role="list">
                  {checkedClaims.map((claim) => (
                    <ClaimItem key={claim.id} claim={claim} />
                  ))}
                </ul>
              )}
            </section>

            {uncheckedClaims.length > 0 && (
              <section aria-labelledby="unverified-title" className="stack unverified-block">
                <h2 id="unverified-title">{t.unverifiedTitle}</h2>
                <p className="muted">{t.unverifiedLead}</p>
                <ul className="claim-list" role="list">
                  {uncheckedClaims.map((claim) => (
                    <ClaimItem key={claim.id} claim={claim} />
                  ))}
                </ul>
              </section>
            )}

            <NoteList
              id="disagreements-title"
              title={t.disagreementsTitle}
              items={entry.disagreements}
              tone="scholarly-interpretation"
            />
            <NoteList
              id="open-questions-title"
              title={t.openQuestionsTitle}
              items={entry.openQuestions}
              tone="needs-research"
            />

            {entry.chapterIds?.length > 0 && (
              <section aria-labelledby="chapter-title" className="stack">
                <h2 id="chapter-title">{t.chapterTitle}</h2>
                <p className="muted">{t.inChapter}</p>
                <div>
                  <ButtonLink to={paths.map} variant="secondary">
                    {t.chapterLink}
                  </ButtonLink>
                </div>
              </section>
            )}
          </div>

          <aside className="entry-layout__aside" aria-labelledby="sources-title">
            <h2 id="sources-title" className="entry-layout__aside-title">
              {t.sourcesTitle}
            </h2>
            {entrySources.length === 0 ? (
              <p className="muted">{t.sourcesEmpty}</p>
            ) : (
              <div className="stack">
                {entrySources.map((source) => (
                  <SourceCard key={source.id} source={source} compact />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--raised" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className="section-title">
              {t.relatedTitle}
            </h2>
            <ul className="grid grid--2 grid--3" role="list">
              {related.map((item) => (
                <li key={item.id}>
                  <EntryCard entry={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="container section--tight">
        <ButtonLink to={paths.archive} variant="ghost">
          ← {t.backToArchive}
        </ButtonLink>
      </div>
    </>
  );
}
