import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import hy from '../i18n/hy.js';
import { Header } from '../components/layout/Header.jsx';
import { Footer } from '../components/layout/Footer.jsx';

export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const previousPathname = useRef(pathname);

  // Move focus to the new page on client-side navigation so screen readers and
  // keyboard users start at the top of the content instead of the clicked link.
  // Comparing paths (not a first-render flag) keeps StrictMode's double effect from stealing focus on load.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        {hy.a11y.skipToContent}
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="site-main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
