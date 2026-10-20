import { Rosette } from '../ui/Ornament.jsx';

const kindPaths = {
  story: 'M14 10h20a4 4 0 0 1 4 4v24H18a4 4 0 0 1-4-4z M14 34a4 4 0 0 0 4 4 M20 18h12 M20 24h12 M20 30h8',
  concept: 'M24 8l14 8v16l-14 8-14-8V16z M24 8v32 M10 16l14 8 14-8',
  'legendary-king': 'M10 34l-2-18 9 8 7-12 7 12 9-8-2 18z M10 38h28 M24 22v6',
  clan: 'M24 40V22 M24 22l-10-8 M24 22l10-8 M24 28l-8-4 M24 28l8-4 M14 14a3 3 0 1 0 0-.1 M34 14a3 3 0 1 0 0-.1 M24 10a3 3 0 1 0 0-.1',
  place: 'M8 18l16-9 16 9z M12 18v16 M20 18v16 M28 18v16 M36 18v16 M8 38h32 M10 34h28',
  character: 'M24 10a6 6 0 1 1 0 12a6 6 0 0 1 0-12z M12 40c0-8 5-13 12-13s12 5 12 13',
};

export function EntryEmblem({ kind, size = 48 }) {
  if (kind === 'deity') return <Rosette size={size} />;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <path d={kindPaths[kind] ?? kindPaths.concept} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
