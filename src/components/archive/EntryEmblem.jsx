import { Rosette } from '../ui/Ornament.jsx';

const kindPaths = {
  story: 'M14 10h20a4 4 0 0 1 4 4v24H18a4 4 0 0 1-4-4z M14 34a4 4 0 0 0 4 4 M20 18h12 M20 24h12 M20 30h8',
  concept: 'M24 8l14 8v16l-14 8-14-8V16z M24 8v32 M10 16l14 8 14-8',
};

export function EntryEmblem({ kind, size = 48 }) {
  if (kind === 'character') return <Rosette size={size} />;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <path d={kindPaths[kind] ?? kindPaths.concept} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
