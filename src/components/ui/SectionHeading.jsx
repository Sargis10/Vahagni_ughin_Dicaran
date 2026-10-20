export function SectionHeading({ id, eyebrow, title, lead, align = 'start' }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}
