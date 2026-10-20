import hy from '../i18n/hy.js';
import { PageTitle } from '../components/ui/PageTitle.jsx';

// Rendered outside <Layout>, so it uses a plain <a> that does a full reload.
export function RouteErrorPage() {
  return (
    <main className="site-main">
      <PageTitle title={hy.error.pageTitle} />
      <section className="page-hero page-hero--full" aria-labelledby="page-title">
        <div className="container container--narrow page-hero__inner">
          <h1 id="page-title">{hy.error.title}</h1>
          <p className="lead">{hy.error.lead}</p>
          <div className="button-row button-row--center">
            <a className="button button--primary" href="/">
              {hy.error.backHome}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
