import { evidenceTypes } from '../../i18n/hy.js';
import { Card } from './Card.jsx';

export function EvidenceTypeList({ headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <ul className="grid grid--2 grid--4 evidence-list" role="list">
      {evidenceTypes.map((type) => (
        <li key={type.id}>
          <Card as="div" variant="evidence" className={`evidence evidence--${type.id}`}>
            <span className="evidence__marker" aria-hidden="true" />
            <Heading className="evidence__title">{type.label}</Heading>
            <p className="evidence__text">{type.description}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
