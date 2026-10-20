import { useEffect, useId, useState } from 'react';
import { Link, NavLink } from 'react-router';
import hy from '../../i18n/hy.js';
import { navItems, paths } from '../../app/navigation.js';
import { Rosette } from '../ui/Ornament.jsx';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to={paths.home} className="brand" onClick={closeMenu}>
          <Rosette size={34} className="brand__mark" />
          <span className="brand__text">
            <span className="brand__title">{hy.site.title}</span>{' '}
            <span className="brand__subtitle">{hy.site.subtitle}</span>
            <span className="visually-hidden"> — {hy.a11y.homePage}</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? hy.a11y.closeMenu : hy.a11y.openMenu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle__icon" aria-hidden="true" />
          <span className="nav-toggle__label">{hy.a11y.menu}</span>
        </button>

        <nav
          id={menuId}
          className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
          aria-label={hy.a11y.mainNav}
        >
          <ul className="site-nav__list" role="list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className="site-nav__link" onClick={closeMenu}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
