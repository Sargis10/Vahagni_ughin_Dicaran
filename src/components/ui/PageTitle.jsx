import hy from '../../i18n/hy.js';

// React 19 hoists <title> into <head>.
export function PageTitle({ title }) {
  const text = title ? `${title} — ${hy.site.fullTitle}` : hy.site.fullTitle;
  return <title>{text}</title>;
}
