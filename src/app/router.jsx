import { createBrowserRouter } from 'react-router';
import { Layout } from './Layout.jsx';
import { paths } from './navigation.js';
import { HomePage } from '../pages/HomePage.jsx';
import { ArchivePage } from '../pages/ArchivePage.jsx';
import { MapPage } from '../pages/MapPage.jsx';
import { GamePage } from '../pages/GamePage.jsx';
import { SourcesPage } from '../pages/SourcesPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';
import { RouteErrorPage } from '../pages/RouteErrorPage.jsx';

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Layout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: paths.archive, element: <ArchivePage /> },
      { path: paths.map, element: <MapPage /> },
      { path: paths.game, element: <GamePage /> },
      { path: paths.sources, element: <SourcesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
