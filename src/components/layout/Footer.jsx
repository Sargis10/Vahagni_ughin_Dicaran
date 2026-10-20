import { Link } from 'react-router';
import hy from '../../i18n/hy.js';
import { navItems } from '../../app/navigation.js';
import { OrnamentDivider, Rosette } from '../ui/Ornament.jsx';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <OrnamentDivider className="site-footer__divider" />
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <div className="site-footer__brand">
            <Rosette size={28} className="brand__mark" />
            <span className="site-footer__title">{hy.site.fullTitle}</span>
          </div>
          <p className="muted">{hy.site.tagline}</p>
          <p className="site-footer__disclaimer">{hy.footer.disclaimer}</p>
        </div>

        <nav aria-label={hy.a11y.footerNav}>
          <h2 className="site-footer__heading">{hy.footer.sectionsTitle}</h2>
          <ul className="site-footer__links" role="list">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">{hy.footer.creditsTitle}</h2>
          <p className="muted">
            {hy.footer.fontsCredit} (
            <a href="/fonts/OFL.txt" target="_blank" rel="noopener">
              {hy.footer.fontsLicense}
            </a>
            )
          </p>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <small>
          © {year} {hy.site.fullTitle}
        </small>
      </div>
    </footer>
  );
}
