import hy from '../i18n/hy.js';
import { paths } from '../app/navigation.js';
import { ButtonLink } from '../components/ui/Button.jsx';
import { PageTitle } from '../components/ui/PageTitle.jsx';
import { Rosette } from '../components/ui/Ornament.jsx';

export function NotFoundPage() {
  return (
    <>
      <PageTitle title={hy.notFound.pageTitle} />
      <section className="page-hero page-hero--full" aria-labelledby="page-title">
        <div className="container container--narrow page-hero__inner">
          <Rosette size={56} className="page-hero__mark" />
          <span className="eyebrow">{hy.notFound.eyebrow}</span>
          <h1 id="page-title">{hy.notFound.title}</h1>
          <p className="lead">{hy.notFound.lead}</p>
          <div className="button-row button-row--center">
            <ButtonLink to={paths.home}>{hy.notFound.backHome}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
